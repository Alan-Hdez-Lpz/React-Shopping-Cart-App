import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

// Mock react-router's Link
jest.mock('react-router', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Declare the mock inside jest.mock and export it to test later
const mocks = {
  dispatch: jest.fn(),
};

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    dispatch: mocks.dispatch,
  }),
}));

describe('ProductCard', () => {
  const product = {
    id: '123',
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
  };

  beforeEach(() => {
    mocks.dispatch.mockClear();
  });

  test('dispatches ADD_ITEM action on Add to Cart button click', () => {
    render(<ProductCard product={product} />);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(mocks.dispatch).toHaveBeenCalledTimes(1);
    expect(mocks.dispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: product,
    });
  });
});
