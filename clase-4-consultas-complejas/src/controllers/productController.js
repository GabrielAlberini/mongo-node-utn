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

const getProductsWithQueryParams = async (req, res) => {
  try {
    const { minPrice, maxPrice, minStock, maxStock, order = "asc" } = req.query

    const query = {}

    // Filtro de precio
    if (minPrice) query.price = { ...query.price, $gte: +minPrice }
    if (maxPrice) query.price = { ...query.price, $lte: +maxPrice }

    // Filtro de stock
    if (minStock) query.stock = { ...query.stock, $gte: +minStock }
    if (maxStock) query.stock = { ...query.stock, $lte: +maxStock }


    const sortValue = order === "asc" ? { price: 1 } : { price: -1 }

    const products = await Product.find(query).sort(sortValue)

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
}

const getStatsProducts = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" },
          totalStock: { $sum: "$stock" },
          productCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ])

    res.json(stats[0])
  } catch (error) {
    res.status(500).json({ message: "Error al calcular estadísticas", error: error.message });
  }
}

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
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      // Error de unicidad del nombre
      return res.status(409).json({ message: "El nombre del producto ya existe." });
    } else {
      return res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ error: "No se encuentra el producto" })
    }

    res.json(product)
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).json({ error: "El formato del id es incorrecto" })
    }
    res.status(500).json({ message: "Error interno del servidor", error: error.message })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  try {
    const validatedData = productSchemaZod.partial().parse(req.body)
    const updatedProduct = await Product.findByIdAndUpdate(id, validatedData, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({ error: "No se encuentra el producto" })
    }

    res.json(updatedProduct)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    } else if (error.name === "CastError") {
      return res.status(500).json({ error: "El formato del id es incorrecto" })
    } else {
      return res.status(500).json({ message: "Error al modificar el producto", error: error.message });
    }
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({ error: "No se encuentra el producto" })
    }

    res.json({ message: `Producto ID: ${deletedProduct._id} borrado con éxito` })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).json({ error: "El formato del id es incorrecto" })
    } else {
      return res.status(500).json({ message: "Error al borrar el producto", error: error.message });
    }
  }
}

export { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsWithQueryParams, getStatsProducts };
