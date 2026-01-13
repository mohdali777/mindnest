import cors from "cors";
import Express from "express";
import cookieparser from "cookie-parser";
import ErrorHandler from "./MIddlware/ErrorHandler";
import AppRoutes from "../routes/index";
const app = Express();

export default function setupApp() {
    console.log("asdas");
    
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true, 
}));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieparser())

app.use("/",AppRoutes)

app.use(ErrorHandler)
return app;
}


