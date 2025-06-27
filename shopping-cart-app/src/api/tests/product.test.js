/**
 * Mocking axios completely, so Jest doesn't attempt to parse it.
 */
jest.mock('axios', () => ({
  get: jest.fn(),
}));

const axios = require('axios');
const { fetchProducts } = require('../products');

describe('fetchProducts', () => {
  it('returns product data on success', async () => {
    const mockData = [{ id: 1, name: 'Test Product' }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchProducts();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/mock/products.json');
  });

  it('throws an error on failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchProducts()).rejects.toThrow('Failed to fetch products');
  });
});
