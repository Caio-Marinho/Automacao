// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});
