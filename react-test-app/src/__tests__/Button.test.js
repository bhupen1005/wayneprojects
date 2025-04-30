import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import Button from "../components/Button";
import { act } from "react";
test("renders button with label", async () => {
  render(<Button label="Click Me" />);
  expect(await screen.getByText(/Click Me/i)).toBeInTheDocument();
});
