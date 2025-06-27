import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { CartContainer, Total, Message, Title } from '../styles/styles';

const Cart = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <Message>Your cart is empty.</Message>;

  return (
    <CartContainer>
      <Title>Your Cart</Title>
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <Total>Total: ${total.toFixed(2)}</Total>
    </CartContainer>
  );
};

export default Cart;
