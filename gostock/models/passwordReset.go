package models

import (
	"time"
)

type PasswordReset struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Email     string    `gorm:"not null" json:"email"`
	Code      string    `gorm:"not null" json:"code"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
	CreatedAt time.Time
}
