import jwt from "jsonwebtoken"

process.loadEnvFile()

const JWT_SECRET = process.env.JWT_SECRET

const authValidator = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Recurso privado, añade el token" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded

    next()
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado", error });
  }
}

export { authValidator }