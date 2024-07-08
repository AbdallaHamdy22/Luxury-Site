import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost/dashboard/LUXURY-SITE/',
})
export default axiosInstance;