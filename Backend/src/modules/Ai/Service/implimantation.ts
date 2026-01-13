import { inject, injectable } from "tsyringe";
import AiServiceI from "./interface";
import AI from "../../../core/Utils/Gemini";
import ChatRepoI from "../Repo/interface";
import { USER_DTO } from "../../User/DTO";
import CHAT_DTO from "../DTO";
import GenaratorFunctions from "../../../core/Utils/Genarators";
import AppError from "../../../core/Error/Error";

@injectable()
export default class AI_SERVICE  implements AiServiceI{
constructor(
    @inject("AI_SERVICE") private ai:AI,
    @inject("ChatRepo") private ChatRepo:ChatRepoI
){}
async Chat(Data:{message:string},user:Partial<USER_DTO>,section_id:string): Promise<{response:Partial<CHAT_DTO>,section_id:string}> {
try {    
let History:any = []  
console.log(section_id);
  
if(section_id && section_id !== "null" && section_id !== undefined && section_id !== 'undefined'){
    console.log(section_id,'se');
    
const ChatHistory = await this.ChatRepo.FindMany({section_id:section_id,user_id:user._id})
 if (!ChatHistory || ChatHistory.length === 0) {
    throw new AppError("Chat history not found", 404);
  }
History = ChatHistory
}    
if(History.length > 0){
    History = History.map((v:CHAT_DTO)=>({
        role:v.user,
        parts:[{text:v.content}]
    }))
}
const Respose = await this.ai.askGemini(Data.message,user.mood as string,History)
let updated_section_id = section_id &&section_id !== "null" && section_id !== undefined && section_id !== 'undefined' ? section_id : GenaratorFunctions.generateSectionId(user._id as string)
const ChatPayloads:Partial<CHAT_DTO[]> = [,]
await this.ChatRepo.Create({
    section_id:updated_section_id,
    content:Data.message,
    user:"user",
    user_id:user._id as string
})
await this.ChatRepo.Create({
    section_id:updated_section_id,
    content:Respose,
    user:"model",
    user_id:user._id as string
})
return {response:{...{
    section_id:updated_section_id,
    content:Respose,
    user:"model",
    user_id:user._id as string
},createdAt:new Date().toISOString()} as Partial<CHAT_DTO>,section_id:updated_section_id} 
} catch (error) {
throw error
}
} 

async FindMany(section_id: string, user: Partial<USER_DTO>): Promise<CHAT_DTO[]|null> {
try {    
const Filter:Partial<CHAT_DTO> = {user_id:user._id as string}
if(section_id && section_id !== "null" && section_id !== undefined) Filter.section_id = section_id
const Data = await this.ChatRepo.FindMany(Filter)
console.log(Data);

 if (!Data || Data.length === 0) {
    throw new AppError("Chat history not found", 404);
  }
return Data   
} catch (error) {
throw error
}
}

async FindManySection(user: Partial<USER_DTO>): Promise<any> {
    try {
       const Data = await this.ChatRepo.FindMany({user_id:user._id})
       if(!Data) return Data
    } catch (error) {
        throw error
    }
}
}