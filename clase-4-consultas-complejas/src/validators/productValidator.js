/**
 * Esquema de validación para la creación de productos.
 * Valida el cuerpo de la solicitud con Zod.
 */

import { z } from "zod";

const productSchemaZod = z.object({
  name: z.string({ message: "El nombre debe ser un string" }).trim().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().trim().optional().default("Sin descripción"), // Default value adjusted to match the Mongo model
  price: z.number().min(0, { message: "El precio debe ser mayor o igual a 0" }),
  stock: z.number().min(0, { message: "El stock debe ser mayor o igual a 0" }).default(0), // Changed from boolean to number with default 0
});

export { productSchemaZod };