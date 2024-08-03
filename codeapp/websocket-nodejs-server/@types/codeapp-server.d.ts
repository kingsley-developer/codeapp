import {RowDataPacket} from "mysql2/promise"

type get_user_sign = {
    data: RowDataPacket[],
    msg: string,
    check: boolean
}

type decrypt_return = {
    password: string,
    check: boolean
}

type get_user_signup = {
    check: boolean,
    msg: string
}

type get_user_img_res = {
    check: boolean,
    msg: string
}