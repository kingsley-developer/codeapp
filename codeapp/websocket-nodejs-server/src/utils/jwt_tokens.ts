import { Response, Request } from "express";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config()

export default class JWT_Token{
    static createAccess(userId: number) {
        return sign({ userId }, String(process.env.ACCESS_TOKEN_SECRET), {
            expiresIn: "7d",
        })
    }
    static createRefresh(userId: number) {
        return sign({ userId }, String(process.env.REFRESH_TOKEN_SECRET), {
            expiresIn: "7d",
        })
    }
    static sendAccess(req: Request, res: Response, accessToken: string) {
        res.send({
            accessToken,
            email: req.body.email
        })
    }
    static sendRefresh(res: Response, refreshToken: string) {
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/refresh_token"
        })
    }
}