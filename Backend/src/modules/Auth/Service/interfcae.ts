import { USER_DTO } from "../../User/DTO";
import { LoginPayload, ReturnPayload, SinupPayload } from "../DTO";

export default interface AuthServiceI{
    Login(Payload:LoginPayload):Promise<ReturnPayload>
    Signup(Payload:SinupPayload):Promise<ReturnPayload>
    GenarateAccessToken(RefreshToken:string):Promise<string>
    VerifyUser(RefreshToken:string):Promise<Partial<USER_DTO>>
}