import { inject, injectable } from "tsyringe";
import AuthServiceI from "./Service/interfcae";
import { RequestHandler } from "express";

@injectable()
export default class AuthController{
constructor(@inject("AuthService") private AuthService:AuthServiceI){}
Login:RequestHandler = async(req,res,next)=>{
try {
const Data = req.body
const response = await this.AuthService.Login(Data)
res.cookie("AccessToken",response.AccessToken,{
httpOnly:true,
secure:process.env.NODE_ENV === "production",
sameSite:"lax",
maxAge: 900000,
path:"/" 
})
res.cookie("RefreshToken",response.RefreshToken,{
httpOnly:true,
secure:process.env.NODE_ENV === "production",
sameSite:"lax",
maxAge: 7 * 24 * 60 * 60 * 1000,
path:"/" 
})
res.status(200).json(response.UserPayload)
} catch (error) {
next(error)
}
}

Signup:RequestHandler = async(req,res,next)=>{
try {
const Data = req.body
const response = await this.AuthService.Signup(Data)
res.cookie("AccessToken",response.AccessToken,{
httpOnly:true,
secure:process.env.NODE_ENV === "production",
sameSite:"lax",
maxAge: 900000,
path:"/" 
})
res.cookie("RefreshToken",response.RefreshToken,{
httpOnly:true,
secure:process.env.NODE_ENV === "production",
sameSite:"lax",
maxAge: 7 * 24 * 60 * 60 * 1000,
path:"/" 
})
res.status(201).json(response.UserPayload)
} catch (error) {
next(error)
}
}

GenarateAccess:RequestHandler = async(req,res,next)=>{
try {
const refreshToken = req.cookies.RefreshToken
const AccessToken = await this.AuthService.GenarateAccessToken(refreshToken)
res.cookie("AccessToken",AccessToken,{
httpOnly:true,
secure:process.env.NODE_ENV === "production",
sameSite:"lax",
maxAge: 900000,
path:"/" 
})
res.status(200).json({message:"token genarated success"})
} catch (error) {
next(error)
}
}

VerifyUser:RequestHandler = async(req,res,next)=>{
try {
const refreshToken = req.cookies.RefreshToken
const Data = await this.AuthService.VerifyUser(refreshToken)
res.status(200).json(Data)
} catch (error) {
next(error)
}
}

Logout:RequestHandler = async(req,res,next)=>{
try {
res.clearCookie("RefreshToken", { path: "/" });
res.clearCookie("AccessToken", { path: "/" });
res.status(200).json({ message: "Logged out successfully" })
} catch (error) {
next(error)
}
}
}