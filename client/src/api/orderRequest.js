import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const API = axios.create({ baseURL: apiUrl });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("fooduser")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("fooduser")).token
    }`;
  }
  return req;
});
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("fooduser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export const createOrder = (data) => API.post(`/api/order`);
export const getorders = (data) => API.get(`/api/order/getorders`);
