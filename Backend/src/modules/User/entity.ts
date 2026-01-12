import { injectable } from "tsyringe";
import { BaseEntity } from "../../core/BaseClass/BaseEntity/BaseEntity";
import { USER_DTO } from "./DTO";

@injectable()
export default class UserEntity extends BaseEntity{
Create(Data:Partial<USER_DTO>):Partial<USER_DTO>{
this._CheckRequiredString(Data.user_name,"user name")
this._CheckRequiredString(Data.password,"password")
this._EmailValidation(Data.email) 
return this.GetData(Data)
}


private GetData(Data:Partial<USER_DTO>):Partial<USER_DTO>{
return{
user_name:Data.user_name,
email:Data.email,
password:Data.password,
image:{
public_id:"",
image_url:""
},
mood:null 
}
}
}