import axios from "axios";

const API_URL = "http://localhost:5000";

const API =  axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Request interceptor to include token
API.interceptors.request.use(
    (config) => {
        // Check if a token exists in localStorage and add it to the Authorization header
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized error
            localStorage.removeItem('authToken');  // Remove the correct token
            window.location.href = '/login';  // Redirect to the login page
        }
        return Promise.reject(error); 
    }
);

export default API;