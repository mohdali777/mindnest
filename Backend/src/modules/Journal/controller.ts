import { inject, injectable } from "tsyringe";
import JournalServiceI from "./Service.ts/interface";
import { RequestHandler } from "express";

@injectable()

export default class JournalController{
    constructor(@inject("JournalService") private JournalService:JournalServiceI){}

    Create:RequestHandler = async(req:any,res,next)=>{
       try {
        const Data = req.body
        const user = req.user
        await this.JournalService.Create(Data,user)
        res.status(201).json({message:"journal created success"})
       } catch (error) {
        next(error)
       }
    }

    Update:RequestHandler = async(req,res,next)=>{
       try {
        const Data = req.body
        const {id} = req.params
        await this.JournalService.Update(id,Data)
        res.status(201).json({message:"journal updated success"})
       } catch (error) {
        next(error)
       }
    }

     FindOne:RequestHandler = async(req,res,next)=>{
       try {
        const {id} = req.params
        const response = await this.JournalService.FindOneById(id)
        res.status(201).json(response)
       } catch (error) {
        next(error)
       }
    }

     FindMany:RequestHandler = async(req:any,res,next)=>{
       try {
         const user = req.user
        const response = await this.JournalService.FindMany(user)
        res.status(201).json(response)
       } catch (error) {
        next(error)
       }
    }
}