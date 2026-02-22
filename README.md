# Simple Shop Project

## Overview
This project is a small, front-end-only online shop built with plain HTML, CSS, and JavaScript. It includes a product catalog, a cart UI, and a standalone checkout page.

## Project Structure
- `index.html`: Main storefront page (catalog + cart).
- `styles.css`: Global styling for the storefront and shared UI elements.
- `app.js`: Storefront logic (render products, filter, cart state, totals).
- `checkout.html`: Checkout page layout (contact, shipping, payment form).
- `checkout.css`: Styles specific to the checkout page.
- `checkout.js`: Checkout page logic (summary rendering, demo order action).

## How It Works
### Storefront
- `index.html` contains the main layout: header, product grid, and cart sidebar.
- `app.js` keeps an in-memory cart using a `Map` and renders UI based on it.
- Product cards are generated dynamically from a static `products` array.
- Search and category filters update the product grid in real time.
- The cart shows items, quantities, and totals with an 8% tax.
- The `Cart` button and the `X` button toggle visibility of the cart panel.

### Checkout
- `checkout.html` is a standalone form page with a summary panel.
- `checkout.js` uses a demo `sampleCart` to render the summary.
- The `Place order` button shows a demo alert only.

## Key Files Explained
- `app.js`
  - `products`: Static data source for the catalog.
  - `renderProducts()`: Builds the product cards.
  - `renderCart()`: Builds the cart UI and totals.
  - `addToCart()` and `updateQuantity()`: Mutate cart state.
  - Event listeners handle add/remove and filter changes.
- `styles.css`
  - Defines the full storefront layout, card styles, and responsive behavior.
  - Adds cart slide behavior on small screens.
- `checkout.js`
  - `renderSummary()`: Outputs summary items and totals.
  - Uses a fixed shipping fee and 8% tax for demo purposes.

## Running The Project
Open `index.html` in a browser. No build tools are required.

## Final Project Requirements (Student Tasks)
1. Move the project to React.
2. Add unit tests for at least 3 components.
3. Use Supabase as the backend.

## Testing Requirements
- Use a testing framework.
- Example targets:
  - `ProductCard` adds item to cart.
  - `CartItem` increments and decrements quantity.
  - `OrderSummary` calculates totals correctly.

## Supabase Requirements
- Create tables for `products` and `cart_items` or `orders`.
- Read products from Supabase instead of static arrays.
- Optionally store orders on checkout submission.

