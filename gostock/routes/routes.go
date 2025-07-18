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
	//register route
	http.HandleFunc("/api/register", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.Register, "admin"),
	))
	//admin dashboard route
	http.HandleFunc("/api/admin/dashboard", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.AdminDashboard, "admin"),
	))
	//get all users route
	http.HandleFunc("/api/get-all-users", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetAllUsers, "admin"),
	))
	//get user by id route
	http.HandleFunc("/api/get-user-by-id/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetUserByID, "admin"),
	))
	//update user by id route
	http.HandleFunc("/api/update-user-by-id/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.UpdateUserByID, "admin"),
	))
	//delete user by id route
	http.HandleFunc("/api/delete-user-by-id/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.DeleteUserByID, "admin"),
	))

}
