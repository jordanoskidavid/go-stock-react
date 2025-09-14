package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
	"github.com/jordanoskidavid/go-stock-react/utils"
)

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var input struct {
		Email       string `json:"email"`
		Code        string `json:"code"`
		NewPassword string `json:"new_password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var reset models.PasswordReset
	if err := database.DB.Where("email = ? AND code = ?", input.Email, input.Code).First(&reset).Error; err != nil {
		http.Error(w, "Invalid or expired code", http.StatusBadRequest)
		return
	}

	if time.Now().After(reset.ExpiresAt) {
		http.Error(w, "Code expired", http.StatusBadRequest)
		return
	}

	// Update password (hash it before saving)
	var user models.User
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	hashed, _ := utils.HashPassword(input.NewPassword)
	user.Password = hashed
	database.DB.Save(&user)

	// Delete reset record so it can't be reused
	database.DB.Delete(&reset)

	json.NewEncoder(w).Encode(map[string]string{"message": "Password reset successful"})
}
