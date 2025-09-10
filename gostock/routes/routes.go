package routes

import (
	"net/http"

	"github.com/jordanoskidavid/go-stock-react/handlers"
	"github.com/jordanoskidavid/go-stock-react/middleware"
)

func SetupRoutes() {
	//routes for all users
	http.HandleFunc("/api/login", handlers.Login)

	//routes for admin, manager and employee
	//get the employee data
	http.HandleFunc("/api/employee/data", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.EmployeeData, "employee", "manager", "admin"),
	))
	// get all products
	http.HandleFunc("/api/products/getAll", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetAllProducts, "admin", "manager", "employee"),
	))
	//get product by id
	http.HandleFunc("/api/products/getByID/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetProductByID, "admin", "manager", "employee"),
	))
	//get all categories
	http.HandleFunc("/api/category/get-all-categories", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetAllCategories, "admin", "manager", "employee"),
	))
	//get category by id
	http.HandleFunc("/api/category/get-category/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetCategoryByID, "admin", "manager", "employee"),
	))
	//get user by id route
	http.HandleFunc("/api/get-user-by-id/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.GetUserByID, "admin", "employee", "manager"),
	))

	//routes for manager and admin
	//create product
	http.HandleFunc("/api/products/create-product", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.CreateProduct, "admin", "manager"),
	))
	//update product
	http.HandleFunc("/api/products/update-product/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.UpdateProductByID, "admin", "manager"),
	))
	//delete product
	http.HandleFunc("/api/products/delete-product/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.DeleteProductByID, "admin", "manager"),
	))
	//create category
	http.HandleFunc("/api/category/create-category", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.CreateCategory, "admin", "manager"),
	))
	//update category
	http.HandleFunc("/api/category/update-category/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.UpdateCategory, "admin", "manager"),
	))
	//delete category
	http.HandleFunc("/api/category/delete-category/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.DeleteCategory, "admin", "manager"),
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
	//update user by id route
	http.HandleFunc("/api/update-user-by-id/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.UpdateUserByID, "admin"),
	))
	//delete user by id route
	http.HandleFunc("/api/delete-user-by-id/", middleware.AuthMiddleware(
		middleware.RoleMiddleware(handlers.DeleteUserByID, "admin"),
	))
}
