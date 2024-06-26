package websocket

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jdkato/prose/v2"
	"github.com/joho/godotenv"
)

func Msg_To_Clients(jsonPath string) (int, string) {
	file, err := os.Open(jsonPath)

	if err != nil {
		fmt.Println(err)
		return -1, ""
	}

	defer file.Close()

	var datas []ServerMsg_To_Clients

	err = json.NewDecoder(file).Decode(&datas)
	if err != nil {
		fmt.Println(err)
		return -1, ""
	}

	firstData := datas[0]
	return firstData.Id, firstData.Msg
}

func Cors_Utils(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", `Accept, 
		Authorization,
		Content-Type,
		Content-Length, 
		X-CSRF-Token, 
		Token,
		Session, 
		Origin, 
		Host, 
		Connection, 
		Accept-Encoding, 
		Accept-Language, 
		X-Requested-With
		`)

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Request.Header.Del("Origin")

		c.Next()
	}
}

func Get_Env_Port_Value() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	port := os.Getenv("PORT")
	return port
}

func Tokenization_Validate_Msg(msg string) (bool, string) {
	msg = strings.ToLower(msg)

	doc, err := prose.NewDocument(msg)

	if err != nil {
		log.Fatal(err)
	}

	for _, token := range doc.Tokens() {
		for _, value := range L_Not_To_Use {
			if token.Text == value {
				fmt.Println("Bad Language")
				fmt.Println(token.Text, value)
				return true, value
			}
		}
	}
	return false, ""
}
