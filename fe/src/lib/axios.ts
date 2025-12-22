import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;