"use client";
import { ModalAlertaProps } from "@/types";
import styles from "@/styles/modal.module.css";
import Botao from "../button/button";

export default function ModalAlerta({
  aberto,
  titulo = "Alerta",
  mensagem,
  aoFechar,
  textoConfirmar = "OK",
}: ModalAlertaProps) {
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{titulo}</h2>
        <p className={styles.mensagem}>{mensagem}</p>
        <Botao AoClicar={aoFechar}>{textoConfirmar}</Botao>
      </div>
    </div>
  );
}
