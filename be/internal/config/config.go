package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	MongoURI string
	DBName   string
	Mode     string
	FeDomain string
	XApiKey  string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: not found .env file")
	}

	return &Config{
		Port:     getEnv("PORT", "8080"),
		MongoURI: getEnv("MONGO_CONN", ""),
		DBName:   getEnv("DB_NAME", ""),
		Mode:     getEnv("MODE", "development"),
		FeDomain: getEnv("FE_DOMAIN", "http://localhost:3000"),
		XApiKey:  getEnv("X_API_KEY", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultValue
}
