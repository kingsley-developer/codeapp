import mysql, {PoolOptions, RowDataPacket} from "mysql2/promise"
import "dotenv/config"
import {
    decrypt_return,
    get_user_sign,
    get_user_signup,
    Get_All_Room_Name_Type,
    Get_Created_Rooms_type,
    Created_Room_Type,
    getAllMsgType,
    get_saved_user_sign,
    Get_All_Rooms_type,
    AddMsgType,
    DelAllMsgType,
    DelSpecificMsgType
} from "../../@types/codeapp-server"
import Utils from "../utils/utils"
import JWT_Token from '../utils/jwt_tokens';
export default class DB{
    static access: PoolOptions = {
        user: "root",
        password:String(process.env.MYSQLPASS),
        database: "codeapp_db",
        port: Number(process.env.MYSQLPORT),
        connectionLimit:50
}
    static async Create_User(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string): Promise<get_user_signup> {
        try{
            const conn = await mysql.createPool(DB.access)
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
    
    static async Get_User_Info(username: string, password: string, type: string): Promise<get_user_sign>{
        try {
        const conn = await mysql.createPool(DB.access)
        const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_name = ?`, [username])    
        if (result.length > 0) {
                const res: decrypt_return = await Utils.decrypt_Pass(result[0].user_password, password)
            if (res.check) {
                const accesstoken: string = JWT_Token.createAccess(result[0].user_id)
                const refreshtoken: string = JWT_Token.createRefresh(result[0].user_id)
                
                const [result2] = await conn.execute<RowDataPacket[]>(`update user_table set refresh_token = ? where user_name = ?`, [refreshtoken, username])
                const array1 = [result2]
                if(array1.length > 0){
                    return {
                        data: result,
                        accesstoken,
                    msg:(type == "signup"? "Successfully signed up: "+result[0].user_name : "Successfully signed in: "+result[0].user_name),
                    check: true
                }
                } 
                return {
                    data: [],
                    accesstoken: "",
                  msg:(type == "signup"? "Not authenticated" : "Not authenticated"),
                  check: false
                }
                }
                else {
                 return {
                     data: [],
                     accesstoken:"",
                  msg: (type == "signup"? "Sorry not successful" : "Username "+result[0].user_name+" exist but the password incorrect"),
                  check: false
                }   
            }    
            }
            else{
                return {
                    data: result,
                    accesstoken:"",
                msg: (type == "signup"? "Sorry not successful" : "User doesnt exist"),
                check: false
            }
            }
        }
        catch (err: any) {
            return {
                check: false,
                accesstoken:"",
                data: [],
                msg: String(err)
            }
        }
    }

    static async Get_Saved_User(usr_id: number):Promise<get_saved_user_sign>{
         try {
        const conn = await mysql.createPool(DB.access)
        const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_id = ?`, [usr_id])    
        if (result.length > 0) {
            return {
                check: true,
                data: result,
                msg: "Successfully Setup your data"
            }  
        }
        else{
            return {
                check: false,
                data: [],
                msg: "Unsuccessfully setup your data"
            } 
        }
        }
        catch (err: any) {
            return {
                check: false,
                data: [],
                msg: String(err)
            }
        }
    }
    static async Created_Room(usr_id: number, roomname: string, roomdes: string, roomtag: string, roomvis: boolean, roomtotal_usr:number): Promise<Created_Room_Type> {
        try {
        const conn = await mysql.createPool(DB.access)
        const [result] = await conn.execute<RowDataPacket[]>(`select room_name from user_room_created where room_name = ?`, [roomname])
        console.log(`Finally: ${result}`)    
        if (result.length == 0) {
            const [res] = await conn.execute<RowDataPacket[]>(`
            insert into user_room_created (user_id, room_name, room_des, room_tag, room_visibility, room_total_usr)
            values(?,?,?,?,?,?)`,
            [usr_id, roomname, roomdes, roomtag, roomvis, roomtotal_usr])

            if([res].length > 0){
                return {
                    check:true,
                    msg: "Successfully created room",
                }
            }
            else{
                return {
                check:false,
                msg: "Not successful",
            }   
            }
            }
            else {
                return {
                    check:false,
                    msg: "Room Exist",
                }
            }
        
        }

        catch(e:any){
            return {
                    check:false,
                    msg: String(e),
                }
        }
    }

    static async Get_Created_Rooms(userid: number):Promise<Get_Created_Rooms_type>{
        try {
        const conn = await mysql.createPool(DB.access)
        const [result] = await conn.execute<RowDataPacket[]>(`
            select created_room_id, room_name, room_des, room_tag, room_visibility, room_total_usr from user_room_created
            where user_id=?`,
            [userid])
        if(result.length > 0){
            return {
                check: true,
                data: result
            }
            }
        return{
            check:false,
            data:[]
        }
        }
        
        catch(e:any){
            return {
                check: false,
                data:[]
            }
        }
        
    }

    static async Get_All_Room_Name():Promise<Get_All_Room_Name_Type>{
        try{
            const conn = await mysql.createPool(DB.access)
            const [result] = await conn.execute<RowDataPacket[]>(`select room_name from user_room_created`)
            if(result.length > 0){
            return {
                check: true,
                data: result
            }
            }
            else{
                return{
            check:false,
            data:[]
        }
            }
        
        }
        catch(e: any){
            return {
                check: false,
                data: []
            }
        }
        
    }

    static async GetAllRooms():Promise<Get_All_Rooms_type> {
        try{
            const conn = await mysql.createPool(DB.access)
            const [result] = await conn.execute<RowDataPacket[]>(`select created_room_id, room_name, room_des, room_tag, room_visibility, room_total_usr from user_room_created`)
            if(result.length > 0){
            return {
                check: true,
                data: result
            }
            }
            else{
                return{
            check:false,
            data:[]
        }
            }
        
        }
        catch(e: any){
            return {
                check: false,
                data: []
            }
        }
    }

    static async Update_User(
        id:number,
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string,
        updateType: string){
        try{
        const conn = await mysql.createPool(DB.access)    
        const [result] = await conn.execute<RowDataPacket[]>(`select * from user_table where user_id = ?`, [id])
        if(result.length > 0){
            if(updateType == "firstname"){
                const [res1] = await conn.execute<RowDataPacket[]>(`update user_table set first_name = ? where user_id = ?`, [firstname, id])
                    if([res1].length > 0){
                    return {
                        check:true,
                        msg: "Successfully updated your firstname",
                    }
                }
                    else{
                        return {
                            check:false,
                            msg: "Failed update",
                        } 
                    }
            }
            else if(updateType == "lastname"){
                const [res1] = await conn.execute<RowDataPacket[]>(`update user_table set last_name = ? where user_id = ?`, [lastname, id])
                    if([res1].length > 0){
                    return {
                        check:true,
                        msg: "Successfully updated your lastname",
                    }
                }
                    else{
                        return {
                            check:false,
                            msg: "Failed update",
                        } 
                    }
            }
            else if(updateType == "username"){
                const [res1] = await conn.execute<RowDataPacket[]>(`update user_table set user_name = ? where user_id = ?`, [username, id])
                    if([res1].length > 0){
                    return {
                        check:true,
                        msg: "Successfully updated your username",
                    }
                }
                    else{
                        return {
                            check:false,
                            msg: "Failed update",
                        } 
                    }
            }
            else if(updateType == "email"){
                const [res1] = await conn.execute<RowDataPacket[]>(`update user_table set user_email = ? where user_id = ?`, [email, id])
                    if([res1].length > 0){
                    return {
                        check:true,
                        msg: "Successfully updated your email",
                    }
                }
                    else{
                        return {
                            check:false,
                            msg: "Failed update",
                        } 
                    }
            }
            else if(updateType == "password"){
                const hashpassword = await Utils.encrypt_Pass(password)
                const [res1] = await conn.execute<RowDataPacket[]>(`update user_table set user_password = ? where user_id = ?`, [hashpassword, id])
                    if([res1].length > 0){
                    return {
                        check:true,
                        msg: "Successfully updated your password",
                    }
                }
                    else{
                        return {
                            check:false,
                            msg: "Failed updated",
                        } 
                    }
            }          
        }
        else{
            return {
            check:false,
            msg: "Not successful",
        }   
        }
        }
        catch(e:any){
            return{
                check:false,
                msg:String(e)
            }
        }
    }

    static async getAllUserMessages(id:number):Promise<getAllMsgType>{
        try{
            const conn = await mysql.createPool(DB.access)
            const [result] = await conn.execute<RowDataPacket[]>(`select msg_id, msg_name, msg_des from user_msg where user_id = ?`, [id])
            if(result.length > 0){
            return {
                check: true,
                data: result
            }
            }
            else{
                return{
            check:false,
            data:[]
        }
            }
        
        }
        catch(e: any){
            return {
                check: false,
                data: []
            }
        }        
    }

    static async Add_MSG(id:number, m_name: string, m_des: string):Promise<AddMsgType>{
        try {
            const conn = await mysql.createPool(DB.access)
            const [res] = await conn.execute<RowDataPacket[]>(`
            insert into user_msg (user_id, msg_name, msg_des)
            values(?,?,?)`,
            [id, m_name, m_des])

            if([res].length > 0){
                return {
                    check:true,
                }
            }
            else{
                return {
                check:false,
            }   
            }
        }
        catch(e:any){
            return {
                    check:false,
                }
        }
    }

    static async deleteAllMessages(id:number): Promise<DelAllMsgType>{
        try {
            const conn = await mysql.createPool(DB.access)
            const [res] = await conn.execute<RowDataPacket[]>(`delete * from user_msg where user_id = ?`,[id])

            if([res].length > 0){
                return {
                    check:true,
                }
            }
            else{
                return {
                check:false,
            }   
            }
        }
        catch(e:any){
            return {
                    check:false,
                }
        }
    }

    static async deleteSpecificMessages(id:number, m_id:number): Promise<DelSpecificMsgType>{
        try {
            const conn = await mysql.createPool(DB.access)
            const [res] = await conn.execute<RowDataPacket[]>(`delete * from user_msg where user_id = ? and msg_id = ?`,[id, m_id])

            if([res].length > 0){
                return {
                    check:true,
                }
            }
            else{
                return {
                check:false,
            }   
            }
        }
        catch(e:any){
            return {
                    check:false,
                }
        }
    }

    static async GetAllRoomsOnSearch(room_name_search:string):Promise<Get_All_Rooms_type> {
        try{
            const conn = await mysql.createPool(DB.access)
            const [result] = await conn.execute<RowDataPacket[]>(`select created_room_id, room_name, room_des, room_tag, room_visibility, room_total_usr from user_room_created where room_name like %?%`, [room_name_search])
            console.log(result)
            if(result.length > 0){
            return {
                check: true,
                data: result
            }
            }
            else{
                return{
            check:false,
            data:[]
        }
            }
        
        }
        catch(e: any){
            return {
                check: false,
                data: []
            }
        }
    }
}
