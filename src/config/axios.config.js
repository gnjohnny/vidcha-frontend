import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://vidcha-api.onrender.com/api",
    withCredentials: true,
});
