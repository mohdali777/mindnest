import { USER_DTO } from "../../User/DTO";
import CHAT_DTO from "../DTO";

export default interface AiServiceI{
    Chat(Data:{message:string},user:Partial<USER_DTO>,section_id:string):Promise<{response:Partial<CHAT_DTO>,section_id:string}>
    FindMany(section_id:string,user:Partial<USER_DTO>):Promise<CHAT_DTO[]|null>
    FindManySection(user:Partial<USER_DTO>):Promise<any>
}