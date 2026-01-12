import { container } from "tsyringe";
import { USER_DTO } from "../../modules/User/DTO";
import UserModel from "../../modules/User/model";
import { Model } from "mongoose";
import UserRepoI from "../../modules/User/Repo/interface";
import UserRepo from "../../modules/User/Repo/implimantation";
import { TokenManagement } from "../Utils/TokenService";
import UserEntity from "../../modules/User/entity";
import UserServiceI from "../../modules/User/Service/interface";
import UserService from "../../modules/User/Service/implimantation";
import AI from "../Utils/Gemini";
import AiServiceI from "../../modules/Ai/Service/interface";
import AI_SERVICE from "../../modules/Ai/Service/implimantation";
import AuthServiceI from "../../modules/Auth/Service/interfcae";
import AuthService from "../../modules/Auth/Service/implimantation";
import JournalServiceI from "../../modules/Journal/Service.ts/interface";
import JournalService from "../../modules/Journal/Service.ts/implimantation";
import JournalRepoI from "../../modules/Journal/Repo/interface";
import JouranalRepo from "../../modules/Journal/Repo/implimantation";
import JournalEntity from "../../modules/Journal/entity";
import { Middlewares } from "../MIddlware/UserMiddleware";
import ChatRepoI from "../../modules/Ai/Repo/interface";
import ChatRepo from "../../modules/Ai/Repo/implimantation";


//User
container.registerSingleton<UserRepoI>("UserRepo",UserRepo)
container.register<Model<USER_DTO>>("UserModel",{useValue:UserModel})
container.registerSingleton("UserEntity",UserEntity)
container.registerSingleton<UserServiceI>("UserService",UserService)

//Ai

container.registerSingleton<AiServiceI>("AiService",AI_SERVICE)
container.registerSingleton<ChatRepoI>("ChatRepo",ChatRepo)

//Auth

container.registerSingleton<AuthServiceI>("AuthService",AuthService)

//Journal

container.registerSingleton<JournalServiceI>("JournalService",JournalService)
container.registerSingleton<JournalRepoI>("JournalRepo",JouranalRepo)
container.registerSingleton("JournalEntity",JournalEntity)


//Utils

container.registerSingleton("TokenManager",TokenManagement)
container.registerSingleton("AI_SERVICE",AI)


export default container