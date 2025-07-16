package middleware

import (
	"net/http"
)

func RoleMiddleware(next http.HandlerFunc, allowedRoles ...string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		role := r.Context().Value(RoleContextKey)
		roleStr, ok := role.(string)
		if !ok {
			http.Error(w, "Role not found in context", http.StatusForbidden)
			return
		}

		for _, allowed := range allowedRoles {
			if roleStr == allowed {
				next(w, r)
				return
			}
		}
		http.Error(w, "Access denied: insufficient permissions", http.StatusForbidden)
	}
}
