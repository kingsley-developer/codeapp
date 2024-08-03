import bycrypt from "bcrypt"
import {decrypt_return} from "../../@types/codeapp-server"

const saltRound = 10

export default class Utils{
    static async encrypt_Pass(password: string): Promise<string> {
        const result: Promise<string> = bycrypt.hash(password, saltRound)
        return result
     }
    static async decrypt_Pass(hash: string, password: string):Promise<decrypt_return>{
        const result = await bycrypt.compare(password, hash)
        if (result) {
            return {
                password,
                check: true   
            }
        }
        else{
            return {
                password: "",
                check: false   
            }
        }
    }
}