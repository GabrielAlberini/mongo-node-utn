/**
 * Configuración de la conexión a MongoDB.
 * Establece la conexión a la base de datos de MongoDB.
 */

import mongoose from "mongoose";

/**
 * Conecta a la base de datos de MongoDB.
 * @param {string} URI_DB_MONGO - Cadena de conexión de MongoDB
 */
const connectDB = async (URI_DB_MONGO) => {
  try {
    await mongoose.connect(URI_DB_MONGO);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

export { connectDB };
