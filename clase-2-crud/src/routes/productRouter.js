/**
 * Rutas para la gestión de productos.
 * Todas las rutas empiezan con /api/products.
 */

import { Router } from "express"
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const productRouter = Router()

productRouter.get("/", getAllProducts)

productRouter.post("/", createProduct)

productRouter.get("/:id", getProductById)

productRouter.patch("/:id", updateProduct)

productRouter.delete("/:id", deleteProduct)

export { productRouter }
