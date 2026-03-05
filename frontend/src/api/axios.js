import axios from 'axios';

// Use environment variable or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true // Important for cookies!
});

export default instance;
