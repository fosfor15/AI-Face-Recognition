import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

export default axiosInstance;
