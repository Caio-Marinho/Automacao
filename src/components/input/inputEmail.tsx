"use client";
import stylesGlobal from "@/styles/componente.module.css";
import styleLocal from "@/styles/input.module.css";
import { EntradaProps } from "@/types";

export default function InputEmail({
  id,
  texto,
  legenda = " ",
  obrigatorio = false,
  valor,
  AtualizarEstado,
  estilo
}: EntradaProps) {
  return (
    <div className={`${stylesGlobal.inputGroup} ${estilo}`}>
      <input
        type="email"
        id={id}
        placeholder={legenda}
        required={obrigatorio}
        value={valor}
        onChange={AtualizarEstado}
      />
      <label htmlFor={id}>
        {texto} {obrigatorio && <span className={styleLocal.span}>*</span>}
      </label>
    </div>
  );
}
