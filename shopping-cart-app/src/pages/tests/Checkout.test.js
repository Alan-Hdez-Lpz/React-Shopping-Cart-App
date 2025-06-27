import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from '../Checkout';

const mockCart = [
  { id: '1', name: 'Product 1', price: 10, quantity: 2 },
  { id: '2', name: 'Product 2', price: 5, quantity: 3 },
];

// Mock useCart hook and dispatch function
const mocks = {
  cart: [],
  dispatch: jest.fn(),
};

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    cart: mocks.cart,
    dispatch: mocks.dispatch,
  }),
}));

describe('Checkout component', () => {
  beforeEach(() => {
    mocks.dispatch.mockClear();
    mocks.cart = [];
  });

  test('renders empty cart message', () => {
    mocks.cart = [];
    render(<Checkout />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items and total', () => {
    mocks.cart = mockCart;
    render(<Checkout />);
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/product 2/i)).toBeInTheDocument();

    // Total = (10*2) + (5*3) = 35
    expect(screen.getByText(/total: \$35\.00/i)).toBeInTheDocument();
  });

  test('shows validation error if fields are empty', () => {
    mocks.cart = mockCart;
    render(<Checkout />);

    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    expect(screen.getByText(/all fields are required/i)).toBeInTheDocument();
    expect(mocks.dispatch).not.toHaveBeenCalled();
  });

  test('shows validation error if email is invalid', () => {
    mocks.cart = mockCart;
    render(<Checkout />);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText(/shipping address/i), {
      target: { value: '123 Main St' },
    });

    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(mocks.dispatch).not.toHaveBeenCalled();
  });

  test('submits order and clears cart on valid form', () => {
    mocks.cart = mockCart;
    render(<Checkout />);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/shipping address/i), {
      target: { value: '123 Main St' },
    });

    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    // dispatch CLEAR_CART called
    expect(mocks.dispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });

    // Confirmation message displayed
    expect(screen.getByText(/order placed successfully! thank you, john doe./i)).toBeInTheDocument();
  });
});
