import jwt from "jsonwebtoken"
import ENV from "../Config/env"
import { USER_DTO } from "../../modules/User/DTO"
import { injectable } from "tsyringe"

@injectable()
export class TokenManagement {
private Access_Secret_key: string
private Refresh_Secret_key: string
constructor() {
this.Access_Secret_key = ENV.ACCESS_TOKEN_SECRET
this.Refresh_Secret_key = ENV.REFRESH_TOKEN_SECRET
}

generateAccessToken(payload: Partial<USER_DTO>): string {
return jwt.sign(payload, this.Access_Secret_key, { expiresIn: "15m" })
}

generateRefreshToken(payload: Partial<USER_DTO>): string {
return jwt.sign(payload, this.Refresh_Secret_key, { expiresIn: "7d" })
}

verifyAccessToken(token: string): any {
return jwt.verify(token, this.Access_Secret_key)
}

verifyRefreshToken(token: string): any {
return jwt.verify(token, this.Refresh_Secret_key)
}

}