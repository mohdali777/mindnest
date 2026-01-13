import { inject, injectable } from "tsyringe";
import UserServiceI from "./interface";
import UserRepoI from "../Repo/interface";
import { USER_DTO } from "../DTO";
import UserEntity from "../entity";
import AppError from "../../../core/Error/Error";
import { TokenManagement } from "../../../core/Utils/TokenService";
import { BcryptManager } from "../../../core/Utils/Passwordhashing";

@injectable()
export default class UserService implements UserServiceI{
constructor(
@inject("UserRepo") private UserRepo:UserRepoI,
@inject("UserEntity") private UserEntity:UserEntity,
){}

async Create(Data: Partial<USER_DTO>): Promise<USER_DTO> {
try {
const Updated = this.UserEntity.Create(Data)
const IsEmail = await this.UserRepo.FindOne({email:Data.email})
if(IsEmail) throw new AppError("email alredy taken",409)
Updated.password = await BcryptManager.passwordHashing(Updated.password as string)    
const Id =  await this.UserRepo.Create(Updated)
return {
...Updated,
id:Id
}  as USER_DTO  
} catch (error) {
throw error
} 
}

async UpdateMood(user: Partial<USER_DTO>, Data: { mood: string; }): Promise<any> {
    try {
    await this.UserRepo.Update(user._id as string,{mood:Data.mood})
    return Data.mood
    } catch (error) {
     throw error   
    }
}
}