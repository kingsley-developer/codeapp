import cors from "cors"
import express, { Express, Request, Response } from "express"
import "dotenv/config"
import { Server } from "socket.io"
import { createServer } from "http"
import MiddleWare from "../middleware/middle"
import cookieParser from "cookie-parser";
import DB from "../db/db_connect"

export default class API{
    static app: Express = express()
    static port = process.env.PORT
    static server = createServer(API.app)
    static io = new Server(API.server, {
        cors:{
            origin: "http://localhost:5173"
        }
    })

    static async Server() {
        API.app.use(cors())
        API.app.use(express.json())
        API.app.use(express.urlencoded({extended:false}))
        API.app.use(cookieParser())
        
        API.app.use("/create_user", MiddleWare.create_user)
        API.app.use("/update_user", MiddleWare.Update_User)
        API.app.use("/get_user_info", MiddleWare.get_user_info)
        API.app.use("/get_user_msgs/:id", MiddleWare.Get_All_User_Msgs)
        API.app.use("/create_room", MiddleWare.Create_Room)
        API.app.use("/add_msgs", MiddleWare.Add_Msgs)
        API.app.use("/get_created_rooms", MiddleWare.Get_Created_Rooms)
        API.app.use("/get_all_room_name", MiddleWare.Get_All_Room_Name)
        API.app.use("/get_saved_user", MiddleWare.get_Saved_User)
        API.app.use("/get_all_rooms", MiddleWare.Get_All_Rooms)
        API.app.use("/get_all_rooms_on_search", MiddleWare.GetAllRoomsOnSearch)
        API.app.use("/delete_user_msgs/:id", MiddleWare.Delete_All_Msgs)
        API.app.use("/delete_spec_user_msgs", MiddleWare.Delete_Spec_Msgs)
        
        API.app.post("/create_user", (req: Request, res: Response) => {
        })
        API.app.post("/update_user", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_info", (req: Request, res: Response) => {
        })
        API.app.get("/get_saved_user", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_msgs/:id", (req: Request, res: Response) => {
        })
        API.app.post("/create_room", (req: Request, res: Response) => {
        })
        API.app.post("/add_msgs", (req: Request, res: Response) => {
        })
        API.app.get("/get_created_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_rooms_on_search", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_room_name", (req: Request, res: Response) => {
        })
        API.app.post("/delete_user_msgs/:id", (req: Request, res: Response) => {
        })
        API.app.post("/delete_spec_user_msgs", (req: Request, res: Response) => {
        })
        API.app.all("*", (req: Request, res: Response) => {
            res.status(404).json({success:false, msg:"No route"})
        })
        API.io.on("connection", (s) => {
            console.log("A user connected")
            s.on("disconnect", ()=>{
                console.log("User disconnected")
            })

            s.on("create_room", async(room_name: string[]) => {
                s.join(room_name)
                console.log(s.rooms)
            })
            
            s.on("join_room", (room_owner_id: number, room_name: string, privacy: string) => {
                 console.log("Join room name: "+room_name)
                 const check = [s.rooms]
                for(let i in check) {
                    if (i != room_name) {
                        console.log(i)
                        s.emit("user_join_room", {room_name, msg: "Room not joined already exist", success: false})
                        console.log("No room exist")
                        return;
                    }
                    else if (i == room_name) {
                        if(privacy){
                            s.join(room_name)
                        }
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
            s.on("server_msg_t_client_login_event", (user_name: string) => {
                
                const msg: string = `
                Thanks for logging in ${user_name} to codeapp.com the best social media
                platform for programmers and developer.
                `
                
                s.emit("server_msg_t_client_login", msg)
            })
        })
        API.server.listen(API.port, ()=>{
            console.log(`Server listening on port ${API.port}`)
        })
    }
}