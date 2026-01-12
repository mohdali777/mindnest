import { injectable } from "tsyringe";
import { BaseEntity } from "../../core/BaseClass/BaseEntity/BaseEntity";
import { JournalDTO } from "./dto";

@injectable()
export default class JournalEntity extends BaseEntity {

  Create(Data: Partial<JournalDTO>): Partial<JournalDTO> {

    this._CheckRequiredString(Data.mood, "mood field");
    this._CheckRequiredString(Data.energy, "energy field");

    this._CheckArray(Data.activities as string[], "activities field");
    for(let v of Data.activities as string[]){
        this._CheckRequiredString(v,"activites")
    }
    this._CheckRequiredString(Data.title, "title field");
    this._CheckRequiredString(Data.content, "content field");

      this._CheckRequiredString(Data.gratitude, "gratitude field");

      this._CheckRequiredString(Data.highlights, "highlights field");

      this._CheckRequiredString(Data.challenges, "challenges field");

      this._CheckRequiredString(Data.tomorrow, "tomorrow goals field");

    return this.GetData(Data);
  }

Update(Data: Partial<JournalDTO>): Partial<JournalDTO> {
  const Updated: Partial<JournalDTO> = {};

  if (Data.mood !== undefined) {
    this._CheckRequiredString(Data.mood, "mood field");
    Updated.mood = Data.mood;
  }

  if (Data.energy !== undefined) {
    this._CheckRequiredString(Data.energy, "energy field");
    Updated.energy = Data.energy;
  }

  if (Data.activities !== undefined) {
    this._CheckArray(Data.activities, "activities field");

    for (const v of Data.activities) {
      this._CheckRequiredString(v, "activities value");
    }

    Updated.activities = Data.activities;
  }

  if (Data.title !== undefined) {
    this._CheckRequiredString(Data.title, "title field");
    Updated.title = Data.title;
  }

  if (Data.content !== undefined) {
    this._CheckRequiredString(Data.content, "content field");
    Updated.content = Data.content;
  }

  if (Data.gratitude !== undefined) {
    this._CheckRequiredString(Data.gratitude, "gratitude field");
    Updated.gratitude = Data.gratitude;
  }

  if (Data.highlights !== undefined) {
    this._CheckRequiredString(Data.highlights, "highlights field");
    Updated.highlights = Data.highlights;
  }

  if (Data.challenges !== undefined) {
    this._CheckRequiredString(Data.challenges, "challenges field");
    Updated.challenges = Data.challenges;
  }

  if (Data.tomorrow !== undefined) {
    this._CheckRequiredString(Data.tomorrow, "tomorrow goals field");
    Updated.tomorrow = Data.tomorrow;
  }

  return Updated;
}


  private GetData(Data: Partial<JournalDTO>): Partial<JournalDTO> {
    return {
      mood: Data.mood,
      energy: Data.energy,
      activities: Data.activities,
      title: Data.title,
      content: Data.content,
      gratitude: Data.gratitude,
      highlights: Data.highlights,
      challenges: Data.challenges,
      tomorrow: Data.tomorrow,
    };
  }
}
