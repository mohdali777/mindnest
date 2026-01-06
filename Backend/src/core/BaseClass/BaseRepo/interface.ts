export interface IBaseRepo<T>{
Create(Data:T):Promise<string>
Update(id:string,Data:Partial<T>):Promise<void>
}