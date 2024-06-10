import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost/backend/',
})
export default axiosInstance;