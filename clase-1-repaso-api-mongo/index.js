import express from "express"
import { productRouter } from "./src/routes/productRouter.js"
import { connectDB } from "./src/config/mongo.js"
process.loadEnvFile()

const PORT = process.env.PORT
const URI_DB_MONGO = process.env.URI_DB_MONGO

const app = express()

app.use(express.json())

// /api/products
app.use("/api/products", productRouter)

app.use("*", (req, res) => {
  res.json({ error: "resource not found" })
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
  connectDB(URI_DB_MONGO)
})
