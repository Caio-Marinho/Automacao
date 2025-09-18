"use client";
import styles from "@/styles/componente.module.css";
import Input from "../input/input";

export default function LoginForm() {
  return (
     <div className={styles.form}>
      <h2>Login</h2>

      <Input estilo={`${styles.inputTop}`} id="email" type="text" label="E-mail Aiesec" required value="" AtualizarEstado={() => {}}/>

      <Input id="senha" label="senha" type="password" required value="" AtualizarEstado={() => {}} />

      <button className={styles.button}>Registrar</button>
    </div>
  );
}
