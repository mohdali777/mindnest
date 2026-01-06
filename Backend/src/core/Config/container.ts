import { container } from "tsyringe";
import { USER_DTO } from "../../modules/User/DTO";
import UserModel from "../../modules/User/model";
import { Model } from "mongoose";

container.register<Model<USER_DTO>>("UserModel",{useValue:UserModel})

export default container