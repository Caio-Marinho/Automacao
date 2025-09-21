"use client";

import { useRouter } from "next/navigation";
import styles from "./button.module.css"; // CSS Module
import { BotaoRotaProps } from "@/types";


export default function BotaoRota({ texto, rota, estilo }: BotaoRotaProps) {
  const router = useRouter();

  const aoClicar = () => {
    router.push(rota);
  };

  return (
    <button
      onClick={aoClicar}
      className={`${styles.botaoRota} ${estilo || ""}`}
    >
      {texto}
    </button>
  );
}