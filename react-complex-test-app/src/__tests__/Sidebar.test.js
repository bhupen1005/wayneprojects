import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';

test('renders sidebar sections and links', () => {
  render(<Sidebar />);
  expect(screen.getByText('Features')).toBeInTheDocument();
  expect(screen.getByText('Feature A')).toBeInTheDocument();
  expect(screen.getByText('Feature B')).toBeInTheDocument();
  expect(screen.getByText('Resources')).toBeInTheDocument();
  expect(screen.getByText('Docs')).toBeInTheDocument();
  expect(screen.getByText('Tutorials')).toBeInTheDocument();
});
