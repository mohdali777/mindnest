import  Express  from "express";
import { container } from "tsyringe";
import AI_CONTROLLER from "./controller";

const Routes = Express.Router()
const AI = container.resolve(AI_CONTROLLER)

Routes.post("/",AI.ChatAi)
Routes.get("/",AI.FindMany)

export default Routes