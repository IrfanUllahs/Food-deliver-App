import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const API = axios.create({ baseURL: apiUrl });
export const getfoods = ({ category }) =>
  API.get(`/api/food/getfoods/${category}`);
