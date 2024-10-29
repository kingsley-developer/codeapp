import { PoolOptions } from "mysql2/promise";
import "dotenv/config";
import { get_user_sign, get_user_signup, Get_All_Room_Name_Type, Get_Created_Rooms_type, Created_Room_Type, getAllMsgType, get_saved_user_sign, Get_All_Rooms_type, AddMsgType, DelAllMsgType, DelSpecificMsgType } from "../../@types/codeapp-server";
export default class DB {
    static access: PoolOptions;
    static Create_User(firstname: string, lastname: string, username: string, email: string, password: string): Promise<get_user_signup>;
    static Get_User_Info(username: string, password: string, type: string): Promise<get_user_sign>;
    static Get_Saved_User(usr_id: number): Promise<get_saved_user_sign>;
    static Created_Room(usr_id: number, roomname: string, roomdes: string, roomtag: string, roomvis: boolean, roomtotal_usr: number): Promise<Created_Room_Type>;
    static Get_Created_Rooms(userid: number): Promise<Get_Created_Rooms_type>;
    static Get_All_Room_Name(): Promise<Get_All_Room_Name_Type>;
    static GetAllRooms(): Promise<Get_All_Rooms_type>;
    static Update_User(id: number, firstname: string, lastname: string, username: string, email: string, password: string, updateType: string): Promise<{
        check: boolean;
        msg: string;
    } | undefined>;
    static getAllUserMessages(id: number): Promise<getAllMsgType>;
    static Add_MSG(id: number, m_name: string, m_des: string): Promise<AddMsgType>;
    static deleteAllMessages(id: number): Promise<DelAllMsgType>;
    static deleteSpecificMessages(id: number, m_id: number): Promise<DelSpecificMsgType>;
}
//# sourceMappingURL=db_connect.d.ts.map