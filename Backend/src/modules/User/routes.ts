import { Router } from "express";
import UserController from "./controller";
import { container } from "tsyringe";

const UserRoutes = Router()
const User = container.resolve(UserController)

UserRoutes.patch("/mood",User.UpdateMood)

export default UserRoutes

