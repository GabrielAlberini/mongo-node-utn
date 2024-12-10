import { getStatsProducts } from "../services/apiProducts.js"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"

const Resume = () => {
  const [stats, setStats] = useState(null)

  const fetchStats = async () => {
    try {
      const dataStats = await getStatsProducts()
      setStats(dataStats)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(stats)

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title is-4">Product Resume</h1>
          {
            stats ? (
              <div className="box">
                <p><strong>Average price: </strong>${stats.averagePrice.toFixed(2)}</p>
                <p><strong>Total stock: </strong>{stats.totalStock}</p>
                <p><strong>Count products: </strong>{stats.productCount}</p>
              </div>
            ) : <p>No data availble</p>
          }
        </div>
      </section>
    </Layout>
  )
}

export default Resume