"use client";
import stylesGlobal from "@/styles/componente.module.css";
import { SelectProps } from "@/types";

const Select = ({ 
  id, 
  texto, 
  opcaoes, 
  obrigatorio = false, 
  AtualizarEstado, 
  valor 
}:SelectProps) => {
  return (
    <div className={stylesGlobal.inputGroup}>
      <select
        id={id}
        required={obrigatorio}
        value={valor}
        onChange={AtualizarEstado}
        aria-label={texto}
      >
        <option value="" disabled>
          {texto}{obrigatorio ? " *" : ""}
        </option>

        {opcaoes.map((opt) => (
          <option key={opt.valor} value={opt.valor}>
            {opt.texto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
