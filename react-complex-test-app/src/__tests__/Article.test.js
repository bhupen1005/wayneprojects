import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import Article from '../components/Article';

test('renders article title and children', () => {
  render(
    <Article title="Sample Article">
      <p>Article paragraph.</p>
    </Article>
  );
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sample Article');
  expect(screen.getByText('Article paragraph.')).toBeInTheDocument();
});
