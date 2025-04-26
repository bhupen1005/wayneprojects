import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import Button from "../components/Button";

test("renders button with label", () => {
  render(<Button label="Click Me" />);
  expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
});
