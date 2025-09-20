"use client";
import { ButtonConfirmCancelProps } from "@/types";
import style from "./button.module.css";

export default function BotaoCancelar({  AoClicar, desativar = false, estilo, texto = "Cancelar" }: ButtonConfirmCancelProps) {
  return (
    <button
      type="button"
      className={`${style.base} ${style.secondary} ${estilo ?? ""}`}
      onClick={AoClicar}
      disabled={desativar}
    >
      {texto}
    </button>
  );
}
