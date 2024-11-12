/**
 * Rutas para la gestión de productos.
 * Todas las rutas empiezan con /api/products.
 */

import { Router } from "express";
import { getAllProducts, createProduct } from "../controllers/productController.js";

const productRouter = Router();

// GET /api/products - Obtiene todos los productos
productRouter.get("/", getAllProducts);

// POST /api/products - Crea un nuevo producto
productRouter.post("/", createProduct);

export { productRouter };
