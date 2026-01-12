import { USER_DTO } from "../DTO";

export default interface UserServiceI{
    Create(Data:Partial<USER_DTO>):Promise<USER_DTO>
}