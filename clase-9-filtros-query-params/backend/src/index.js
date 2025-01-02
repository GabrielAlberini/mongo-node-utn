import express from "express"
import { connectDB } from "./config/mongoConnection.js"
import { routerTask } from "./routes/Task.js"
import cors from "cors"

process.loadEnvFile()

const PORT = process.env.PORT ?? 2303
const URI_DB = process.env.URI_DB

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Router
app.use("/api/tasks", routerTask)

app.use("*", (req, res) => {
  res.status(404).json({ error: "resource not found" })
})

app.listen(PORT, () => {
  console.log("Server http en escucha por el puerto http://127.0.0.1:" + PORT)
  connectDB(URI_DB)
}) 