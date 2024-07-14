import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const API = axios.create({ baseURL: apiUrl });
export const register = (data) => API.post(`/api/auth/register`, data);
export const login = (data) => API.post(`/api/auth/login`, data);
