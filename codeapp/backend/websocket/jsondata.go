package websocket

type ServerMsg_To_Clients struct {
	Id  int    `json: "id"`
	Msg string `json: "msg"`
}

type JoinRoom struct {
	Num_Conn  int    `json: "num_conn"`
	Room_name string `json: "room_name"`
}
