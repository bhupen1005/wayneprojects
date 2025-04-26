import "@testing-library/jest-dom"; // Import jest-dom for extended matchers
import { render, screen } from '@testing-library/react';
import SidebarSection from '../components/SidebarSection';

test('renders section title and children', () => {
  render(
    <SidebarSection title="Test Section">
      <SidebarSection.Link label="Test Link" />
    </SidebarSection>
  );
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Section');
  expect(screen.getByText('Test Link')).toBeInTheDocument();
});
