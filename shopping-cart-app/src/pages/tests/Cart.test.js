import { render, screen } from '@testing-library/react';
import Cart from '../Cart';

const mockCart = [
  { id: '1', name: 'Product 1', price: 10, quantity: 2 },
  { id: '2', name: 'Product 2', price: 5, quantity: 3 },
];

// Mock CartItem component to simplify test
jest.mock('../../components/CartItem', () => (props) => {
  return <div data-testid="cart-item">{props.item.name}</div>;
});

// Mock useCart hook inside CartContext
const mocks = {
  cart: [],
};

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    cart: mocks.cart,
  }),
}));

describe('Cart component', () => {
  afterEach(() => {
    mocks.cart = [];
  });

  test('renders empty cart message when cart is empty', () => {
    mocks.cart = [];
    render(<Cart />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items and total when cart has items', () => {
    mocks.cart = mockCart;
    render(<Cart />);

    // Check that each cart item is rendered
    const items = screen.getAllByTestId('cart-item');
    expect(items).toHaveLength(mockCart.length);
    expect(items[0]).toHaveTextContent('Product 1');
    expect(items[1]).toHaveTextContent('Product 2');

    // Check total calculation: (10*2) + (5*3) = 35.00
    expect(screen.getByText(/total: \$35\.00/i)).toBeInTheDocument();
  });
});
