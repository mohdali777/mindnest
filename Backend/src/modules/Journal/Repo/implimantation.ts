import { injectable } from "tsyringe";
import BaseRepo from "../../../core/BaseClass/BaseRepo/implimnatation";
import { JournalDTO } from "../dto";
import JournalModel from "../model";
import JournalRepoI from "./interface";

@injectable()
export default class JouranalRepo extends BaseRepo<JournalDTO> implements JournalRepoI{
    constructor(){
        super(JournalModel)
    }
 async FindOne(Filter: Partial<JournalDTO>): Promise<JournalDTO | null> {
  try {
    const Data = await JournalModel.findOne(Filter).lean()
    if (!Data) return null

    return {
      _id: Data._id.toString(),
      user_id:Data.user_id,
      mood: Data.mood,
      energy: Data.energy,
      activities: Data.activities,
      title: Data.title,
      content: Data.content,
      gratitude: Data.gratitude,
      highlights: Data.highlights,
      challenges: Data.challenges,
      tomorrow: Data.tomorrow,
      createdAt:Data.createdAt
    }
  } catch (error) {
    throw error
  }
}

async FindMany(Filter: Partial<JournalDTO>): Promise<JournalDTO[]> {
  try {
    const Data = await JournalModel.find(Filter).lean()

    return Data.map((item) => ({
      _id: item._id.toString(),
      user_id:item.user_id,
      mood: item.mood,
      energy: item.energy,
      activities: item.activities,
      title: item.title,
      content: item.content,
      gratitude: item.gratitude,
      highlights: item.highlights,
      challenges: item.challenges,
      tomorrow: item.tomorrow,
      createdAt:item.createdAt
    }))
  } catch (error) {
    throw error
  }
}

}