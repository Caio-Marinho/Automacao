"use client";
import stylesGlobal from "@/styles/componente.module.css";
import Input from "../input/input";

export default function LoginForm() {
  return (
     <div className={stylesGlobal.form}>
      <h2>Login</h2>

      <Input estilo={`${stylesGlobal.inputTop}`} id="email" tipo="text" texto="E-mail Aiesec" obrigatorio valor="" AtualizarEstado={() => {}}/>

      <Input id="senha" texto="senha" tipo="password" obrigatorio valor="" AtualizarEstado={() => {}} />

      <button className={stylesGlobal.button}>Registrar</button>
    </div>
  );
}
