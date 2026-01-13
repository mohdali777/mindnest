import BaseRepo from "../../../core/BaseClass/BaseRepo/implimnatation";
import CHAT_DTO from "../DTO";
import ChatRepoI from "./interface";
import ChatModel from "../model";
import { injectable } from "tsyringe";

@injectable()
export default class ChatRepo
  extends BaseRepo<CHAT_DTO>
  implements ChatRepoI {

  constructor() {
    super(ChatModel);
  }

  async FindOne(Filter: Partial<CHAT_DTO>): Promise<CHAT_DTO | null> {
    try {
      const data = await ChatModel.findOne(Filter).lean();
      if (!data) return null;

      return {
        _id: data._id.toString(),
        section_id: data.section_id,
        content: data.content,
        user: data.user,
        user_id: data.user_id,
        createdAt: data.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }

  async FindMany(Filter: Partial<CHAT_DTO>): Promise<CHAT_DTO[]> {
    try {
      const data = await ChatModel.find(Filter).sort({createdAt:1}).lean();
      return data.map((item) => ({
        _id: item._id.toString(),
        section_id: item.section_id,
        content: item.content,
        user: item.user,
        user_id: item.user_id,
        createdAt: item.createdAt,
      }));
    } catch (error) {
      throw error;
    }
  }
}
