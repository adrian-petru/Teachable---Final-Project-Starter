import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";
import "../../../checkout.css";
import "./Checkout.css";
import { supabase } from "./supabaseClient";

const Checkout = ({ cart = [], formatPrice }) => {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
  });
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 6 : 0;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    // console.log("Date de trimis:", customerData);
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: customerData.first + " " + customerData.last,
          customer_email: customerData.email,
          total_amount: total,
        },
      ])
      .select()
      .single();

    // console.log("Starea actuală:", customerData);
    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: subtotal,
    }));
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
  };
  return (
    <>
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <h1>Simple Shop</h1>
            <p>Checkout</p>
          </div>
        </div>
        <Link to="/App" className="cart-button">
          Back to shop
        </Link>
      </header>
      <main className="checkout-layout">
        <section className="checkout-panel">
          <h2>Contact</h2>
          <div className="field-grid">
            <label>
              Email*
              <input
                type="email"
                value={customerData.email}
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              Phone*
              <input id="phone" type="tel" placeholder="(555) 123-4567" />
            </label>
          </div>

          <h2>Shipping</h2>
          <div className="field-grid two">
            <label>
              First name
              <input
                value={customerData.first}
                onChange={(e) =>
                  setCustomerData({ ...customerData, first: e.target.value })
                }
                type="text"
                placeholder="Jane"
                required
              />
            </label>
            <label>
              Last name
              <input
                value={customerData.last}
                onChange={(e) =>
                  setCustomerData({ ...customerData, last: e.target.value })
                }
                type="text"
                placeholder="Doe"
                required
              />
            </label>
            <label className="full">
              Address
              <input
                id="address"
                type="text"
                placeholder="123 Market St"
                required
              />
            </label>
            <label>
              City
              <input
                id="city"
                type="text"
                placeholder="San Francisco"
                required
              />
            </label>
            <label>
              Postal code
              <input id="zip" type="text" placeholder="94103" required />
            </label>
            <label>
              Country
              <select id="country">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </label>
          </div>

          <h2>Payment</h2>
          <div className="field-grid two">
            <label className="full">
              Card number
              <input
                id="card"
                type="text"
                placeholder="1234 5678 9012 3456"
                required
              />
            </label>
            <label>
              Expiration
              <input id="exp" type="text" placeholder="MM/YY" required />
            </label>
            <label>
              CVC
              <input id="cvc" type="text" placeholder="123" required />
            </label>
            <label className="full">
              Name on card
              <input
                id="card-name"
                type="text"
                placeholder="Jane Doe"
                required
              />
            </label>
          </div>

          <label className="checkbox">
            <input id="save" type="checkbox" />
            Save details for next time
          </label>

          <button onClick={handleCheckout} className="primary">
            Place order
          </button>
        </section>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4> <small>Qty {item.quantity}</small>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
          <div id="summary-items" className="summary-items"></div>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong id="summary-subtotal">{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong id="summary-shipping">{formatPrice(shipping)}</strong>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <strong id="summary-tax">{formatPrice(tax)}</strong>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <strong id="summary-total">{formatPrice(total)}</strong>
            </div>
          </div>
        </aside>
      </main>
      <footer className="site-footer">
        <p>Final project starter.</p>
      </footer>
    </>
  );
};

export default Checkout;
