import mongoose from "mongoose";
import { JournalDTO } from "./dto";

const JournalSchema = new mongoose.Schema<JournalDTO>({
user_id:{type:String},    
mood:{type:String},
energy:{type:String},
activities:[{type:String}],
title:{type:String},
content: {type:String},
gratitude:{type:String},
highlights:{type:String},
challenges:{type:String},
tomorrow:{type:String}
},{timestamps:true})

const JournalModel = mongoose.model<JournalDTO>("Journal",JournalSchema)

export default JournalModel