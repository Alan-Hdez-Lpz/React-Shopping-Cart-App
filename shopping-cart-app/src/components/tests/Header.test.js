import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock react-router's Link component to just render an anchor tag for testing
jest.mock('react-router', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mock the CartContext
const mockCart = [
  { id: 1, name: 'Product 1', quantity: 2 },
  { id: 2, name: 'Product 2', quantity: 3 },
];

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    cart: mockCart,
  }),
}));

describe('Header component', () => {
  test('renders site title and navigation links', () => {
    render(<Header />);

    // Check site title
    expect(screen.getByText(/ShopNow/i)).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart');
    expect(screen.getByRole('link', { name: /checkout/i })).toHaveAttribute('href', '/checkout');
  });

  test('displays the correct cart item count', () => {
    render(<Header />);
    // Cart count = 2 + 3 = 5
    expect(screen.getByText(/Cart \(5\)/i)).toBeInTheDocument();
  });
});
