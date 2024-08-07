import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://royal-luxury.great-site.net/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
