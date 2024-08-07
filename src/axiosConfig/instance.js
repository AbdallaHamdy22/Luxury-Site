import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://royal-luxury.great-site.net/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
