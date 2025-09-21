"use client";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import styles from "@/styles/modal.module.css";
import { ModalAlertaDinamicoProps } from "@/types";

export default function ModalAlertaDinamico({ aberto, titulo, mensagens, aoFechar }: ModalAlertaDinamicoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // garante que o portal só roda no client
  }, []);

  if (!aberto || !mounted) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{titulo}</h3>
          <button className={styles.closeButton} onClick={aoFechar} aria-label="Fechar modal">
            <X size={18} />
          </button>
        </div>
        <div className={styles.body}>
          <ul>
            {mensagens.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
