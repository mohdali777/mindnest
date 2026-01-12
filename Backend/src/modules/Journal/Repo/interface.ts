import { IBaseRepo } from "../../../core/BaseClass/BaseRepo/interface";
import { JournalDTO } from "../dto";

export default interface JournalRepoI extends IBaseRepo<JournalDTO>{
FindOne(Filter:Partial<JournalDTO>):Promise<JournalDTO|null>
FindMany(Filter:Partial<JournalDTO>):Promise<JournalDTO[]|null>
}