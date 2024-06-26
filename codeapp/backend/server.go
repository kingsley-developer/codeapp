package main

import (
	"github.com/kingsley-developer/codeapp/codeapp/backend/websocket"
)

func main() {
	_, clients_msg := websocket.Msg_To_Clients("./jsondata/server_msg_clients.json")
	websocket.Chat_System(clients_msg)
}
