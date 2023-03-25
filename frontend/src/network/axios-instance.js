import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ai-face-recognition-backend.onrender.com',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

export default axiosInstance;
