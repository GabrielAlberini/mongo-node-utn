import axios from "axios"

const API_PRODUCTS_BASE_URL = import.meta.env.VITE_API_PRODUCTS_BASE_URL

const getProducts = async () => {
  const response = await axios.get(API_PRODUCTS_BASE_URL)
  return response.data
}

const createProduct = async (productData) => {
  const response = await axios.post(API_PRODUCTS_BASE_URL, productData)
  return response.data
}

const updateProduct = async (id, productData) => {
  // http://localhost:2001/api/products/ID
  const response = await axios.patch(`${API_PRODUCTS_BASE_URL}/${id}`, productData)
  return response.data
}

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_PRODUCTS_BASE_URL}/${id}`)
  return response.data
}

export { getProducts, createProduct, updateProduct, deleteProduct }