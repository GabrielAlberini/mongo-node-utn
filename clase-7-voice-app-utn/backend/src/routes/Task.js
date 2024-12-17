import { Router } from "express"
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/Task.js"

const routerTask = Router()

// /api/tasks
routerTask.get("/", getTasks)
routerTask.post("/", addTask)
routerTask.patch("/:id", updateTask)
routerTask.delete("/:id", deleteTask)

export { routerTask }