"use client";
import stylesGlobal from "@/styles/componente.module.css";
import styleLocal from "./input.module.css";

interface InputProps {
  id: string;
  texto: string;
  legenda?: string;
  obrigatorio?: boolean;
  valor: string;
  estilo?:string; 
  AtualizarEstado: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputEmail({
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
