"use client";
import stylesGlobal from "@/styles/componente.module.css";
import InputTexto from "../input/inputTexto";
import InputSenha from "../input/inputSenha";

export default function LoginForm() {
  return (
     <div className={stylesGlobal.form}>
      <h2>Login</h2>

      <InputTexto estilo={`${stylesGlobal.inputTop}`} id="email" texto="E-mail Aiesec" obrigatorio valor="" AtualizarEstado={() => {}}/>

      <InputSenha id="senha" texto="senha" obrigatorio valor="" AtualizarEstado={() => {}} />

      <button className={stylesGlobal.button}>Registrar</button>
    </div>
  );
}
