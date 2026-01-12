import { USER_DTO } from "../User/DTO"

export interface LoginPayload{
email:string,
password:string
}

export interface SinupPayload{
email:string,
username:string,
password:string,    
}


export interface ReturnPayload{
AccessToken:string,
RefreshToken:string,
UserPayload:Partial<USER_DTO>
}


