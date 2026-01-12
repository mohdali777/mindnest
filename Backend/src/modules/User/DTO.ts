export interface USER_DTO{
    _id?:string
    user_name:string,
    email:string,
    password:string,
    image:{
        image_url:string,
        public_id:string
    }|null,
    mood:string|null
}