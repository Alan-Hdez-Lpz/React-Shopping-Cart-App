import { useCart } from '../context/CartContext';
import { CartItem as StyledCartItem } from '../styles/styles';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleQuantityChange = e => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.id });
  };

  return (
    <StyledCartItem>
      <div>
        <strong>{item.name}</strong> - ${item.price}
      </div>
      <input
        type="number"
        value={item.quantity}
        min="1"
        onChange={handleQuantityChange}
      />
      <button onClick={handleRemove}>Remove</button>
    </StyledCartItem>
  );
};

export default CartItem;
