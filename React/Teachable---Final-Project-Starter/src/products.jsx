import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Handmade Mug",
    price: 18.5,
    category: "Home",
    description: "Stoneware mug glazed in warm sand tones.",
    image:
      "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Desk Planner",
    price: 12,
    category: "Stationery",
    description: "Weekly planner with minimal dot-grid pages.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Canvas Tote",
    price: 26,
    category: "Accessories",
    description: "Heavyweight canvas with a sturdy strap.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Soy Candle",
    price: 22,
    category: "Home",
    description: "Cedar + fig fragrance with 40h burn time.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Travel Journal",
    price: 14,
    category: "Stationery",
    description: "Soft-touch cover with stitched binding.",
    image:
      "https://images.unsplash.com/photo-1484312152213-d713e8b7c053?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 48,
    category: "Tech",
    description: "Pocket-size speaker with rich bass.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
  },
];

const currency = (value) => `$${value.toFixed(2)}`;

export default function App() {
  // --- STATE-URI (Înlocuiesc variabilele globale și Map-ul) ---
  const [cart, setCart] = useState([]); // Folosim array în loc de Map pentru reactivitate mai ușoară
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- LOGICĂ (Derivată din state) ---
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- HANDLERS (Înlocuiesc event listeners) ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className="app">
      {/* HEADER & FILTRE */}
      <header>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={() => setIsCartOpen(!isCartOpen)}>
          Cart ({totalItems})
        </button>
      </header>

      {/* GRID PRODUSE */}
      <main className="product-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price-row">
              <span>{currency(product.price)}</span>
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          </article>
        ))}
      </main>

      {/* PANEL COȘ (Condițional) */}
      {isCartOpen && (
        <aside className="cart-panel">
          <button onClick={() => setIsCartOpen(false)}>Close</button>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Empty cart</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <h4>{item.name}</h4>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="totals">
            <p>Subtotal: {currency(subtotal)}</p>
            <p>Tax: {currency(tax)}</p>
            <strong>Total: {currency(total)}</strong>
            <button onClick={() => alert("Redirecting to checkout...")}>
              Checkout
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
