package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jordanoskidavid/go-stock-react/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?parseTime=true&charset=utf8mb4&collation=utf8mb4_unicode_ci",
		user, password, host, dbname,
	)

	var db *gorm.DB
	var err error

	maxRetries := 10

	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil && db != nil {
			break
		}
		log.Printf("⏳ DB not ready (attempt %d/%d): %v", i+1, maxRetries, err)
		time.Sleep(2 * time.Second)
	}

	if err != nil || db == nil {
		log.Fatalf("Failed to connect to database after %d attempts: %v", maxRetries, err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get sql.DB from GORM: %v", err)
	}

	sqlDB.SetConnMaxLifetime(time.Minute * 5)
	sqlDB.SetMaxOpenConns(10)
	sqlDB.SetMaxIdleConns(5)

	log.Println("Connected to MySQL!")
	DB = db

	err = db.AutoMigrate(&models.PasswordReset{})
	if err != nil {
		return
	}

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("AutoMigrate failed: %v", err)
	}
	err = db.AutoMigrate(&models.Category{}, &models.Product{})
	if err != nil {
		return
	}
}
