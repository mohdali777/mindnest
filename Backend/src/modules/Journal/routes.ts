import { Router } from "express";
import { container } from "tsyringe";
import JournalController from "./controller";
const Journal = container.resolve(JournalController)
const JournalRoute = Router()

JournalRoute.post("/",Journal.Create)
JournalRoute.patch("/:id",Journal.Update)
JournalRoute.get("/",Journal.FindMany)
JournalRoute.get("/:id",Journal.FindOne)

export default JournalRoute