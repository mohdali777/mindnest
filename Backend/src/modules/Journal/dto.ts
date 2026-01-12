export interface JournalDTO{
_id?:string,
user_id:string,
mood:string,
energy:string,
activities: string[],
title:string,
content: string,
gratitude:string,
highlights:string,
challenges:string,
tomorrow:string,
createdAt?:string
}