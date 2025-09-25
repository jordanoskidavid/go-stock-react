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

	var orders []models.Order
	if err := database.DB.
		Preload("Products.Product").                                            // Preload the Product inside OrderProduct
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

func RemainingStockReportPDF(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Fetch products
	var products []models.Product
	if err := database.DB.Find(&products).Error; err != nil {
		http.Error(w, "Failed to retrieve products", http.StatusInternalServerError)
		return
	}

	if len(products) == 0 {
		http.Error(w, "No products available", http.StatusNotFound)
		return
	}

	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetFont("Arial", "B", 16)
	pdf.Cell(190, 10, "Stock Report")
	pdf.Ln(12)
	pdf.SetFont("Arial", "B", 12)

	// Table headers
	headers := []string{"Product ID", "Product Name", "Remaining Stock"}
	for _, h := range headers {
		pdf.CellFormat(60, 10, h, "1", 0, "C", false, 0, "")
	}
	pdf.Ln(-1)

	// Table content
	pdf.SetFont("Arial", "", 12)
	for _, p := range products {
		pdf.CellFormat(60, 10, strconv.Itoa(int(p.ID)), "1", 0, "C", false, 0, "")
		pdf.CellFormat(60, 10, p.Name, "1", 0, "C", false, 0, "")
		pdf.CellFormat(60, 10, strconv.Itoa(p.Stock), "1", 0, "C", false, 0, "")
		pdf.Ln(-1)
	}

	// Stream PDF
	filename := "stock_report_" + time.Now().Format("20060102_150405") + ".pdf"
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", "attachment; filename="+filename)
	if err := pdf.Output(w); err != nil {
		http.Error(w, "Failed to generate PDF", http.StatusInternalServerError)
		return
	}
}
