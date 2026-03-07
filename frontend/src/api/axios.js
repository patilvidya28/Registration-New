import axios from 'axios';

// Use environment variable, or production Render URL, or local dev fallback
const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:5000' : 'https://registration-new.onrender.com');

const instance = axios.create({
    baseURL: API_URL,
});

// Attach JWT from localStorage as Authorization header on every request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default instance;
