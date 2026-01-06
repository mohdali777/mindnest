import AppError from "../../Error/Error";

export class BaseEntity{
protected _Image_Validation(Image: { Image_Url: string; Public_Id: string },Feildname:string) {
if (!Image || typeof Image !== "object" ) {
throw new Error(`${Feildname} Is Missing`);
}
this._CheckRequiredString(Image.Image_Url,Feildname)
this._CheckRequiredString(Image.Public_Id,Feildname)
}
protected _CheckRequiredString(feild:any,feildname:string){    
if(!feild || typeof feild !== "string" || !feild.trim()) throw new AppError(`${feildname} is not valid`,400)
}

protected _CheckRequiredNumber(feild:any,feildname:string){
if(!feild || typeof feild !== "number" || feild < 1) throw new AppError(`${feildname} is not valid`,400)
}  


protected  _Datevalidation(DateString:string,feildname:string){
if (!DateString|| typeof DateString !== "string" || isNaN(Date.parse(DateString))) {
throw new AppError(`${feildname} is missing, empty, or invalid date`,400);
}
}

protected _CheckTwoDates(Start: string, end: string, Message?: string) {
const StartDate = new Date(Start);
const EndDate = new Date(end);
const Today = new Date();

Today.setHours(0, 0, 0, 0);

if (StartDate < Today) {
throw new AppError(Message || "Start date cannot be in the past",400);
}

if (EndDate < StartDate) {
throw new AppError(Message || "End date cannot be earlier than start date",400);
}
}


protected _CheckArray(Type:any[],Feildname:string){
if(!Type ||!Array(Type) || Type.length < 1 ) throw new AppError(`${Feildname} not valid`,400)
}

protected _CheckBoolean(Type:any,Feildname:string){
if(Type == undefined || typeof Type !== "boolean" ) throw new AppError(`${Feildname} not valid`,400)
}

protected _EmailValidation(Email: any) {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regex.test(Email)) {
throw new AppError("Invalid email format",400);
}
}

protected _Phone_Validation(Phone: string) {
const regex = /^[0-9]{10}$/;
if (!regex.test(Phone)) {
throw new AppError("Invalid phone number format",400);
}
}
}