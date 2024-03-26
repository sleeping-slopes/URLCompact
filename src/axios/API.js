import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

API.interceptors.response.use
(
    async response =>
    {
        return response.data.values;
    },
    async error =>
    {
        if (error.response) return {"error":{"status":error.response.data.status,"message":error.response.data.values}};
        return {"error":{"status":503,"message":"Network error"}};
    }
);

export default API