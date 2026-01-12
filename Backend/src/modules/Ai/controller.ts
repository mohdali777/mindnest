import { inject, injectable } from "tsyringe";
import AiServiceI from "./Service/interface";
import { RequestHandler } from "express";

@injectable()

export default class AI_CONTROLLER{
constructor(@inject("AiService") private AiService:AiServiceI){}
ChatAi:RequestHandler = async(req:any,res,next)=>{
try {
const Data = req.body
const user = req.user as any
const {section_id} = req.query
const Response = await this.AiService.Chat(Data,user,section_id)
console.log(Response);

res.status(200).json(Response)
} catch (error) {
next(error)
}
}

FindMany:RequestHandler = async(req:any,res,next)=>{
    try {
     const {section_id}  = req.query
     const user = req.user
     const Data = await this.AiService.FindMany(section_id,user)
     res.status(200).json(Data)
    } catch (error) {
        next(error)
    }
}
}