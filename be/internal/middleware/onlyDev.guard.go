package middleware

import (
	"net/http"

	"github.com/ballinwza/2026-go-ro-monster/be/internal/config"
	"github.com/gin-gonic/gin"
)

func OnlyDevGuard() gin.HandlerFunc {
	cfg := config.LoadConfig()
	return func(c *gin.Context) {
		if cfg.Mode != "development" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden in production"})
			c.Abort()
			return
		}
		c.Next()
	}
}
