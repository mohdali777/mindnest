import { Router } from "express";
const Routes = Router()
import AiRoutes from "../modules/Ai/routes"
import AuthRoute from "../modules/Auth/Routes";
import JournalRoute from "../modules/Journal/routes";
import UserRoutes from "../modules/User/routes";
import { container } from "tsyringe";
import { Middlewares } from "../core/MIddlware/UserMiddleware";

const access = container.resolve(Middlewares)
Routes.use("/auth",AuthRoute)

Routes.use(access.UserCheckMiddleware)

Routes.use("/chat",AiRoutes)
Routes.use("/journal",JournalRoute)
Routes.use("/user",UserRoutes)


export default Routes