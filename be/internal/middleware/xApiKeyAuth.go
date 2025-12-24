package middleware

import (
	"net/http"

	"github.com/ballinwza/2026-go-ro-monster/be/internal/config"
	"github.com/gin-gonic/gin"
)

func XApiKeyAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		apiKey := c.GetHeader("X-API-KEY")

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
