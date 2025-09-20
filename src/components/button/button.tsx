"use client";
import { ButtonProps } from "@/types";

export default function Botao({ estilo, AoClicar, children, tipo = "button" }: ButtonProps) {
  return (
    <button
      className={estilo}
      onClick={AoClicar}
      type={tipo}
    >
      {children}
    </button>
  );
}
