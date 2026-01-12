import { USER_DTO } from "../../User/DTO";
import { JournalDTO } from "../dto";

export default interface JournalServiceI{
Create(Data:Partial<JournalDTO>,user:Partial<USER_DTO>):Promise<void>
Update(id:string,Data:Partial<JournalDTO>):Promise<void>
FindOneById(id:string):Promise<JournalDTO|null>
FindMany(user:Partial<USER_DTO>):Promise<JournalDTO[]|null>
}