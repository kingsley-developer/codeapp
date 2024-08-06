import { verify } from "jsonwebtoken";
import { Request } from "express";
import { config } from "dotenv";

config()

export default function isAuth(req: Request){
    const authorization = req.header("authorization")
    console.log(authorization)
    if(!authorization) throw new Error("You need to login")
    const token = authorization.split(" ")[1]
    const {userId} = verify(token, String(process.env.ACCESS_TOKEN_SECRET))
    return userId
}