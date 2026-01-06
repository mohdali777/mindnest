import { inject } from "tsyringe";
import BaseRepo from "../../../core/BaseClass/BaseRepo/implimnatation";
import { USER_DTO } from "../DTO";
import UserRepoI from "./interface";
import { Model } from "mongoose";
import AppError from "../../../core/Error/Error";

export default class UserRepo extends BaseRepo<USER_DTO> implements UserRepoI{
    constructor(@inject("UserModel") private UserModel:Model<USER_DTO> ){
        super(UserModel)
    }

    async FindOne(Filter: Partial<USER_DTO>): Promise<USER_DTO | null> {
      try {
        const Data = await this.UserModel.findOne(Filter).lean()
        if(!Data) return null
        return{
            id:Data._id.toString(),
            user_name:Data.user_name,
            image:Data.image,
            email:Data.email,
            password:Data.password
        }
      } catch (error) {
        throw new AppError("failed to fetch data",500)
      }  
    }

    async FindMany(Filter: Partial<USER_DTO>): Promise<USER_DTO[] | null> {
        try {
       const Doc = await this.UserModel.find(Filter).lean()
        if(!Doc) return null
        return Doc.map((Data)=>({
            id:Data._id.toString(),
            user_name:Data.user_name,
            image:Data.image,
            email:Data.email,
            password:Data.password
        }
        ))
        } catch (error) {
            throw new AppError("failed to fetch data",500)
        }
    }
}