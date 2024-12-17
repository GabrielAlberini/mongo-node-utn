import mongoose from "mongoose"

export const connectDB = async (URI_DB) => {
  try {
    await mongoose.connect(URI_DB)
    console.log("Conexión a mongodb exitosa")
  } catch (error) {
    console.log("Conexión a mongodb rechazada")
  }
}


