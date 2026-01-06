import AppError from "../Error/Error";
import { NextFunction, Request,Response} from "express";

export default function ErrorHandler(err:AppError,req:Request,res:Response,next:NextFunction){
  console.log(err);
  if(!err.isOperational){
    return res.status(500).json({message:"internal server error",success:false})
  }
  return res.status(err.statusCode).json({message:err.message,success:false})
}