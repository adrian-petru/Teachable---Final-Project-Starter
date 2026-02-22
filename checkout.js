const sampleCart = [
  {
    id: 1,
    name: "Handmade Mug",
    price: 18.5,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Soy Candle",
    price: 22,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
  }
];

const summaryItems = document.getElementById("summary-items");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryShipping = document.getElementById("summary-shipping");
const summaryTax = document.getElementById("summary-tax");
const summaryTotal = document.getElementById("summary-total");
const placeOrder = document.getElementById("place-order");

const currency = (value) => `$${value.toFixed(2)}`;

const renderSummary = () => {
  summaryItems.innerHTML = "";

  let subtotal = 0;
  sampleCart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "summary-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <small>Qty ${item.quantity}</small>
      </div>
      <strong>${currency(item.price * item.quantity)}</strong>
    `;
    summaryItems.appendChild(row);
  });

  const shipping = subtotal > 0 ? 6 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  summarySubtotal.textContent = currency(subtotal);
  summaryShipping.textContent = currency(shipping);
  summaryTax.textContent = currency(tax);
  summaryTotal.textContent = currency(total);
};

placeOrder.addEventListener("click", () => {
  alert("Order placed! (Demo only)");
});

renderSummary();
