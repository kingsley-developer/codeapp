import { Request, Response, NextFunction} from "express"
import DB from "../db/db_connect"

export default class MiddleWare{
    static async create_user(req: Request, res: Response, next: NextFunction) {
        const { data } = req.body
        const { firstname,
            lastname,
            username,
            password,
            email
        } = JSON.parse(data)

        const newUser = await DB.Create_User(firstname, lastname, username, email, password)
        
        if (newUser.check) {
            return res.status(200).json(newUser)
        }
        res.status(200).json(newUser)
        next()
    }
       static async get_user_info(req: Request, res: Response, next: NextFunction) {
        const { username, password, type } = req.query
        const user = await DB.Get_User_Info(String(username), String(password), String(type))
        if (user.check) {
            return res.status(200).json(user)
        }
        res.status(200).json(user)
        next()
    }

    static async get_Saved_User(req: Request, res: Response, next: NextFunction) {
        const { user_id} = req.query
        const user = await DB.Get_Saved_User(Number(user_id))
        if (user.check) {
            return res.status(200).json(user)
        }
        res.status(200).json(user)
        next()
    }

    static async Create_Room(req: Request, res: Response, next: NextFunction){
        const { data } = req.body
        const { usr_id, roomname, roomdes, roomtag, roomvis, roomtotal_usr} = JSON.parse(data)

        const room = await DB.Created_Room(Number(usr_id), roomname, roomdes, roomtag, Boolean(roomvis), Number(roomtotal_usr))
        if(room.check){
            console.log(room)
            return res.status(200).json(room)
        }
        res.status(200).json(room)
        next()
    }

    static async Get_Created_Rooms(req: Request, res: Response, next: NextFunction){
        const {user_id} = req.query
        const room = await DB.Get_Created_Rooms(Number(user_id))
        if(room.check){
            return res.status(200).json(room)
        }
        res.status(200).json(room)
        next()
    }

    static async Get_All_Rooms(req: Request, res: Response, next: NextFunction){
        const room = await DB.GetAllRooms()
        if(room.check){
            return res.status(200).json(room)
        }
        res.status(200).json(room)
        next()
    }

    static async GetAllRoomsOnSearch(req: Request, res: Response, next: NextFunction){
        const {room_name_search} = req.query
        const room = await DB.GetAllRoomsOnSearch(String(room_name_search))
        if(room.check){
            return res.status(200).json(room)
        }
        res.status(200).json(room)
        next()
    }

    static async Get_All_Room_Name(req: Request, res: Response, next: NextFunction){
        const room = await DB.Get_All_Room_Name()
        if(room.check){
            return res.status(200).json(room)
        }
        res.status(200).json(room)
        next()
    }

    static async Update_User(req: Request, res: Response, next: NextFunction){
        const { data } = req.body
        const {
            id, 
            firstname,
            lastname,
            username,
            password,
            email,
            updateType
        } = JSON.parse(data)

        const updatedUser = await DB.Update_User(id, firstname, lastname, username, email, password, updateType)
        console.log(updatedUser)
        if (updatedUser?.check) {
            return res.status(200).json(updatedUser)
        }
        res.status(200).json(updatedUser)
        next()
    }

    static async Get_All_User_Msgs(req: Request, res: Response, next: NextFunction){

        const {id} = req.params
        const msgs = await DB.getAllUserMessages(Number(id))
        if (msgs.check) {
            return res.status(200).json(msgs)
        }
        res.status(200).json(msgs)
        next()
    }

    static async Add_Msgs(req: Request, res: Response, next: NextFunction){

        const { data } = req.body
        const {id, msg_name, msg_des} = JSON.parse(data)

        const msgs = await DB.Add_MSG(Number(id), String(msg_name), String(msg_des))
        if (msgs.check) {
            return res.status(200).json(msgs)
        }
        res.status(200).json(msgs)
        next()
    }

    static async Delete_All_Msgs(req: Request, res: Response, next: NextFunction){

        const { id } = req.params
        const msgs = await DB.deleteAllMessages(Number(id))
        if (msgs.check) {
            return res.status(200).json(msgs)
        }
        res.status(200).json(msgs)
        next()
    }

    static async Delete_Spec_Msgs(req: Request, res: Response, next: NextFunction){

        const { id, m_id } = req.query
        const msgs = await DB.deleteSpecificMessages(Number(id), Number(m_id))
        if (msgs.check) {
            return res.status(200).json(msgs)
        }
        res.status(200).json(msgs)
        next()
    }
}