"use client";
import { ModalAlertProps } from "@/types";
import styles from "./modal.module.css";
import Botao from "../button/button";

export default function ModalAlert({
  isOpen,
  title = "Alerta",
  message,
  onClose,
  confirmText = "OK"
}: ModalAlertProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <Botao AoClicar={onClose}>{confirmText}</Botao>
      </div>
    </div>
  );
}
