import {io} from "socket.io-client"

const Socket = io("http://localhost:8999")

export default Socket
