import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders header title', () => {
  render(<Header />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Complex Sample App');
});
