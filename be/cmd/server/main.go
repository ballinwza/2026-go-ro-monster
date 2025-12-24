package main

import (
	"context"
	"log"
	"time"

	"github.com/ballinwza/2026-go-ro-monster/be/internal/config"
	"github.com/ballinwza/2026-go-ro-monster/be/internal/middleware"
	"github.com/ballinwza/2026-go-ro-monster/be/internal/monster"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	cfg := config.LoadConfig()
	onProduction := "production"

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.MongoURI))
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database(cfg.DBName)

	monsterRepo := monster.NewRepository(db)
	monsterService := monster.NewService(monsterRepo)
	monsterHandler := monster.NewHandler(monsterService)

	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.FeDomain},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("X-Content-Type-Options", "nosniff")
		c.Writer.Header().Set("X-Frame-Options", "DENY")
		c.Writer.Header().Set("X-XSS-Protection", "1; mode=block")
		c.Next()
	})
	r.SetTrustedProxies(nil)

	if cfg.Mode == onProduction {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	v1 := r.Group("/api/v1")
	if cfg.Mode == onProduction {
		v1.Use(middleware.XApiKeyAuth())
	}
	{
		monsterHandler.MonsterRoutes(v1)
	}

	r.Run(":" + cfg.Port)
}
