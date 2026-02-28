import axios from 'axios';

// Use relative URL in production (same domain), localhost for development
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000';

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true // Important for cookies!
});

export default instance;
