import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import App from '../App';

test('App renders main structure', () => {
  render(<App />);
  expect(screen.getByText('Complex Sample App')).toBeInTheDocument();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Features')).toBeInTheDocument();
  expect(screen.getByText('Welcome to the content section')).toBeInTheDocument();
  expect(screen.getByText('© 2025 Complex Sample App')).toBeInTheDocument();
});
