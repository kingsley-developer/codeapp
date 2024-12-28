import {RowDataPacket} from "mysql2/promise"

type get_user_sign = {
    data: RowDataPacket[],
    accesstoken: string,
    msg: string,
    check: boolean
}
type get_saved_user_sign = {
    check: boolean,
    data: RowDataPacket[],
    msg: string
}
type decrypt_return = {
    password: string,
    check: boolean
}

type get_user_signup = {
    check: boolean,
    msg: string
}

type Get_All_Room_Name_Type = {
    check: boolean,
    data: RowDataPacket[]
}

type Get_Created_Rooms_type = {
    check: boolean,
    data: RowDataPacket[]
}

type Get_All_Rooms_type = {
    check: boolean,
    data: RowDataPacket[]
}

type Created_Room_Type = {
    check: boolean,
    msg: string
}

type getAllMsgType = {
    check: boolean,
    data: RowDataPacket[]
}

type AddMsgType = {
    check: boolean
}

type DelAllMsgType = {
    check: boolean
}
type GetJoin = {
    check: boolean
}
type DelSpecificMsgType = {
    check: boolean
}
type DelSpecificMsgType = {
    check: boolean
}
type GetUsersCountType = {
    check: boolean,
    count: number | null
}