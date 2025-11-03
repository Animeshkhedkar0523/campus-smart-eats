import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
};

// Menu API
export const menuAPI = {
  getAllItems: () => api.get('/menu'),
  getItem: (id: string) => api.get(`/menu/${id}`),
  createItem: (data: any) => api.post('/menu', data),
  updateItem: (id: string, data: any) => api.put(`/menu/${id}`, data),
  deleteItem: (id: string) => api.delete(`/menu/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (menuItemId: string, quantity: number) =>
    api.post('/cart/add', { menuItemId, quantity }),
  updateCartItem: (menuItemId: string, quantity: number) =>
    api.put('/cart/update', { menuItemId, quantity }),
  clearCart: () => api.delete('/cart/clear'),
};

// Order API
export const orderAPI = {
  createOrder: (orderData: any) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders/user'),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
  getAllOrders: () => api.get('/orders/admin/all'),
  getOrderStats: () => api.get('/orders/admin/stats'),
};

export default api;