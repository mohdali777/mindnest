import { inject, injectable } from "tsyringe";
import AuthServiceI from "./interfcae";
import UserRepoI from "../../User/Repo/interface";
import { LoginPayload, SinupPayload } from "../DTO";
import AppError from "../../../core/Error/Error";
import { BcryptManager } from "../../../core/Utils/Passwordhashing";

@injectable()
export default class AuthService implements AuthServiceI{
    constructor(@inject("UserRepo") private UserRepo:UserRepoI){}

    async Login(Payload: LoginPayload): Promise<void> {
       try {
        const Data = await this.UserRepo.FindOne({email:Payload.email})
        if(!Data) throw new AppError("User Data Not Found",404)
        const IsValidPass = await BcryptManager.dcrypt(Payload.password,Data.password)
        if(!IsValidPass) throw new AppError("Invalid Credentials",400)
                
       } catch (error) {
        throw error
       } 
    }

    Signup(Payload: SinupPayload): Promise<void> {
        
    }

}