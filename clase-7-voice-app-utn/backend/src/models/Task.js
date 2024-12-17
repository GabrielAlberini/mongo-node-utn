import { model, Schema } from "mongoose"

const tasksSchema = Schema({
  text: { type: String, required: true },
  done: { type: Boolean, required: true },
  date: { type: String, required: true }
}, { versionKey: false })

const Task = model("Task", tasksSchema)

export { Task }