import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

test('renders nav items', () => {
  render(<NavBar />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByText('Settings')).toBeInTheDocument();
});
