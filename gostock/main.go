package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintln(w, "Backend with Go is set")
		if err != nil {
			return
		}
	})
	fmt.Println("Serverot raboti na ovaa porta http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		return
	}
}
