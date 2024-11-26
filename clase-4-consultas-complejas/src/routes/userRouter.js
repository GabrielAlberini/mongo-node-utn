import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js"

const userRouter = Router()

// /api/users

// Login
userRouter.post("/login", loginUser)

// Register
userRouter.post("/register", registerUser)

// Logout

// Actualizar usuario
// Borrar usuario

export { userRouter }