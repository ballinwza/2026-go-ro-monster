package middleware

import (
	"net/http"

	"github.com/ballinwza/2026-go-ro-monster/be/internal/config"
	"github.com/gin-gonic/gin"
)

func XApiKeyGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		apiKey := c.GetHeader("x-api-key")

		requiredKey := config.LoadConfig().XApiKey

		if apiKey == "" || apiKey != requiredKey {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized: Invalid or missing API Key",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
