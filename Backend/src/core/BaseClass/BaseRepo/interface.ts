export interface IBaseRepo<T>{
Create(Data:Partial<T>|Partial<T[]>):Promise<string|string[]>
Update(id:string,Data:Partial<T>):Promise<void>
}