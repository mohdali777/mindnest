import dotenv from "dotenv"
dotenv.config()
interface ENV{
    PORT:string,
    MONGO_URI:string
}


const ENV:ENV = {
    PORT:process.env.PORT as string,
    MONGO_URI:process.env.MONGO_URI as string
}


export default ENV
