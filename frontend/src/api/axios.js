import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // replace with your backend URL if different
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // JWT stored after login
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

