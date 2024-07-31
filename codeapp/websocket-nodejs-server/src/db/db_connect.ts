import mysql, {ConnectionOptions, RowDataPacket} from "mysql2/promise"
import "dotenv/config"
//import type{getLogInType} from  "../../codeapp-server.d.ts"

type get_user_signin = {
    data: RowDataPacket[],
    check: boolean
}
export default class DB{
    static access: ConnectionOptions = {
        user: "root",
        password:"12345",
        database: "codeapp_db",
        port: Number(process.env.MYSQLPORT),
}
    static async Create_User(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string) {
        try{
        const conn = await mysql.createConnection(DB.access)
        await conn.execute<RowDataPacket[]>(`
            insert into user_table(first_name, last_name, user_name, user_email, user_password)
            values(?, ?, ?, ?, ?)`, [firstname, lastname, username, email, password])
            return {
                check:true,
                msg: "Successful setup your data",
            }
        }
        catch (err: any) {
            return {
                check:false,
                msg: String(err)
            }
        }
    }
    static async addUserPic(username: string, profile_img: string) {
        try{
        const conn = await mysql.createConnection(DB.access)
        await conn.execute<RowDataPacket[]>(`update user_table set user_img = ? where user_name = ?`, [profile_img, username])
            return {
                check: true,
                msg: "Successful set profile image of the new user",
            }
        }
        catch (err: any) {
            return {
                check:false,
                msg: String(err)
            }
        }
    }
    static async Get_User_Info(username: string) {
        try {
        const conn = await mysql.createConnection(DB.access)
        
        const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_name = ?`, [username])
            return {
                check: true,
                data: result,
                msg: `Successfully signed up ${username}`
            }
        }
        catch (err: any) {
            return {
                check:false,
                data: {},
                msg: String(err)
            }
        }
    }
    static async Get_User_Info2(username: string, password: string): Promise<get_user_signin>{
        try {
            const conn = await mysql.createConnection(DB.access)
        
            const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_name = ?`, [username])
            if (result.length > 0) {
             return {
                data: result,
                check: true
            }   
            }
            else{
                return {
                data: [],
                check: false
            }
            }
        }
        catch (err: any) {
            return {
                data: [],
                check: false
            }
        }
    }
}