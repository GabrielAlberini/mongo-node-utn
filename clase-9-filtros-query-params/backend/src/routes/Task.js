import { Router } from "express"
import { addTask, deleteTask, getTasks, updateTask, getTasksWithFilters } from "../controllers/Task.js"

const routerTask = Router()

// /api/tasks
routerTask.get("/", getTasks)
routerTask.get("/search", getTasksWithFilters)
// routerTask.get("/stats", getStatsTasks)S
routerTask.post("/", addTask)
routerTask.patch("/:id", updateTask)
routerTask.delete("/:id", deleteTask)

export { routerTask }