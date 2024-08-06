import { Response, Request } from "express";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config()

export function createAccess(userId:number){
    return sign({userId}, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: "15m",
    })
}

export function createRefresh(userId:number){
    return sign({userId}, String(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: "7d",
    })
}

export function sendAccess(req: Request, res: Response, accessToken:string){
    res.send({
        accessToken,
        email: req.body.email
    })
}
export function sendRefresh(res: Response, refreshToken:string){
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/refresh_token"
    })
}