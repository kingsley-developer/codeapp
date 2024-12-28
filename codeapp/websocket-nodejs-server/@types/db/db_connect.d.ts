import { PoolOptions } from "mysql2/promise";
import "dotenv/config";
import { get_user_sign, get_user_signup, Get_All_Room_Name_Type, Get_Created_Rooms_type, Created_Room_Type, getAllMsgType, get_saved_user_sign, Get_All_Rooms_type, AddMsgType, DelAllMsgType, DelSpecificMsgType, GetJoin, GetUsersCountType } from "../../@types/codeapp-server";
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
    static GetAllRoomsOnSearch(room_name_search: string): Promise<Get_All_Rooms_type>;
    static GetAllRoomsOnSelect(room_name: string): Promise<Get_All_Rooms_type>;
    static Get_All_User_Count(): Promise<GetUsersCountType>;
    static Get_Created_Rooms_Count(userid: number): Promise<GetUsersCountType>;
    static Get_Joined_Rooms_Count(userid: number): Promise<GetUsersCountType>;
    static Get_Joined_Rooms_Names(userid: number): Promise<Get_All_Room_Name_Type>;
    static Get_Joined_Rooms(userid: number): Promise<Get_Created_Rooms_type>;
    static Validate_Joined_Rooms2(userid: number, room_name: string): Promise<GetJoin>;
    static validate_joined_checkowner(userid: number, room_id: number): Promise<GetJoin>;
    static Joined_Room(created_room_ID: number, usr_id: number, roomname: string, roomdes: string, roomtag: string, roomvis: boolean): Promise<Created_Room_Type>;
    static Get_User_Recent_Created_Rooms(id: number): Promise<Get_All_Rooms_type>;
    static Get_User_Recent_Joined_Rooms(id: number): Promise<Get_All_Rooms_type>;
    static Insert_Room_Msg(usr_id: number, created_room_id: number, msg: string, typeofmmsg2: string): Promise<GetJoin>;
    static Get_Room_Msgs(created_room_id: number): Promise<Get_All_Rooms_type>;
    static Delete_Joined_Room(created_room_id: number, user_id: number): Promise<GetJoin>;
}
//# sourceMappingURL=db_connect.d.ts.map