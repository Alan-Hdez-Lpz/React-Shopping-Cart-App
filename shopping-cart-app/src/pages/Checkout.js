import { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  CheckoutForm,
  Title,
  Message,
  Total,
  CartItem,
} from '../styles/styles';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const [details, setDetails] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details.name || !details.email || !details.address) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(details.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Clear cart and show confirmation
    dispatch({ type: 'CLEAR_CART' });
    setError('');
    setSubmitted(true);
  };

  if (submitted) return <Message>Order placed successfully! Thank you, {details.name}.</Message>;

  if (cart.length === 0) return <Message>Your cart is empty.</Message>;

  return (
    <div style={{ padding: '1rem' }}>
      <Title>Review Your Cart</Title>
      {cart.map((item) => (
        <CartItem key={item.id}>
          <div>
            <strong>{item.name}</strong> (x{item.quantity})
          </div>
          <div>${(item.price * item.quantity).toFixed(2)}</div>
        </CartItem>
      ))}
      <Total>Total: ${total.toFixed(2)}</Total>

      <Title>Shipping Details</Title>
      <CheckoutForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={details.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={details.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={details.address}
          onChange={handleChange}
          required
        />
        {error && <Message style={{ color: 'red' }}>{error}</Message>}
        <button type="submit">Place Order</button>
      </CheckoutForm>
    </div>
  );
};

export default Checkout;
