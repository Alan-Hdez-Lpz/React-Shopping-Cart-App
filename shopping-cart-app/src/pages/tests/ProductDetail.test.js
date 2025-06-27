import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProductDetail from '../ProductDetail';
import { CartProvider } from '../../context/CartContext';

// Mock axios completely
jest.mock('axios', () => ({
  get: jest.fn(),
}));

const axios = require('axios');

describe('ProductDetail component', () => {
  const product = {
    id: 1,
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    image: 'product1.jpg',
  };

  beforeEach(() => {
    // Reset mocks before each test
    axios.get.mockReset();
  });

  test('renders loading initially and then product details', async () => {
    // Mock axios.get to resolve with product data
    axios.get.mockResolvedValue({ data: [product] });

    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // Initially shows loading
    expect(screen.getByText(/loading product/i)).toBeInTheDocument();

    // Wait for product to appear
    await waitFor(() => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    // Product description and price are shown
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  test('handles product not found error', async () => {
    axios.get.mockResolvedValue({ data: [] }); // no products returned

    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/999']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/product not found/i)).toBeInTheDocument();
    });
  });

  test('handles fetch failure', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load product data/i)).toBeInTheDocument();
    });
  });

  test('adds item to cart and shows confirmation message', async () => {
    axios.get.mockResolvedValue({ data: [product] });

    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(screen.getByText(/item added to cart/i)).toBeInTheDocument();

    // Wait for message to disappear after 2 seconds
    await waitFor(
      () => {
        expect(screen.queryByText(/item added to cart/i)).not.toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
});
