/**
 * Rutas para la gestión de productos.
 * Todas las rutas empiezan con /api/products.
 */

import { Router } from "express"
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsWithQueryParams, getStatsProducts } from "../controllers/productController.js";
// import { authValidator } from "../middlewares/authValidator.js"

const productRouter = Router()

// productRouter.use(authValidator)

productRouter.get("/", getAllProducts)

// http://localhost:2001/api/products?minStock=10&maxStock=30
productRouter.get("/search", getProductsWithQueryParams)

productRouter.get("/stats", getStatsProducts)

productRouter.post("/", createProduct)

productRouter.get("/:id", getProductById)

productRouter.patch("/:id", updateProduct)

productRouter.delete("/:id", deleteProduct)

export { productRouter }
