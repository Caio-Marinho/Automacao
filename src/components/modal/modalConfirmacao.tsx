"use client";
import { ModalProps } from "@/types";
import BotaoConfirm from "../button/buttonConfirm";
import BotaoCancelar from "../button/buttonCancel";
import styles from "./modal.module.css";

export default function Modal({
  aberto,
  titulo = "Confirmação",
  descricao = "Deseja realmente continuar?",
  aoConfirmar,
  aoCancelar,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar"
}: ModalProps) {
  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={aoCancelar}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>{titulo}</h2>
        <p>{descricao}</p>
        <div className={styles.modalButtons}>
          <BotaoCancelar AoClicar={aoCancelar} texto={textoCancelar} />
          <BotaoConfirm AoClicar={aoConfirmar} texto={textoConfirmar} />
        </div>
      </div>
    </div>
  );
}
