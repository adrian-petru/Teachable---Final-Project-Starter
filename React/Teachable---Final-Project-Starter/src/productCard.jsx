// src/ProductCard.jsx

// Primim "product" și funcția "onAddToCart" ca proprietăți (props)
const ProductCard = ({ product, onAddToCart }) => {
  const currency = (value) => `$${value.toFixed(2)}`;

  return (
    <article className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          <span className="price">{currency(product.price)}</span>
          <button className="primary" onClick={() => onAddToCart(product, 1)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
