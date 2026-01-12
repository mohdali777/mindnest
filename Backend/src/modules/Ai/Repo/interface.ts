import { IBaseRepo } from "../../../core/BaseClass/BaseRepo/interface"
import CHAT_DTO from "../DTO"

export default interface ChatRepoI extends IBaseRepo<CHAT_DTO>{
FindOne(Filter:Partial<CHAT_DTO>):Promise<CHAT_DTO|null>
FindMany(Filter:Partial<CHAT_DTO>):Promise<CHAT_DTO[]|null>
}