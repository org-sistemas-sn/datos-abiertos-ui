import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: baseUrl,
});
