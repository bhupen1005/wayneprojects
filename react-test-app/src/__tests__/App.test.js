import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import { act } from "react";

test("renders header and footer", () => {
  render(<App />);
  expect(screen.getByText(/Sample App Header/i));
  expect(screen.getByText(/© 2025 Sample App/i));
  expect(screen.getByText(/Click Me/i));
});
test("renders table", () => {
  render(<App />);
  expect(screen.getByText(/Header 1/i));
  expect(screen.getByText(/Row 1, Cell 1/i));
  expect(screen.getByText(/Footer 2/i));
});

test("toggles header body visibility", () => {
  render(<App />);
  const button = screen.getByText(/Hide Header Body/i);
  expect(screen.getByText(/This is the header body/i));
  act(() => {
    button.click();
  });
  expect(screen.queryByText(/This is the header body/i)).toBeNull();

  act(() => {
    button.click();
  });
  expect(screen.getByText(/This is the header body/i));
});

test("fetches and displays users", async () => {
  render(<App />);
  const userList = await screen.findByRole("list");
  expect(userList).toBeInTheDocument();
  await screen.findByText((content, element) =>
    content.includes("Leanne Graham")
  );
  await screen.findByText((content, element) =>
    content.includes("Ervin Howell")
  );
});

test("displays loading state", () => {
  render(<App />);
  expect(screen.getByText(/Loading.../i));
});
test("displays error message", async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error("Network response was not ok"))
  );
  render(<App />);
  const errorMessage = await screen.findByText(
    /Error: Network response was not ok/i
  );
  expect(errorMessage);
});
