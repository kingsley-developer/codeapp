import mysql, {ConnectionOptions, RowDataPacket} from "mysql2/promise"
import "dotenv/config"
import {
    decrypt_return,
    get_user_sign,
    get_user_signup,
    get_user_img_res
} from "../../@types/codeapp-server"
import Utils from "../utils/utils"

export default class DB{
    static access: ConnectionOptions = {
        user: "root",
        password:String(process.env.MYSQLPASS),
        database: "codeapp_db",
        port: Number(process.env.MYSQLPORT),
}
    static async Create_User(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string): Promise<get_user_signup> {
        try{
            const conn = await mysql.createConnection(DB.access)
            const hashpassword = await Utils.encrypt_Pass(password)
            const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_name = ?`, [username])

            if(result.length == 0){
                const [res] = await conn.execute<RowDataPacket[]>(`
                insert into user_table(first_name, last_name, user_name, user_email, user_password)
                values(?, ?, ?, ?, ?)`, [firstname, lastname, username, email, hashpassword])
                if([res].length > 0){
                return {
                    check:true,
                    msg: "Successfull setup your data",
                }
            }
            else{
                return {
                check:false,
                msg: "Not successfull",
            }   
            }
            }
            else{
                return {
                    check:false,
                    msg: "Not successfull",
            }   
            }
        }
        catch (err: any) {
            return {
                check:false,
                msg: String(err)
            }
        }
    }
    static async addUserPic(username: string, profile_img: string): Promise<get_user_img_res> {
        try{
        const conn = await mysql.createConnection(DB.access)
        const [result] = await conn.execute<RowDataPacket[]>(`update user_table set user_img = ? where user_name = ?`, [profile_img, username])    
            
            if([result].length > 0){
                return {
                    check: true,
                    msg: "Successful set profile image of the new user",
                }
            }
            else{
                return {
                check:false,
                msg: "Not successfull",
            }   
            }
        }
        catch (err: any) {
            return {
                check:false,
                msg: String(err)
            }
        }
    }

    static async Get_User_Info(username: string, password: string, type: string): Promise<get_user_sign>{
        try {
        const conn = await mysql.createConnection(DB.access)
        const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_name = ?`, [username])    
        if (result.length > 0) {
                const res: decrypt_return = await Utils.decrypt_Pass(result[0].user_password, password)
                if (res.check) {
                return {
                  data: result,
                  msg:(type == "signup"? "Successfully signed up: "+result[0].user_name : "Successfully signed in: "+result[0].user_name),
                  check: true
                }   
                }
                else {
                 return {
                  data: [],
                  msg:(type == "signup"? "Sorry not successfull" : "Username "+result[0].user_name+" exist but the password incorrect"),
                  check: false
                }   
            }    
            }
            else{
                return {
                data: result,
                msg: (type == "signup"? "Sorry not successfull" : "User doesnt exist"),
                check: false
            }
            }
        }
        catch (err: any) {
            return {
                check:false,
                data: [],
                msg: String(err)
            }
        }
    }
}