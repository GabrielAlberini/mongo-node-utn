import axios from "axios"

// "http://localhost:2001/api/products"
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

// http://localhost:2001/api/products?minStock=10&maxStock=30
const getFilteredProducts = async (filters) => {
  const query = new URLSearchParams(filters).toString()
  const response = await axios.get(`${API_PRODUCTS_BASE_URL}/search?${query}`)
  return response.data
}

const getStatsProducts = async () => {
  const response = await axios.get(`${API_PRODUCTS_BASE_URL}/stats`)
  return response.data
}

export { getProducts, createProduct, updateProduct, deleteProduct, getFilteredProducts, getStatsProducts }