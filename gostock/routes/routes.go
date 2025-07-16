package routes

import (
	"github.com/jordanoskidavid/go-stock-react/handlers"
	"github.com/jordanoskidavid/go-stock-react/middleware"
	"net/http"
)

func SetupRoutes() {
	//routes for all users
	http.HandleFunc("/api/login", handlers.Login)

	//routes only for admin, manager and employee
	http.HandleFunc("/api/employee/data", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.EmployeeData, "employee", "manager", "admin"),
	))

	//routes only for admin
	http.HandleFunc("/api/register", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.Register, "admin"),
	))
	http.HandleFunc("/api/admin/dashboard", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.AdminDashboard, "admin"),
	))

}
