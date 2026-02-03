import client from './client';

export const register = async (data: { name: string; email: string; password: string }) => {
  const res = await client.post('/api/auth/register', data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await client.post('/api/auth/login', data);
  return res.data;
};

export const getMe = async () => {
  const res = await client.get('/api/auth/me');
  return res.data;
};

export const logout = async () => {
  // server does not implement server-side logout; clear client state instead
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default { register, login, getMe, logout };
