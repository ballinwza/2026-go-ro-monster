package main

import (
	"context"
	"log"
	"time"

	"github.com/ballinwza/2026-go-ro-monster/be/internal/config"
	"github.com/ballinwza/2026-go-ro-monster/be/internal/monster"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	cfg := config.LoadConfig()

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
	r.Use(cors.Default())
	r.SetTrustedProxies([]string{"127.0.0.1"})
	gin.SetMode(gin.DebugMode)

	v1 := r.Group("/api/v1")
	monsterHandler.MonsterRoutes(v1)

	r.Run(":" + cfg.Port)
}
