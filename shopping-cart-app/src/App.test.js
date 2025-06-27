import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock axios to avoid ESM parsing issues in tests
jest.mock('axios', () => ({
  get: jest.fn(),
}));

// Optional: mock child components to keep tests focused
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Cart', () => () => <div>Cart Page</div>);
jest.mock('./pages/Checkout', () => () => <div>Checkout Page</div>);
jest.mock('./pages/ProductDetail', () => () => <div>Product Detail Page</div>);

describe('App routing', () => {
  test('renders Header and Home page initially', () => {
    render(<App />);
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  test('navigates to Cart page', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: /cart/i }));
    expect(screen.getByText(/cart page/i)).toBeInTheDocument();
  });

  test('navigates to Checkout page', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: /checkout/i }));
    expect(screen.getByText(/checkout page/i)).toBeInTheDocument();
  });

  test('navigates to ProductDetail page manually', () => {
    window.history.pushState({}, '', '/product/1');
    render(<App />);
    expect(screen.getByText(/product detail page/i)).toBeInTheDocument();
  });
});
