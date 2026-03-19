import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ProductCard from "./productCard";
import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Checkout from "./Checkout";
import App from "./App";

describe("E-commerce Store Logic", () => {
  it("should call onAddToCart when the button is clicked", () => {
    const mockAdd = vi.fn();
    const product = { id: 1, name: "Laptop", price: 1000 };
    render(<ProductCard product={product} onAddToCart={mockAdd} />);
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "Laptop" }),
      1,
    );
  });

  it("should increment quantity when + button is cliked", () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    const item = { id: 1, name: "Mouse", quantity: 1, price: 50 };
    const simpleFormat = (val) => `$${val}`;
    render(
      <MemoryRouter>
        <Layout
          item={item}
          addToCart={mockAddToCart}
          cart={[item]}
          formatPrice={simpleFormat}
        />
      </MemoryRouter>,
    );
    const plusButton = screen.getByRole("button", { name: /\+/i });
    fireEvent.click(plusButton);
    // await user.click(plusButton);
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: "Mouse" }),
      1,
    );
  });

  it("should calculate the correct total for the items in cart", () => {
    const cart = [{ id: 1, price: 100, quantity: 2 }];
    const expectedTotal = "$222";
    render(
      <MemoryRouter>
        <Checkout cart={cart} formatPrice={(n) => `$${n}`} />
      </MemoryRouter>,
    );
    const totalElement = screen.getByText(expectedTotal);
    // const totalValue = screen.getByText((content, element) => {
    //   return element.textContent.includes("216");
    // });
    // const totalElement = screen.getByText(/222/);
    // screen.debug();
    expect(totalElement).toBeInTheDocument();
  });
});
