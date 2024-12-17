const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title">{product.name}</h3>
        <p className="mb-3">{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
      <footer className="card-footer">
        <button className="card-footer-item button is-warning">Edit</button>
        <button className="card-footer-item button is-danger" onClick={() => onDelete(product._id)}>Delete</button>
      </footer>
    </div>
  )
}

export default ProductCard