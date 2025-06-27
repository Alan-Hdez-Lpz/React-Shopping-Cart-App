import { render, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

//Define the mock inline, using an allowed variable name (starts with mock)
jest.mock('../../context/CartContext', () => {
  const mockDispatch = jest.fn();
  return {
    useCart: () => ({
      dispatch: mockDispatch,
    }),
    __esModule: true,
    __mockDispatch: mockDispatch, // optionally export for access in tests
  };
});

import { __mockDispatch } from '../../context/CartContext';

describe('CartItem component', () => {
  const item = {
    id: 1,
    name: 'Test Product',
    price: 25,
    quantity: 2,
  };

  beforeEach(() => {
    __mockDispatch.mockClear(); // reset between tests
  });

  test('renders item name, price, and quantity', () => {
    const { getByText, getByDisplayValue } = render(<CartItem item={item} />);
    expect(getByText(/test product/i)).toBeInTheDocument();
    expect(getByText(/\$25/)).toBeInTheDocument();
    expect(getByDisplayValue('2')).toBeInTheDocument();
  });

  test('dispatches UPDATE_QUANTITY when input changes', () => {
    const { getByDisplayValue } = render(<CartItem item={item} />);
    const input = getByDisplayValue('2');
    fireEvent.change(input, { target: { value: '3' } });

    expect(__mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      payload: { id: 1, quantity: 3 },
    });
  });

  test('dispatches REMOVE_ITEM when remove button is clicked', () => {
    const { getByText } = render(<CartItem item={item} />);
    const removeButton = getByText(/remove/i);
    fireEvent.click(removeButton);

    expect(__mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      payload: 1,
    });
  });
});
