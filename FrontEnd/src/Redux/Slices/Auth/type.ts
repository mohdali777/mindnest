export default interface AuthInitialStateI{
_id:string|null
user_name:string|null,
email:string|null,
image:{
image_url:string,
public_id:string
}|null,
mood:string|null,
is_verify:boolean|null
}