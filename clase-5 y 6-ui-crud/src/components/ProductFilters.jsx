import { useState } from "react"

const ProductFilters = ({ onFilter }) => {

  const initialFilters = {
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
    order: "asc"
  }

  const [filters, setFilters] = useState(initialFilters)

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(filters)
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleClearFilters = () => {
    setFilters(initialFilters)
    onFilter(filters)
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="title is-4">Filter Products</h2>

      <div className="field">
        <label className="label">Min price</label>
        <div className="control">
          <input
            type="number"
            name="minPrice"
            className="input"
            value={filters.minPrice}
            onChange={handleChange}
            min={0} />
        </div>
      </div>
      <div className="field">
        <label className="label">Max price</label>
        <div className="control">
          <input
            type="number"
            name="maxPrice"
            className="input"
            value={filters.maxPrice}
            onChange={handleChange}
            min={0} />
        </div>
      </div>
      <div className="field">
        <label className="label">Min stock</label>
        <div className="control">
          <input
            type="number"
            name="minStock"
            className="input"
            value={filters.minStock}
            onChange={handleChange}
            min={0} />
        </div>
      </div>
      <div className="field">
        <label className="label">Max stock</label>
        <div className="control">
          <input
            type="number"
            name="maxStock"
            className="input"
            value={filters.maxStock}
            onChange={handleChange}
            min={0} />
        </div>
      </div>
      <div className="field">
        <label className="label">Order by price</label>
        <div className="select">
          <select
            name="order"
            value={filters.order}
            onChange={handleChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="control">
        <button type="submit" className="button is-link">Apply Filters</button>
        <button type="button" className="button is-success ml-3 has-text-white" onClick={handleClearFilters}>Reset Filters</button>
      </div>
    </form>
  )
}

export default ProductFilters