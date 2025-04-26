import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Paragraph from '../components/Paragraph';

test('renders paragraph text', () => {
  render(<Paragraph text="Sample Text" />);
  expect(screen.getByText('Sample Text')).toBeInTheDocument();
});
