import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

// Test component that uses CartContext
const TestComponent = () => {
  const { cart, dispatch } = useCart();

  return (
    <div>
      <p>Items in Cart: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
      <button onClick={() =>
        dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Product A', price: 10 } })
      }>
        Add Product A
      </button>
      <button onClick={() =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 3 } })
      }>
        Set Quantity to 3
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: 1 })}>
        Remove Product A
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  it('adds a product to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product A'));
    expect(screen.getByText(/Items in Cart: 1/i)).toBeInTheDocument();
  });

  it('updates product quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product A'));
    fireEvent.click(screen.getByText('Set Quantity to 3'));
    expect(screen.getByText(/Items in Cart: 3/i)).toBeInTheDocument();
  });

  it('removes a product from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product A'));
    fireEvent.click(screen.getByText('Remove Product A'));
    expect(screen.getByText(/Items in Cart: 0/i)).toBeInTheDocument();
  });

  it('clears the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product A'));
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByText(/Items in Cart: 0/i)).toBeInTheDocument();
  });
});
