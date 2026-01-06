import { LoginPayload, SinupPayload } from "../DTO";

export default interface AuthServiceI{
    Login(Payload:LoginPayload):Promise<void>
    Signup(Payload:SinupPayload):Promise<void>
}