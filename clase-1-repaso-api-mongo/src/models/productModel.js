/**
 * Modelo de Producto para MongoDB usando Mongoose.
 * Define la estructura y las validaciones para el documento Producto.
 */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    default: "Sin descripción"
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    require: true,
    default: 0,
    min: 0,
  },
}, {
  versionKey: false,
  strict: true
});

productSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("El nombre del producto ya existe."));
  } else {
    next(error);
  }
  next()
});

const Product = mongoose.model("Product", productSchema);

export { Product };
