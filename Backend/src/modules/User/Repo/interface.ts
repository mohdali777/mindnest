import BaseRepo from "../../../core/BaseClass/BaseRepo/implimnatation";
import { USER_DTO } from "../DTO";

export default interface UserRepoI extends BaseRepo<USER_DTO>{
FindOne(Filter:Partial<USER_DTO>):Promise<USER_DTO|null>
FindMany(Filter:Partial<USER_DTO>):Promise<USER_DTO[]|null>
}