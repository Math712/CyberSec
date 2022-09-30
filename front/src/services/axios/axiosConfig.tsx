import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export const axiosConfig = axios.create({
    baseURL: `${API_ENDPOINT}/back`,
    withCredentials: true
});