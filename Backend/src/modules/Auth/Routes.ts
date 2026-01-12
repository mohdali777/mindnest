import { Router } from "express";
import { container } from "tsyringe";
import AuthController from "./controller";

const Auth = container.resolve(AuthController)
const AuthRoute = Router()

AuthRoute.post("/login",Auth.Login)
AuthRoute.post("/signup",Auth.Signup)
AuthRoute.get("/generate/access",Auth.GenarateAccess)
AuthRoute.get("/verifyuser",Auth.VerifyUser)
AuthRoute.post("/logout",Auth.Logout)



export default AuthRoute