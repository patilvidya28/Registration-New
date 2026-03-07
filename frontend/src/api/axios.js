import axios from 'axios';

// Use environment variable, or production Render URL, or local dev fallback
const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:5000' : 'https://registration-new.onrender.com');

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true // Important for cookies!
});

export default instance;
