export interface USER_DTO{
    id?:string
    user_name:string,
    email:string,
    password:string,
    image:{
        image_url:string,
        public_id:string
    },
}