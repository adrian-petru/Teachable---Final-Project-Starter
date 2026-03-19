import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import ProductCard from "./productCard";
import "../../../styles.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import Layout from "./Layout";

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

function Home({
  filteredProducts,
  addToCart,
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) {
  return (
    <section className="catalog">
      <div className="section-head">
        <h2>Products</h2>

        <div className="filters">
          <input
            type="search"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const formatPrice = (amount) => `$${amount.toFixed(2)}`;

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addToCart = (p, amount) => {
    const existing = cart.find((item) => item.id === p.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === p.id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...p, quantity: 1 }]);
    }
  };

  // const toggleCart = () => {
  //   setIsCartOpen((prev) => !prev);
  // };

  const dataRemove = (products) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== products));
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            cart={cart}
            subtotal={subtotal}
            tax={tax}
            total={total}
            addToCart={addToCart}
            dataRemove={dataRemove}
            formatPrice={formatPrice}
          />
        }
      >
        <Route
          path="/App"
          element={
            <Home
              // products={products}
              filteredProducts={filteredProducts}
              addToCart={addToCart}
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              categories={categories}
            />
          }
        />
      </Route>
      <Route
        path="/checkout"
        element={<Checkout cart={cart} formatPrice={formatPrice} />}
      />
    </Routes>
  );
}

export default App;
