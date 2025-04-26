import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with label', () => {
  render(<Button label="Press" />);
  expect(screen.getByRole('button')).toHaveTextContent('Press');
});
