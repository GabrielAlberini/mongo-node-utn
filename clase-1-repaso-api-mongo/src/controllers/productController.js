/**
 * Controlador para la gestión de productos.
 * Define las funciones que ejecutan la lógica de negocio para los productos.
 */

import { Product } from "../models/productModel.js";
import { productSchemaZod } from "../validators/productValidator.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    // Validación del cuerpo de la solicitud
    const validatedData = productSchemaZod.parse(req.body);

    // Intento de creación del producto
    const newProduct = new Product(validatedData);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === "ZodError") {
      // Manejo de errores de validación
      res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    } else if (error.message === "El nombre del producto ya existe.") {
      // Error de unicidad del nombre
      res.status(409).json({ message: "El nombre del producto ya existe." });
    } else {
      res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
  }
};

export { getAllProducts, createProduct };
