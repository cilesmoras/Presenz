const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

// const BASE_URL = "http://192.168.42.162:8800/";
const BASE_URL = API_BASE_URL;

export const Db = axios.create({
  baseURL: BASE_URL,
});
