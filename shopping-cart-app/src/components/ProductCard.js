import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import { ProductCardWrapper } from '../styles/styles';

const ProductCard = ({ product, onAdd }) => {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    if (onAdd) onAdd(); // trigger message in parent
  };

  return (
    <ProductCardWrapper>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price}</p>
      <button onClick={handleAdd}>
        Add to Cart
      </button>
    </ProductCardWrapper>
  );
};

export default ProductCard;
