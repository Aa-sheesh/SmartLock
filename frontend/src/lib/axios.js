import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.mode === "development" ? "http://localhost:5000" : "/",
  withCredentials: true, // ensures cookies are sent with requests
});

export default axiosInstance;
