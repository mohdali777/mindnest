import { inject, injectable } from "tsyringe";
import { JournalDTO } from "../dto";
import JournalServiceI from "./interface";
import JournalRepoI from "../Repo/interface";
import JournalEntity from "../entity";
import AppError from "../../../core/Error/Error";
import { USER_DTO } from "../../User/DTO";

@injectable()
export default class JournalService implements JournalServiceI{
    constructor(
        @inject("JournalRepo") private JournalRepo:JournalRepoI,
        @inject("JournalEntity") private JournalEntity:JournalEntity
    ){}
   async Create(Data: Partial<JournalDTO>,user:Partial<USER_DTO>): Promise<void> {
        try {
            const Updated = this.JournalEntity.Create(Data)
            await this.JournalRepo.Create({...Updated,user_id:user._id})
            return
        } catch (error) {
            throw error
        }
    }
   async Update(id:string,Data: Partial<JournalDTO>): Promise<any> {
        try {
            console.log(Data);
            
         const existing = await this.JournalRepo.FindOne({_id:id})    
         if(!existing) throw new AppError("no data found",404)
         const Updated = this.JournalEntity.Update(Data)
         await this.JournalRepo.Update(id,Updated)   
        } catch (error) {
            throw error
        }
    }
    async FindOneById(id: string): Promise<JournalDTO | null> {
       try {
        if(!id) throw new AppError("id not found",404)
        const Data = await this.JournalRepo.FindOne({_id:id})
        return Data
       } catch (error) {
        throw error
       }
    }
   async FindMany(user:Partial<USER_DTO>): Promise<JournalDTO[] | null> {
         try {
        const Data = await this.JournalRepo.FindMany({user_id:user._id})
        return Data
       } catch (error) {
        throw error
       }
    }

}