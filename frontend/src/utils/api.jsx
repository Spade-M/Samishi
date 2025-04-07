// axiosConfig.js
import axios from 'axios';

const token = localStorage.getItem("token");  // Or however you store it

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: token ? `Token ${token}` : '',
  },
});

export default api;
