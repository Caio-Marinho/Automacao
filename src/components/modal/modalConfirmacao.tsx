"use client";
import { ModalProps } from "@/types/modal";
import BotaoConfirm from "../button/buttonConfirm";
import BotaoCancelar from "../button/buttonCancel";
import styles from "./modal.module.css";

export default function Modal({
  isOpen,
  title = "Confirmação",
  description = "Deseja realmente continuar?",
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.modalButtons}>
          <BotaoCancelar AoClicar={onCancel} texto={cancelText} />
          <BotaoConfirm AoClicar={onConfirm} texto={confirmText} />
        </div>
      </div>
    </div>
  );
}
