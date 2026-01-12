import dotenv from "dotenv"
dotenv.config()
interface ENV{
PORT:string,
MONGO_URI:string
ACCESS_TOKEN_SECRET:string,
REFRESH_TOKEN_SECRET:string,
GEMINI_API_KEY:string
}


const ENV:ENV = {
PORT:process.env.PORT as string,
MONGO_URI:process.env.MONGO_URI as string,
ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET as string,
REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET as string,
GEMINI_API_KEY:process.env.GEMINI_API_KEY as string
}


export default ENV
