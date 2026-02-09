import client from './client';

function getErrorMessage(err: unknown, fallback: string) {
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const maybeErr = err as { message?: string; response?: { data?: { message?: string } } };
    if (maybeErr.response?.data?.message) return maybeErr.response.data.message;
    if (maybeErr.message) return maybeErr.message;
  }
  return fallback;
}

export const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const res = await client.post('/api/auth/register', data);
    return res.data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Registration failed'));
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await client.post('/api/auth/login', data);
    return res.data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Login failed'));
  }
};

export const getMe = async () => {
  try {
    const res = await client.get('/api/auth/me');
    return res.data; // { user }
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err, 'Failed to load user'));
  }
};

export const logout = async () => {
  // server does not implement server-side logout; clear client state instead
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default { register, login, getMe, logout };
