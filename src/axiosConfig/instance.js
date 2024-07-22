import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost/dashboard/luxury-site-last/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
