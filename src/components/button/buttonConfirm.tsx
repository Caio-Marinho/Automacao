"use client";
import { BotaoConfirmarCancelarProps } from "@/types";
import style from "@/styles/button.module.css"; // use seu CSS ou Tailwind

export default function BotaoConfirm({ AoClicar, desativar = false, estilo, texto = "Confirmar" }: BotaoConfirmarCancelarProps) {
  return (
    <button
      type="button"
      className={`${style.base} ${style.primary} ${estilo ?? ""}`}
      onClick={AoClicar}
      disabled={desativar}
    >
      {texto}
    </button>
  );
}
