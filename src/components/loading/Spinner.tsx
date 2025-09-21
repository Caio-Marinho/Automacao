"use client";
import styles from "./loadingSpinner.module.css";
import ReactDOM from "react-dom";

interface LoadingSpinnerProps {
  aberto: boolean;
  texto:string
}

export default function LoadingSpinner({ aberto,texto }: LoadingSpinnerProps) {
  if (!aberto) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.texto}>{texto}</p>
    </div>,
    document.getElementById("modal-root")!
  );
}
