"use client";
import { ButtonConfirmCancelProps } from "@/types";
import style from "./button.module.css"; // use seu CSS ou Tailwind

export default function BotaoConfirm({ AoClicar, desativar = false, estilo, texto = "Confirmar" }: ButtonConfirmCancelProps) {
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
