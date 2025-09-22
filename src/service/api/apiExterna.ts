// lib/api.ts
import axios from "axios";

const apiExterna = axios.create({
  baseURL: process.env.FAST_API_URL, // URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiExterna;