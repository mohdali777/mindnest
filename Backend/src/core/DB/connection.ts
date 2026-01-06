import mongoose from "mongoose";
import ENV from "../Config/env";
export default async function connectDB(){
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection error:", error);
        throw error;
    } 
}