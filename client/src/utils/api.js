import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Interceptor to attach Clerk session token dynamically if authenticated
api.interceptors.request.use(async (config) => {
  try {
    if (window.Clerk?.session) {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (err) {
    // Silent fallback if token fetching encounters issues
  }
  return config;
});

export default api;
