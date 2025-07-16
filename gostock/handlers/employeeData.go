package handlers

import (
	"fmt"
	"net/http"
)

func EmployeeData(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintln(w, "Employee-level data access granted.")
	if err != nil {
		return
	}
}
