import cors from "cors"
import express, { Express, Request, Response } from "express"
import "dotenv/config"
import { Server } from "socket.io"
import { createServer } from "http"
import MiddleWare from "../middleware/middle"
export default class API{
    static app: Express = express()
    static port = process.env.PORT
    static server = createServer(API.app)
    static io = new Server(API.server)

    static Server() {
        API.app.use(cors())
        API.app.use(express.json())
        API.app.use(express.urlencoded({extended:false}))
        API.app.use("/create_user", MiddleWare.create_user)
        API.app.use("/create_user_pic", MiddleWare.create_user_pic)
        API.app.use("/get_user_info", MiddleWare.get_user_info)
        API.app.use("/get_user_info2", MiddleWare.get_user_info2)

        API.app.post("/create_user", (req: Request, res: Response) => {
        })
        API.app.post("/create_user_pic", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_info", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_info2", (req: Request, res: Response) => {
        })
        API.app.all("*", (req: Request, res: Response) => {
            res.status(404).json({success:false, msg:"No route"})
        })
        API.io.on("connection", (s) => {
            console.log("A user connected")
            s.on("disconnect", ()=>{
                console.log("User disconnected")
            })
            s.on("create_room", (room_name: string) => {
                console.log("Create room name: "+room_name)
                console.log("rooms before newly created rooms added: ")
                console.log(s.rooms)

                for(let i in s.rooms) {
                    if (i == room_name) {
                        console.log(i)
                        s.emit("user_room_created", {room_name, msg: "Room not created", success: false})
                        console.log("room already exist")
                        return;
                    }
                }
                s.join(room_name)
                console.log("rooms after newly created rooms added: ")
                console.log(s.rooms)
                s.emit("user_room_created", {room_name, msg: "Room Created", success: true})
            })
            s.on("join_room", (room_name: string) => {
                 console.log("Join room name: "+room_name)
                for(let i in s.rooms) {
                    if (i != room_name) {
                        console.log(i)
                        s.emit("user_join_room", {room_name, msg: "Room not joined already exist", success: false})
                        console.log("No room exist")
                        return;
                    }
                    else if (i == room_name) {
                        console.log(i)
                        s.join(room_name)
                        s.emit("user_join_room", {room_name, msg: "Room joined", success: true})
                        return;
                    }
                }
                
            })

            s.on("delete_created_room", (room_name: string) => {
                console.log("Created room name about to be deleted: " + room_name)
                if (room_name.length <= 0) {
                    s.emit("user_deleted_created_room", {room_name, msg: "Created room not deleted as the room name is not provided", success: false})
                    return
                }
                s.leave(room_name)
                s.emit("user_deleted_created_room", {room_name, msg: "Created room successfully deleted", success: true})
            })

            s.on("user_leave_room_event", (room_name: string) => {
                console.log("Joined room name about to be deleted: " + room_name)
                if (room_name.length <= 0) {
                    s.emit("user_leave_room", {room_name, msg: "Joined room not left as the room name is not provided", success: false})
                    return
                }
                s.leave(room_name)
                s.emit("user_leave_room", {room_name, msg: "Joined room successfully removed", success: true})
            })

            s.on("owner_msg_to_his_created_room_event", (room_name: string, msg: string) => {
                if (msg.length <= 0) {
                 s.emit("owner_msg_disable", true)   
                }
                s.broadcast.to(room_name).emit("owner_msg", msg)
                 s.emit("owner_msg_disable", false)
            })

            s.on("user_msg_to_joined_room_event", (room_name: string, msg: string) => {
                if (msg.length <= 0) {
                 s.emit("user_msg_disable", true)   
                }
                s.broadcast.to(room_name).emit("user_msg", msg)
                s.emit("user_msg_disable", false)
            })

        })
        API.server.listen(API.port, ()=>{
            console.log(`Server listening on port ${API.port}`)
        })
    }
}