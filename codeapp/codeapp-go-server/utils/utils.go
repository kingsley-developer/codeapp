package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	"github.com/kingsley-developer/codeapp/codeapp/codeapp-go-server/json_keys"
)

func Get_Env_Port_Value() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")
	return port
}

func Get_Env_emailjs_Value() json_keys.Email {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	data := json_keys.Email{
		ServiceID:  os.Getenv("serviceID"),
		TemplateID: os.Getenv("templateID"),
		Publickey:  os.Getenv("publickey"),
	}

	return data
}

func Get_Env_paystack_Value() json_keys.PayStack {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	data := json_keys.PayStack{
		LIVE_PUBLIC_KEY: os.Getenv("LIVE_PUBLIC_KEY"),
		LIVE_LIVE_KEY:   os.Getenv("LIVE_LIVE_KEY"),
		TEST_PUBLIC_KEY: os.Getenv("TEST_PUBLIC_KEY"),
	}

	return data
}
