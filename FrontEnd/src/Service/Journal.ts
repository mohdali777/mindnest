import { AxiosError } from "axios";
import axiosInstance from "../Api/axiosinstance";
import { toast } from "sonner";
export default class JournalService{
 static async Create(Data) {
   try {
    const res = await axiosInstance.post("/journal",Data)
    toast.success("created success")
   } catch (error) {
    console.log(error);
    if(error instanceof AxiosError){
        alert(error.response?.data.message||"failed to create")
    }else{
      alert("failed to create")
    }
   } 
}

 static async Update(id,Data) {
   try {
    const res = await axiosInstance.patch(`/journal/${id}`,Data)
          toast.success("journal updated success")
   } catch (error) {
    console.log(error);
    if(error instanceof AxiosError){
        alert(error.response?.data.message||"failed to create")
    }else{
      alert("failed to create")
    }
   } 
}

 static async GetAll() {
   try {
    const res = await axiosInstance.get("/journal")
    return res.data
   } catch (error) {
    console.log(error);
    if(error instanceof AxiosError){
        alert(error.response?.data.message||"failed to create")
    }else{
      alert("failed to create")
    }
   } 
}

 static async FindOne(id:string) {
   try {
    const res = await axiosInstance.get(`/journal/${id}`)
    return res.data
   } catch (error) {
    console.log(error);
    if(error instanceof AxiosError){
        alert(error.response?.data.message||"failed to create")
    }else{
      alert("failed to create")
    }
   } 
}

}
