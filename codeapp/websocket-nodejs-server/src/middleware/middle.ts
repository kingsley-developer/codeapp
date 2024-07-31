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
            return res.status(201).json(newUser)
        }
        res.status(404).json(newUser)
        next()
    }

    static async create_user_pic(req: Request, res: Response, next: NextFunction) {
        const {data} = req.body
        const { username, profile_img } = JSON.parse(data)
        const newUser_Img = await DB.addUserPic(username, profile_img)
        if (newUser_Img.check) {
            return res.status(200).json(newUser_Img)
        }
        res.status(404).json(newUser_Img)
        next()
    }

    static async get_user_info(req: Request, res: Response, next: NextFunction) {
        const { username} = req.query
        const user = await DB.Get_User_Info(String(username))
        if (user.check) {
            return res.status(200).json(user)
        }
        res.status(404).json(user)
        next()
    }
       static async get_user_info2(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.query
        console.log(req.query)
        const user = await DB.Get_User_Info2(String(username), String(password))
        if (user.check) {
            return res.status(200).json(user)
        }
        res.status(404).json(user. )
        next()
    }
}