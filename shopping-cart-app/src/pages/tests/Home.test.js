import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router';
import Home from '../Home';

//Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));
const axios = require('axios');

//Mock useCart
jest.mock('../../context/CartContext', () => ({
  useCart: jest.fn(),
}));
const { useCart } = require('../../context/CartContext');

describe('Home component', () => {
  beforeEach(() => {
    // Return a mock dispatch function to avoid context error
    useCart.mockReturnValue({ dispatch: jest.fn() });
  });

  test('renders products after fetching', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Product 1', price: 10, image: 'img1.jpg' },
        { id: 2, name: 'Product 2', price: 20, image: 'img2.jpg' },
      ],
    });

    //Wrap Home with BrowserRouter for <Link> to work
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/product 2/i)).toBeInTheDocument();
  });
});
