import "reflect-metadata"
import "./core/Config/container"

import setupApp from "./core/app"
import connectDB from "./core/DB/connection"
import ENV from "./core/Config/env"


async function StartApp() {
 try {
    await connectDB() 
    const app = setupApp()
    app.listen(ENV.PORT,()=>{
        console.log("App Start Success");
    })   
 } catch (error) {
    console.error("failed to start server")
    process.exit(1)
 }   
}

StartApp()