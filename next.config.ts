import type { NextConfig } from "next";

// Pega a URL do backend do env, ou usa localhost:5000 por padrão
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // permite qualquer origem
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          { key: "X-Backend-URL", value: BACKEND_URL }, // só pra referência interna
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: BACKEND_URL, // torna a URL acessível no frontend
  },
};

export default nextConfig;
