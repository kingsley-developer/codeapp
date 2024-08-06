import { config } from "dotenv";
import express, { Express, Response, Request } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { hash, compare } from "bcrypt";
import moment from "moment";
import KingDb from "./Fake-db";
import { createAccess, createRefresh, sendAccess, sendRefresh } from "./tokens";
import isAuth from "./isAuth";
import { verify } from "jsonwebtoken";

config()
const app : Express = express()
const PORT: number = Number(process.env.PORT)
const date: string = moment().calendar()

app.use(cors({
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())

export default function Server(){
    app.post("/register", async(Req: Request, Res:Response)=>{
        let {email, password} = Req.body
       try{
        const user = KingDb.find(u => u.email === email)
        if(user) throw new Error("User already exist")

        const hashpassword = await hash(password, 10)
        KingDb.push({
            id: KingDb.length,
            email,
            password: hashpassword,
            refreshtoken: ""
        })

        Res.status(200).json({date, msg:"Successful", data:KingDb})
    }
    catch(e:any){
        Res.status(404).json({date, msg:"Failed to create user: "+e.message})
    }
    })
    app.post("/login", async(Req: Request, Res:Response)=>{
        let {email, password} = Req.body
        try{
         const user = KingDb.find(u => u.email === email)
         if(!user) throw new Error("User doesnt exist")
 
         const valid = await compare(password, user.password)
         if(!valid) throw new Error("Password not correct")

         const accesstoken: string = createAccess(user.id)
         const refreshtoken: string = createRefresh(user.id)

         user.refreshtoken = refreshtoken
         sendRefresh(Res, refreshtoken)
         sendAccess(Req, Res, accesstoken)
     }
     catch(e:any){
         Res.status(404).json({date, msg:e.message})
     }
    })
    app.post("/logout", async(_Req: Request, Res:Response)=>{
        Res.status(200).clearCookie("refreshtoken", {path:"/refresh_token"})
        Res.status(200).json({msg:"Logged out"})
    })
    app.post("/protected", async(Req: Request, Res:Response)=>{
        try{
            const userId = isAuth(Req)
            if(userId !== null){
                Res.status(200).json({date, msg:"Sent 500000$"})
            }
        }
        catch(e:any){
            Res.status(200).json({date, err:e})
        }
    })
    app.post("/refresh_token", (Req: Request, Res:Response)=>{
        const token = Req.cookies.refreshtoken
        if(!token) return Res.status(404).json({accesstoken: ""})

        let payload: any = null;
        try{
            payload = verify(token, String(process.env.REFRESH_TOKEN_SECRET))
        }catch(err:any){
            return Res.status(404).json({accesstoken: ""})
        }
        const user = KingDb.find(user => user.id === payload.userId)
        if(!user) return Res.status(404).json({accesstoken: ""})
        if(user.refreshtoken !== token){
            return Res.status(404).json({accesstoken: ""})
        }
        const accessToken = createAccess(user.id)
        const refreshToken = createRefresh(user.id)
        user.refreshtoken = refreshToken

        sendRefresh(Res, refreshToken)
        Res.status(200).json({accessToken})
    })

    app.use("*", (_Req: Request, Res: Response)=>{
        Res.status(404).json({date, msg:"Page not found"})
    })
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`)
    })
}