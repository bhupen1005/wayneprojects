import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Content from '../components/Content';

test('renders content article with paragraph and button', () => {
  render(<Content />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome to the content section');
  expect(screen.getByText('This area showcases nested components.')).toBeInTheDocument();
  expect(screen.getByText('Learn More')).toBeInTheDocument();
});
