package utils

import "fmt"

func Testing_Util() {
	fmt.Println("Yes working")
}

/*
import (
	"fmt"
	"log"
	"os"

)
func Get_Env_Port_Value() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")
	return port
}
*/
