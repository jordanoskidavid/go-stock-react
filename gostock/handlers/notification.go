package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
	"github.com/jordanoskidavid/go-stock-react/utils"
)

func SendLowStockNotification() error {
	var products []models.Product
	if err := database.DB.Where("stock < ?", 10).Find(&products).Error; err != nil {
		return err
	}

	if len(products) == 0 {
		return nil
	}

	var body strings.Builder
	body.WriteString("⚠️ Low Stock Alert ⚠️\n\nThe following products are below 10 units:\n\n")
	for _, p := range products {
		body.WriteString(fmt.Sprintf("- %s (Stock: %d)\n", p.Name, p.Stock))
	}

	var managers []models.User
	if err := database.DB.Where("role = ?", "manager").Find(&managers).Error; err != nil {
		return err
	}

	for _, m := range managers {
		if err := utils.SendEmail(m.Email, "Low Stock Alert", body.String()); err != nil {
			return err
		}
	}

	return nil
}

func LowStockNotificationRoute(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := SendLowStockNotification(); err != nil {
		http.Error(w, "Failed to send notifications", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Low stock notification sent"})
}
