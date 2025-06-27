import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import { Message, ProductGrid, PaginationContainer, Button } from '../styles/styles';

const PRODUCTS_PER_PAGE = 4;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Error loading products'))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  if (loading) return <Message>Loading...</Message>;
  if (error) return <Message>{error}</Message>;

  return (
    <>
      <ProductGrid>
        {paginatedProducts.map(product => (
          <ProductCard key={product.id} product={product} onAdd={() => alert('Item added to cart!')}/>
        ))}
      </ProductGrid>

      <PaginationContainer>
        <Button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </PaginationContainer>
    </>
  );
};

export default Home;
