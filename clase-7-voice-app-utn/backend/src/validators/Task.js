import z from "zod"

const taskSchemaValidator = z.object({
  text: z.string().min(1),
  done: z.boolean(),
  date: z.string()
})

const updateTaskSchema = z.object({
  done: z.boolean()
})

export { taskSchemaValidator, updateTaskSchema }