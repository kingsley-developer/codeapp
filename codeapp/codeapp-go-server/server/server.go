package server

import (
	"fmt"
	"log"
	"github.com/gofiber/fiber/v2"
   "github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/kingsley-developer/codeapp/codeapp/codeapp-go-server/utils"
)

func Server() {
	var port = utils.Get_Env_Port_Value()

	app := fiber.New(fiber.Config{
		ServerHeader:  "Codeapp Go Fiber Server",
		AppName:       "Codeapp Go Fiber Server",
		StrictRouting: true,
		CaseSensitive: true,
	})

	app.Use(cors.New())

	app.Get("/emailjs_keys", func(c *fiber.Ctx) error {
		data := utils.Get_Env_emailjs_Value()
		return c.JSON(data)
	})

	app.Get("/paystack_keys", func(c *fiber.Ctx) error {
		data := utils.Get_Env_paystack_Value()
		return c.JSON(data)
	})
	fmt.Println("Server listening on port: " + port)
	log.Fatal(app.Listen(":" + port))
}
