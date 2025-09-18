"use client";
import styles from "@/styles/componente.module.css";

interface InputProps {
  type: string;
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  estilo?:string; 
  AtualizarEstado: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  id,
  label,
  placeholder = " ",
  required = false,
  value,
  AtualizarEstado,
  estilo
}: InputProps) {
  return (
    <div className={`${styles.inputGroup} ${estilo}`}>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={AtualizarEstado}
      />
      <label htmlFor={id}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
    </div>
  );
}
