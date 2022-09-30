import axios from "axios";

export const axiosConfig = axios.create({
    baseURL: 'https://localhost/back',
    withCredentials: true
});