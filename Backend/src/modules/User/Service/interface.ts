import { USER_DTO } from "../DTO";

export default interface UserServiceI{
    Create(Data:Partial<USER_DTO>):Promise<USER_DTO>
    UpdateMood(user:Partial<USER_DTO>,Data:{mood:string}):Promise<any>
}