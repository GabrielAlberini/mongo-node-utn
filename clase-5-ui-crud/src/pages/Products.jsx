import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/apiProducts"
import ProductForm from "../components/ProductForm"

const Products = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)

  const fetchProduct = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.log("Error fetching products:", error)
    }
  }

  const handleCreate = async (productData) => {
    try {
      await createProduct(productData)
      fetchProduct()
      setShowForm(false)
    } catch (error) {
      console.log("Error adding product:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the product?"))
      await deleteProduct(id)
    fetchProduct()
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Products</h1>
          <button className="button is-primary mb-5" onClick={() => {
            setShowForm(!showForm)
          }}>{showForm ? "Cancel" : "Add product"}</button>


          {
            showForm && <ProductForm onSubmit={handleCreate} />
          }


          <div className="columns is-multiline">
            {
              products.map(product => {
                return (
                  <div className="column is-one-quarter" key={product._id}>
                    <ProductCard product={product} onDelete={handleDelete} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Products