package handlers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
	"github.com/jordanoskidavid/go-stock-react/utils"
)

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var input struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	code := fmt.Sprintf("%06d", rand.Intn(1000000))

	reset := models.PasswordReset{
		Email:     input.Email,
		Code:      code,
		ExpiresAt: time.Now().Add(15 * time.Minute), // expires in 15 min
	}
	database.DB.Create(&reset)

	err := utils.SendEmail(input.Email, "Password Reset Code", "Your reset code is: "+code)
	if err != nil {
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Verification code sent to your email"})
}
