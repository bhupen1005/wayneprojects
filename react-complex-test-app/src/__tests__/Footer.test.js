import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders footer text', () => {
  render(<Footer />);
  expect(screen.getByText('© 2025 Complex Sample App')).toBeInTheDocument();
});
