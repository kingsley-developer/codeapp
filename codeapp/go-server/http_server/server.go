package http_server

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func Server() {
	Port := load_Env()
	app := fiber.New(fiber.Config{
		StrictRouting: true,
		CaseSensitive: true,
		AppName:       "Go Server Of Codeapp.com",
	})
	app.Use(cors.New())
	app.Listen(":" + Port)
}

func load_Env() (Port string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	Port = os.Getenv("PORT")
	return Port
}
