const products = [
  {
    id: 1,
    name: "Handmade Mug",
    price: 18.5,
    category: "Home",
    description: "Stoneware mug glazed in warm sand tones.",
    image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Desk Planner",
    price: 12,
    category: "Stationery",
    description: "Weekly planner with minimal dot-grid pages.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Canvas Tote",
    price: 26,
    category: "Accessories",
    description: "Heavyweight canvas with a sturdy strap.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Soy Candle",
    price: 22,
    category: "Home",
    description: "Cedar + fig fragrance with 40h burn time.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Travel Journal",
    price: 14,
    category: "Stationery",
    description: "Soft-touch cover with stitched binding.",
    image: "https://images.unsplash.com/photo-1484312152213-d713e8b7c053?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 48,
    category: "Tech",
    description: "Pocket-size speaker with rich bass.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  }
];

const cart = new Map();

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartPanel = document.getElementById("cart");
const checkout = document.getElementById("checkout");

const currency = (value) => `$${value.toFixed(2)}`;

const renderCategories = () => {
  const categories = [...new Set(products.map((p) => p.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
};

const renderProducts = () => {
  const query = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesQuery = product.name.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  productGrid.innerHTML = "";

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div class="price-row">
        <span class="price">${currency(product.price)}</span>
        <button class="primary" data-add="${product.id}">Add to cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
};

const renderCart = () => {
  cartItems.innerHTML = "";

  let subtotal = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItems += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <small>${currency(item.price)}</small>
        <div class="quantity">
          <button data-decrease="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button data-increase="${item.id}">+</button>
        </div>
        <button class="remove" data-remove="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  cartCount.textContent = totalItems;
  cartSubtotal.textContent = currency(subtotal);
  cartTax.textContent = currency(tax);
  cartTotal.textContent = currency(total);

  if (cart.size === 0) {
    cartItems.innerHTML = "<p>Your cart is empty. Add something!</p>";
  }
};

const addToCart = (id) => {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const existing = cart.get(id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.set(id, { ...product, quantity: 1 });
  }

  renderCart();
};

const updateQuantity = (id, delta) => {
  const item = cart.get(id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart.delete(id);
  }

  renderCart();
};

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
});

cartItems.addEventListener("click", (event) => {
  const decrease = event.target.closest("button[data-decrease]");
  const increase = event.target.closest("button[data-increase]");
  const remove = event.target.closest("button[data-remove]");

  if (decrease) updateQuantity(Number(decrease.dataset.decrease), -1);
  if (increase) updateQuantity(Number(increase.dataset.increase), 1);
  if (remove) {
    cart.delete(Number(remove.dataset.remove));
    renderCart();
  }
});

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);

const openCart = () => {
  cartPanel.classList.remove("hidden");
  cartPanel.classList.add("open");
};

const closeCart = () => {
  cartPanel.classList.remove("open");
  cartPanel.classList.add("hidden");
};

cartToggle.addEventListener("click", () => {
  if (cartPanel.classList.contains("hidden")) {
    openCart();
    return;
  }

  closeCart();
});

cartClose.addEventListener("click", () => {
  closeCart();
});

checkout.addEventListener("click", () => {
  if (cart.size === 0) return;
  window.location.href = "checkout.html";
});

renderCategories();
renderProducts();
renderCart();
