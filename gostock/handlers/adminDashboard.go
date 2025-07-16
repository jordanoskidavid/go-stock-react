package handlers

import (
	"fmt"
	"net/http"
)

func AdminDashboard(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintln(w, "Welcome to Admin Dashboard!")
	if err != nil {
		return
	}
}
