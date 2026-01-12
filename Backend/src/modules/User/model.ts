import mongoose from "mongoose";
import { USER_DTO } from "./DTO";


const UserSchema = new mongoose.Schema<USER_DTO>({
user_name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
image:{
    public_id:{type:String,default:""},
    image_url:{type:String,default:""},
},
mood:{type:String}
},{timestamps:true})

const UserModel = mongoose.model<USER_DTO>("user",UserSchema)

export default UserModel