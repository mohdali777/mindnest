import { RequestHandler } from "express";
import { inject, injectable } from "tsyringe";
import UserServiceI from "./Service/interface";

@injectable()
export default class UserController{
constructor(@inject("UserService") private UserService:UserServiceI){}
UpdateMood:RequestHandler = async(req:any,res,next)=>{
try {
const user = req.user
const Data = req.body
const resonse = await this.UserService.UpdateMood(user,Data)
res.status(200).json(resonse)
} catch (error) {
next(error)
}
}
}