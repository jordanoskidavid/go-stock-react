package main

import (
	"fmt"
	"github.com/jordanoskidavid/go-stock-react/database"
	"github.com/jordanoskidavid/go-stock-react/routes"
	"log"
	"net/http"
)

func main() {
	database.ConnectDB()
	routes.SetupRoutes()

	fmt.Println("Server working on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
