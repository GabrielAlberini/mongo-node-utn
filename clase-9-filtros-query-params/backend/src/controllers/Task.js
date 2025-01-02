import { Task } from "../models/Task.js"
import { taskSchemaValidator, updateTaskSchema } from "../validators/Task.js"

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ date: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: "Error to fetching data" })
    console.error({ error })
  }
}

const getTasksWithFilters = async (req, res) => {
  try {
    const { done, priority } = req.query;
    const filter = {};

    if (done) {
      filter.done = done === "realizadas" ? true : false
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter)
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error applying filters" });
  }
};

// AGREGAR METODO DE AGREGACIÓN PARA BALANCE DE TAREAS.

const addTask = async (req, res) => {
  try {
    const { text, done = false, priority, date } = req.body

    const validator = taskSchemaValidator.safeParse({ text, done, priority, date })

    if (!validator.success) {
      return res.status(400).json({ error: "bad request" })
    }

    const newTask = new Task({ text, done, priority, date })
    await newTask.save()
    await getTasksWithFilters()
    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "error to save task" })
  }
}

const updateTask = async (req, res) => {
  try {

    const validator = updateTaskSchema.safeParse(req.body)

    if (!validator.success) {
      return res.status(400).json({ error: "bad request" })
    }

    const id = req.params.id
    const { done } = req.body

    const updatedTask = await Task.findByIdAndUpdate(id, { done }, { new: true })

    if (!updatedTask) {
      return res.status(400).json({ error: "error to update task" })
    }

    res.json(updatedTask)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "error to update task" })
  }
}

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id
    const deletedTask = await Task.findOneAndDelete({ _id: id })

    if (!deleteTask) {
      return res.status(400).json({ error: "error to delete task" })
    }

    res.json(deletedTask)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "error to delete task" })
  }
}

export { getTasks, addTask, updateTask, deleteTask, getTasksWithFilters }