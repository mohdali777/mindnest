import mongoose from "mongoose";
import { IBaseRepo } from "./interface";
import AppError from "../../Error/Error";

export default class BaseRepo<T> implements IBaseRepo<T>{
constructor(private Model:mongoose.Model<T>){}
async Create(Data: Partial<T> | Partial<T[]>): Promise<string|string[]> {
try {
const doc = await this.Model.create(Data as any)
if (Array.isArray(doc)) {
return doc.map(d => d._id.toString());
}
return (doc._id as any).toString();
} catch (error) {
console.log(error,"error while create");
throw new AppError("failed to create",500) 
}
}

async Update(id:string,Data: Partial<T>): Promise<void> {
try {
await this.Model.findByIdAndUpdate(id,Data)
return
} catch (error) {
console.log(error,"error while updating");
throw new AppError("failed to update",500)
}
}
}