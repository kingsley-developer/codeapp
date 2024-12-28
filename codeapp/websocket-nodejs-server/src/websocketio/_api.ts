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
        API.app.use("/join_room", MiddleWare.Join_Room)
        API.app.use("/add_msgs", MiddleWare.Add_Msgs)
        API.app.use("/get_room_msgs", MiddleWare.Get_Room_Msgs)
        API.app.use("/insert_room_msg", MiddleWare.Insert_Room_Msg)
        API.app.use("/get_created_rooms", MiddleWare.Get_Created_Rooms)
        API.app.use("/get_joined_rooms", MiddleWare.Get_Joined_Rooms)
        API.app.use("/validate_joined_rooms2", MiddleWare.Validate_Joined_Rooms2)
        API.app.use("/validate_joined_checkowner", MiddleWare.validate_joined_checkowner)
        API.app.use("/get_all_room_name", MiddleWare.Get_All_Room_Name)
        API.app.use("/get_saved_user", MiddleWare.get_Saved_User)
        API.app.use("/get_all_rooms", MiddleWare.Get_All_Rooms)
        API.app.use("/get_all_user_count", MiddleWare.Get_All_User_Count)
        API.app.use("/get_all_rooms_on_search", MiddleWare.GetAllRoomsOnSearch)
        API.app.use("/get_all_rooms_on_select", MiddleWare.GetAllRoomsOnSelect)
        API.app.use("/delete_user_msgs/:id", MiddleWare.Delete_All_Msgs)
        API.app.use("/delete_spec_user_msgs", MiddleWare.Delete_Spec_Msgs)
        API.app.use("/get_created_rooms_count", MiddleWare.Get_Created_Rooms_Count)
        API.app.use("/get_joined_rooms_count", MiddleWare.Get_Joined_Rooms_Count)
        API.app.use("/get_user_recent_created_rooms", MiddleWare.Get_User_Recent_Created_Rooms)
        API.app.use("/get_user_recent_Joined_rooms", MiddleWare.Get_User_Recent_Joined_Rooms)
        API.app.use("/get_joined_rooms_names", MiddleWare.Get_Joined_Rooms_Names)
        
        API.app.post("/create_user", (req: Request, res: Response) => {
        })
        API.app.post("/insert_room_msg", (req: Request, res: Response) => {
        })
        API.app.post("/update_user", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_info", (req: Request, res: Response) => {
        })
        API.app.get("/get_room_msgs", (req: Request, res: Response) => {
        })
        API.app.get("/validate_joined_checkowner", (req: Request, res: Response) => {
        })
        API.app.get("/get_joined_rooms_names", (req: Request, res: Response) => {
        })
        API.app.get("/validate_joined_rooms2", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_recent_created_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_recent_joined_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_created_rooms_count", (req: Request, res: Response) => {
        })
        API.app.get("/get_joined_rooms_count", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_user_count", (req: Request, res: Response) => {
        })
        API.app.get("/get_saved_user", (req: Request, res: Response) => {
        })
        API.app.get("/get_user_msgs/:id", (req: Request, res: Response) => {
        })
        API.app.post("/create_room", (req: Request, res: Response) => {
        })
        API.app.post("/join_room", (req: Request, res: Response) => {
        })
        API.app.post("/add_msgs", (req: Request, res: Response) => {
        })
        API.app.get("/get_created_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_joined_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_rooms", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_rooms_on_search", (req: Request, res: Response) => {
        })
        API.app.get("/get_all_rooms_on_select", (req: Request, res: Response) => {
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
            })
            
            s.on("join_room", async(room_name: string[]) => {      
                s.join(room_name)
            })
            s.on("sender_msg", async(text:string, room_name: string) => {      
                s.broadcast.to(room_name).emit("receiver_msg",text)
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