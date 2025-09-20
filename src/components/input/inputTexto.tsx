"use client";
import stylesGlobal from "@/styles/componente.module.css";
import styleLocal from "./input.module.css";
import { InputProps } from "@/types";

export default function InputTexto({
  id,
  texto,
  legenda = " ",
  obrigatorio = false,
  valor,
  AtualizarEstado,
  estilo
}: InputProps) {
  return (
    <div className={`${stylesGlobal.inputGroup} ${estilo}`}>
      <input
        type="text"
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
