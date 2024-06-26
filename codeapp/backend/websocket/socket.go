package websocket

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
)

func Chat_System(clients_msg string) {
	server := socketio.NewServer(nil)
	router := gin.New()
	port := Get_Env_Port_Value()

	server.OnConnect("connection", func(s socketio.Conn) error {
		s.Emit("session_id", s.ID())
		return nil
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		// server.Remove(s.ID()) NO PROPERTY REMOVE CHECK WHY
		fmt.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		// Add the Remove session id. Fixed the connection & mem leak
		//server.Remove(s.ID()) NO PROPERTY REMOVE CHECK WHY
		fmt.Println("closed", reason)
	})

	go func() {
		if err := server.Serve(); err != nil {
			log.Fatalf("Socketio listen error: %s\n", err)
		}
	}()
	defer server.Close()

	router.Use(Cors_Utils("http://localhost:3000"))
	router.GET("/socket.io/", gin.WrapH(server))
	router.POST("/socket.io/", gin.WrapH(server))
	router.StaticFS("/public", http.Dir("./asset"))
	if err := router.Run(":" + port); err != nil {
		log.Fatal("failed run app:", err)
	}
	log.Println("Serving at localhost: 8000...")
}
