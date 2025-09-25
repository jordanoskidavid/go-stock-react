package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
	"github.com/jung-kurt/gofpdf"
)

type StockReport struct {
	ProductName string
	TotalSold   int
	TotalValue  float64
}

func StockReportPDF(w http.ResponseWriter, r *http.Request) {
	from := r.URL.Query().Get("from")
	to := r.URL.Query().Get("to")

	if from == "" || to == "" {
		http.Error(w, "Please provide from and to dates", http.StatusBadRequest)
		return
	}

	fromTime, err := time.Parse("2006-01-02", from)
	if err != nil {
		http.Error(w, "Invalid from date", http.StatusBadRequest)
		return
	}
	toTime, err := time.Parse("2006-01-02", to)
	if err != nil {
		http.Error(w, "Invalid to date", http.StatusBadRequest)
		return
	}

	// Fetch orders WITH products and product details
	var orders []models.Order
	if err := database.DB.
		Preload("Products.Product"). // Preload the Product inside OrderProduct
		Where("created_at BETWEEN ? AND ?", fromTime, toTime.AddDate(0, 0, 1)). // Include the whole "to" day
		Find(&orders).Error; err != nil {
		http.Error(w, "Failed to fetch orders", http.StatusInternalServerError)
		return
	}

	// Aggregate report
	reportMap := make(map[string]*StockReport)
	for _, order := range orders {
		for _, op := range order.Products {
			if op.Product.ID == 0 { // Ensure the Product was preloaded
				continue
			}
			name := op.Product.Name
			if _, exists := reportMap[name]; !exists {
				reportMap[name] = &StockReport{ProductName: name}
			}
			reportMap[name].TotalSold += op.Quantity
			reportMap[name].TotalValue += float64(op.Quantity) * op.Price
		}
	}

	var report []StockReport
	for _, v := range reportMap {
		report = append(report, *v)
	}

	// Generate PDF
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetFont("Arial", "B", 16)
	pdf.Cell(40, 10, fmt.Sprintf("Stock Report: %s to %s", from, to))
	pdf.Ln(12)

	// Table headers
	pdf.SetFont("Arial", "B", 12)
	pdf.CellFormat(60, 8, "Product", "1", 0, "C", false, 0, "")
	pdf.CellFormat(40, 8, "Total Sold", "1", 0, "C", false, 0, "")
	pdf.CellFormat(40, 8, "Total Value", "1", 0, "C", false, 0, "")
	pdf.Ln(-1)

	pdf.SetFont("Arial", "", 12)
	if len(report) == 0 {
		pdf.CellFormat(140, 8, "NO PRODUCTS SOLD IN THIS DATE RANGE", "1", 0, "C", false, 0, "")
	} else {
		for _, r := range report {
			pdf.CellFormat(60, 8, r.ProductName, "1", 0, "", false, 0, "")
			pdf.CellFormat(40, 8, strconv.Itoa(r.TotalSold), "1", 0, "C", false, 0, "")
			pdf.CellFormat(40, 8, fmt.Sprintf("%.2f", r.TotalValue), "1", 0, "C", false, 0, "")
			pdf.Ln(-1)
		}
	}

	// Stream PDF
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=stock_report_%s_to_%s.pdf", from, to))
	if err := pdf.Output(w); err != nil {
		http.Error(w, "Failed to generate PDF", http.StatusInternalServerError)
		return
	}
}
