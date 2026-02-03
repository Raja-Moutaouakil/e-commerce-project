import client from './client';

export const fetchProducts = async () => {
  const res = await client.get('/api/products');
  return res.data;
};