import mongoose from "mongoose";
import CHAT_DTO from "./DTO";

const ChatSchema = new mongoose.Schema<CHAT_DTO>({
section_id:{type:String},
content:{type:String},
user:{type:String},
user_id:{type:String}
},{timestamps:true})

const ChatModel = mongoose.model<CHAT_DTO>("chat",ChatSchema)
export default ChatModel