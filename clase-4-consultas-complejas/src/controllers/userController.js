import { User } from "../models/userModel.js"
import { userSchemaZod } from "../validators/userValidator.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

process.loadEnvFile()
const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const validatedData = userSchemaZod.parse({ name, email, password })

    const hashedPassword = await bcryptjs.hash(validatedData.password, 10)

    const newUser = new User({ name: validatedData.name, email: validatedData.email, password: hashedPassword })

    await newUser.save()

    res.status(201).json({ message: "Usuario registrado con éxito", userId: newUser._id })
  } catch (error) {
    console.log(error)
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(400).json({ message: "Usuario ya existente. Elige otro email por favor." })
    }
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Datos faltantes, email o contraseña" })
    }

    const validatedData = userSchemaZod.partial().parse({ email, password })

    const user = await User.findOne({ email: validatedData.email })

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const isValidPassword = await bcryptjs.compare(validatedData.password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" })
    }

    const payload = { id: user._id, name: user.name, email: user.email }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

    res.json({ user: { _id: user._id, name: user.name, email }, token })
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    }

    res.status(500).json({ message: "Error interno del servidor0", error })
  }
}

export { registerUser, loginUser }

