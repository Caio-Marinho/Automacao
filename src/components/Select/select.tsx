"use client";
import stylesGlobal from "@/styles/componente.module.css";

interface opcao {
  texto: string;
  valor: string;
}

interface SelectProps {
  id: string;
  texto: string;
  opcaoes: opcao[]; // lista de objetos { label, value }
  obrigatorio?: boolean;
  valor: string;
  AtualizarEstado: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ 
  id, 
  texto, 
  opcaoes, 
  obrigatorio = false, 
  AtualizarEstado, 
  valor 
}) => {
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
