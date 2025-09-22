// pages/api/proxy/[...path].ts
import type { NextApiRequest, NextApiResponse } from "next";
import apiExterna  from "../../../service/api/apiExterna";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path, ...restQuery } = req.query; // separa path do resto da query
  if (!path || path.length === 0) {
    return res.status(400).json({ message: "O primeiro parâmetro da rota é obrigatório" });
  }

  // Primeiro parâmetro obrigatório
  const rotaPrincipal = Array.isArray(path) ? path[0] : path;

  // Restante dos parâmetros (opcional)
  const parametrosExtras = Array.isArray(path) ? path.slice(1) : [];

  // Monta a URL final para a API externa
  const url = [rotaPrincipal, ...parametrosExtras].join("/");

  try {
    const response = await apiExterna({
      method: req.method,
      url: `/${url}`,
      data: req.body,
      headers: req.headers,       // repassa os headers
      params: restQuery,          // repassa query params, sem path
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: "Erro no proxy" };
    res.status(status).json(data);
  }
}
