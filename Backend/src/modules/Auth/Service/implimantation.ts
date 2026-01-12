import { inject, injectable } from "tsyringe";
import AuthServiceI from "./interfcae";
import UserRepoI from "../../User/Repo/interface";
import { LoginPayload, ReturnPayload, SinupPayload } from "../DTO";
import AppError from "../../../core/Error/Error";
import { BcryptManager } from "../../../core/Utils/Passwordhashing";
import { TokenManagement } from "../../../core/Utils/TokenService";
import { USER_DTO } from "../../User/DTO";
import UserServiceI from "../../User/Service/interface";

@injectable()
export default class AuthService implements AuthServiceI{
constructor(
@inject("UserRepo") private UserRepo:UserRepoI,
@inject("TokenManager") private TokenManager:TokenManagement,
@inject("UserService") private UserService:UserServiceI){}

async Login(Payload: LoginPayload): Promise<ReturnPayload> {
try {
const Data = await this.UserRepo.FindOne({email:Payload.email})
if(!Data) throw new AppError("User Data Not Found",404)
const IsValidPass = await BcryptManager.dcrypt(Payload.password,Data.password)
if(!IsValidPass) throw new AppError("Invalid Credentials",400)
const TokenPayload:Partial<USER_DTO> = { 
_id:Data._id,
email:Data.email,
image:Data.image,
user_name:Data.user_name
}    
const AccessToken = this.TokenManager.generateAccessToken(TokenPayload)
const RefreshToken = this.TokenManager.generateRefreshToken(TokenPayload)
return {AccessToken,RefreshToken,UserPayload:{...TokenPayload,mood:Data.mood}}
} catch (error) {
throw error
} 
}

async Signup(Payload: SinupPayload): Promise<ReturnPayload> {
try {
const UserPayload = await this.UserService.Create(Payload)
const TokenPayload:Partial<USER_DTO> = { 
_id:UserPayload._id,
email:UserPayload.email,
image:UserPayload.image,
user_name:UserPayload.user_name
} 
const AccessToken = this.TokenManager.generateAccessToken(TokenPayload)
const RefreshToken = this.TokenManager.generateRefreshToken(TokenPayload)
return {AccessToken,RefreshToken,UserPayload:{...TokenPayload,mood:null}}
} catch (error) {
throw error
} 
}

async GenarateAccessToken(RefreshToken: string): Promise<string> {
try {
    console.log(RefreshToken);
    
const Data = this.TokenManager.verifyRefreshToken(RefreshToken)
const TokenPayload:Partial<USER_DTO> = { 
_id:Data._id,
email:Data.email,
image:Data.image,
user_name:Data.user_name
}
const AccessToken = this.TokenManager.generateAccessToken(TokenPayload)
return AccessToken
} catch (error) {
throw error
}  
}

async VerifyUser(RefreshToken: string): Promise<Partial<USER_DTO>> {
try {
const Payload = this.TokenManager.verifyRefreshToken(RefreshToken)
console.log(Payload);

const UserData = await this.UserRepo.FindOne({_id:Payload._id})
console.log(UserData);

if(!UserData) throw new AppError("User Not valid",404)
const {password,...Data} = UserData    
return Data 
} catch (error) {
throw error
}
}

}