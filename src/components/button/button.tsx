"use client";
import { ButtonProps } from "@/types";
import styles from "./button.module.css";

export default function Botao({ estilo, AoClicar, children, tipo = "button" }: ButtonProps) {
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
