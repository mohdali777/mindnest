import { inject, injectable } from "tsyringe";
import UserRepoI from "../../modules/User/Repo/interface";
import { TokenManagement } from "../Utils/TokenService";
import { RequestHandler } from "express";
import { USER_DTO } from "../../modules/User/DTO";

@injectable()
export class Middlewares {
  constructor(
    @inject("UserRepo") private UserRepo:UserRepoI,
    @inject("TokenManager") private Token:TokenManagement
  ) {
  }

  UserCheckMiddleware:RequestHandler = async (req:any, res, next) => {
    const accessToken = req.cookies.AccessToken;
    const refreshToken = req.cookies.RefreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        CODE: "REFRESH_MISSING",
        message: "Refresh token missing",
      });
    }

    let refreshPayload = null;
    try {
      refreshPayload = this.Token.verifyRefreshToken(refreshToken) as Partial<USER_DTO>;      
    } catch (err) {
      return res.status(401).json({
        CODE: "REFRESH_INVALID",
        message: "Invalid refresh token",
      });
    }
    
    const UserData = await this.UserRepo.FindOne({ _id: refreshPayload._id });

    if (!UserData) {
      return res.status(401).json({
        CODE: "USER_INVALID",
        message: "User not valid",
      });
    }

    if (!accessToken) {
      return res.status(401).json({
        CODE: "ACCESS_MISSING",
        message: "Access token missing",
      });
    }

    try {
      const accessPayload = this.Token.verifyAccessToken(accessToken);
    } catch (err) {
      return res.status(401).json({
        CODE: "ACCESS_INVALID",
        message: "Invalid access token",
      });
    }
    req.user = UserData
    next();
  };
}
