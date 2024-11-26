import { z } from "zod";

const userSchemaZod = z.object({
  name: z.string({ message: "El nombre debe ser un string" }).trim().min(1, { message: "El nombre es obligatorio" }),
  email: z.string({ message: "El email debe ser un string" }).trim().email({ message: "El correo electrónico debe ser valido" }),
  password: z.string({ message: "La contraseña debe ser un string" }).trim().min(8, { message: "La contraseña debe tener un largo de 8 caracteres como mínimo." })
})

export { userSchemaZod };