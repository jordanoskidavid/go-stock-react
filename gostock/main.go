package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/handlers"
	"github.com/jordanoskidavid/go-stock-react/middleware"
	"github.com/jordanoskidavid/go-stock-react/routes"
	"github.com/robfig/cron/v3"
)

func main() {
	database.ConnectDB()
	routes.SetupRoutes()
	handler := middleware.CORSMiddleware(http.DefaultServeMux)

	c := cron.New()
	_, err := c.AddFunc("0 0 * * *", func() {
		log.Println("Running low stock notification job...")
		if err := handlers.SendLowStockNotification(); err != nil {
			log.Println("Failed to send low stock notification:", err)
		}
	})
	if err != nil {
		log.Fatal(err)
	}
	c.Start()

	fmt.Println("Server working on http://localhost:8080")
	err = http.ListenAndServe(":8080", handler)
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
