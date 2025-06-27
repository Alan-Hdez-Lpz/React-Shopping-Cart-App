import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('/mock/products.json'); // or use static import for mock
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
