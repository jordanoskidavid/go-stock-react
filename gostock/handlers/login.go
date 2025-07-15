package handlers

import (
	"encoding/json"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/models"
	"github.com/jordanoskidavid/go-stock-react/utils"
	"net/http"
	"time"
)

var jwtKey = []byte("your-secret-key")

func Login(w http.ResponseWriter, r *http.Request) {
	var creds models.User
	json.NewDecoder(r.Body).Decode(&creds)

	var user models.User
	result := database.DB.Where("email = ?", creds.Email).First(&user)
	if result.Error != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	if !utils.CheckPasswordHash(creds.Password, user.Password) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Could not create token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}
