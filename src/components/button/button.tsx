"use client";
import { BotaoProps } from "@/types";
import styles from "@/styles/button.module.css";

export default function Botao({ estilo, AoClicar, children, tipo = "button" }: BotaoProps) {
  return (
    <button
      className={`${styles.botao} ${estilo}`}
      onClick={AoClicar}
      type={tipo}
    >
      {children}
    </button>
  );
}
