import { ConnectionOptions } from "mysql2/promise";
import "dotenv/config";
import { get_user_sign, get_user_signup, get_user_img_res } from "../../@types/codeapp-server";
export default class DB {
    static access: ConnectionOptions;
    static Create_User(firstname: string, lastname: string, username: string, email: string, password: string): Promise<get_user_signup>;
    static addUserPic(username: string, profile_img: string): Promise<get_user_img_res>;
    static Get_User_Info(username: string, password: string, type: string): Promise<get_user_sign>;
}
//# sourceMappingURL=db_connect.d.ts.map