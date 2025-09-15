package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
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
	json.NewEncoder(w).Encode(order)
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
	json.NewEncoder(w).Encode(map[string]string{"message": "Order deleted successfully"})
}
