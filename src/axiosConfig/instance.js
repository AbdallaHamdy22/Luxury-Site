import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost/dashboard/LUXURY-SITE',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
