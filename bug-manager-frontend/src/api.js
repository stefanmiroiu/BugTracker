import axios from 'axios';

// Cream o instanta axios cu URL-ul serverului tau
const api = axios.create({
    baseURL: '/api',
});

// Interceptor: Inainte de orice cerere, verificam daca avem token si il atasam
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;