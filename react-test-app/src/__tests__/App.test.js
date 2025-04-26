import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import App from "../App";

test("renders header and footer", () => {
  render(<App />);
  expect(screen.getByText(/Sample App Header/i)).toBeInTheDocument();
  expect(screen.getByText(/© 2025 Sample App/i)).toBeInTheDocument();
});
