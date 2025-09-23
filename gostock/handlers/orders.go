package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
	"github.com/xuri/excelize/v2"
)

func CreateOrder(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var input struct {
		UserID   uint `json:"user_id"`
		Products []struct {
			ProductID uint `json:"product_id"`
			Quantity  int  `json:"quantity"`
		} `json:"products"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var total float64
	var orderProducts []models.OrderProduct

	for _, p := range input.Products {
		var product models.Product
		if err := database.DB.First(&product, p.ProductID).Error; err != nil {
			http.Error(w, fmt.Sprintf("Product %d not found", p.ProductID), http.StatusBadRequest)
			return
		}

		if product.Stock < p.Quantity {
			http.Error(w, fmt.Sprintf("Not enough stock for %s", product.Name), http.StatusBadRequest)
			return
		}

		product.Stock -= p.Quantity
		database.DB.Save(&product)

		total += product.Price * float64(p.Quantity)
		orderProducts = append(orderProducts, models.OrderProduct{
			ProductID: p.ProductID,
			Quantity:  p.Quantity,
			Price:     product.Price,
		})
	}

	order := models.Order{
		UserID:   input.UserID,
		Total:    total,
		Products: orderProducts,
	}

	if err := database.DB.Create(&order).Error; err != nil {
		http.Error(w, "Failed to create order", http.StatusInternalServerError)
		return
	}

	if err := database.DB.Preload("Products.Product").First(&order, order.ID).Error; err != nil {
		http.Error(w, "Failed to load created order", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(order)
	if err != nil {
		return
	}
}

func GetAllOrders(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var orders []models.Order
	if err := database.DB.Preload("Products.Product").Find(&orders).Error; err != nil {
		http.Error(w, "Failed to retrieve orders", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}

func GetOrderByID(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/orders/")
	id, _ := strconv.Atoi(idStr)

	var order models.Order
	if err := database.DB.Preload("Products.Product").First(&order, id).Error; err != nil {
		http.Error(w, "Order not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(order)
}

func UpdateOrderStatus(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/orders/status/")
	id, _ := strconv.Atoi(idStr)

	var input struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var order models.Order
	if err := database.DB.First(&order, id).Error; err != nil {
		http.Error(w, "Order not found", http.StatusNotFound)
		return
	}

	order.Status = input.Status
	database.DB.Save(&order)
	if err := database.DB.Preload("Products.Product").First(&order, order.ID).Error; err != nil {
		http.Error(w, "Failed to load created order", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(order)
}

func DeleteOrder(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/api/orders/delete/")
	orderID, _ := strconv.Atoi(idStr)

	// Restore stock
	var order models.Order
	if err := database.DB.Preload("Products").First(&order, orderID).Error; err != nil {
		http.Error(w, "Order not found", http.StatusNotFound)
		return
	}

	for _, op := range order.Products {
		var product models.Product
		database.DB.First(&product, op.ProductID)
		product.Stock += op.Quantity
		database.DB.Save(&product)
	}

	// Delete child rows first
	if err := database.DB.Where("order_id = ?", orderID).Delete(&models.OrderProduct{}).Error; err != nil {
		http.Error(w, "Failed to delete order products", http.StatusInternalServerError)
		return
	}

	// Delete the order
	if err := database.DB.Delete(&models.Order{}, orderID).Error; err != nil {
		http.Error(w, "Failed to delete order", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(map[string]string{"message": "Order deleted successfully"})
	if err != nil {
		return
	}
}

func OrdersReportExcel(w http.ResponseWriter, r *http.Request) {
	// Create new Excel file
	f := excelize.NewFile()
	sheet := "OrdersReport"
	f.NewSheet(sheet)

	headers := []string{"Order ID", "User ID", "Products", "Status", "Total", "Created At"}
	for i, h := range headers {
		cell, _ := excelize.CoordinatesToCellName(i+1, 1)
		f.SetCellValue(sheet, cell, h)
	}
	f.SetColWidth(sheet, "C", "C", 50)
	f.SetColWidth(sheet, "D", "D", 30)

	var orders []models.Order
	if err := database.DB.Preload("Products.Product").Find(&orders).Error; err != nil {
		http.Error(w, "Failed to get orders", http.StatusInternalServerError)
		return
	}

	for i, order := range orders {
		row := i + 2

		var productList []string
		for _, op := range order.Products {
			productList = append(productList, fmt.Sprintf("%s (x%d)", op.Product.Name, op.Quantity))
		}
		productsStr := strings.Join(productList, ", ")

		f.SetCellValue(sheet, fmt.Sprintf("A%d", row), order.ID)
		f.SetCellValue(sheet, fmt.Sprintf("B%d", row), order.UserID)
		f.SetCellValue(sheet, fmt.Sprintf("C%d", row), productsStr)
		f.SetCellValue(sheet, fmt.Sprintf("D%d", row), order.Status)
		f.SetCellValue(sheet, fmt.Sprintf("E%d", row), order.Total)
		f.SetCellValue(sheet, fmt.Sprintf("F%d", row), order.CreatedAt.Format("2006-01-02 15:04:05"))
	}

	// Add total revenue at the bottom
	totalRow := len(orders) + 3
	f.SetCellValue(sheet, fmt.Sprintf("D%d", totalRow), "Total Revenue")

	var totalRevenue float64
	for _, o := range orders {
		totalRevenue += o.Total
	}
	f.SetCellValue(sheet, fmt.Sprintf("E%d", totalRow), totalRevenue)

	// Stream file as download
	filename := fmt.Sprintf("orders_report_%s.xlsx", time.Now().Format("20060102_150405"))
	w.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

	// ✅ Put filename in quotes to prevent browser renaming
	w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))

	// Optional: expose headers for frontend access
	w.Header().Set("Access-Control-Expose-Headers", "Content-Disposition")

	if err := f.Write(w); err != nil {
		http.Error(w, "Failed to write excel file", http.StatusInternalServerError)
		return
	}
}
