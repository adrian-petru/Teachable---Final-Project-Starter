import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "../../../styles.css";
import "./App.css";

function Layout({
  cart,
  subtotal,
  tax,
  total,
  formatPrice,
  addToCart,
  dataRemove,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <h1>Simple Shop</h1>
            <p>Final project store</p>
          </div>
        </div>

        <button
          className={`cart-button ${isCartOpen ? "open" : "hidden"}`}
          aria-label="Open cart"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          Cart
          <span id="cart-count" className="cart-count">
            ({cart.reduce((a, b) => a + b.quantity, 0)})
          </span>
        </button>
      </header>

      <main className="layout">
        <section className="content">
          <Outlet />
        </section>

        <aside
          id="cart"
          className={`cart ${isCartOpen ? "hidden" : "open"}`}
          aria-live="polite"
        >
          <div className="cart-head">
            <h2>Your cart</h2>
            <button
              id="cart-close"
              className="icon-button"
              aria-label="Close cart"
              onClick={() => setIsCartOpen(false)}
            >
              &times;
            </button>
          </div>

          {cart.length === 0 && <p>Your cart is empty. Add something!</p>}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <small>{formatPrice(item.price)}</small>

                <div className="quantity">
                  <button
                    className="quantity button"
                    onClick={() => addToCart(item, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity button"
                    onClick={() => addToCart(item, 1)}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => dataRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <strong>{formatPrice(tax)}</strong>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <Link to="/checkout" className="primary">
              Checkout
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Layout;
