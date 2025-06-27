import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import {
  ProductDetailWrapper,
  ProductImage,
  ProductInfo,
  Message,
  BackButton,
} from '../styles/styles';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProducts()
      .then(data => {
        const found = data.find(p => p.id.toString() === id);
        if (!found) {
          setError('Product not found.');
          setProduct(null);
        } else {
          setProduct(found);
        }
      })
      .catch(() => {
        setError('Failed to load product data.');
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setAddedMessage('Item added to cart!');
    setTimeout(() => setAddedMessage(''), 2000); // clear after 2 seconds
  };

  if (loading) return <Message>Loading product...</Message>;
  if (error) return <Message error="true">{error}</Message>;

  return (
    <>
      <BackButton to="/">← Back to Products</BackButton>
      <ProductDetailWrapper>
        <ProductImage src={product.image} alt={product.name} />
        <ProductInfo>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span>${product.price}</span>
          <button onClick={handleAddToCart}>Add to Cart</button>
          {addedMessage && <Message>{addedMessage}</Message>}
        </ProductInfo>
      </ProductDetailWrapper>
    </>
  );
};

export default ProductDetail;
