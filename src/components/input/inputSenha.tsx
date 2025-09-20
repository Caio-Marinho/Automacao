"use client";
import { useState } from "react";
import stylesGlobal from "@/styles/componente.module.css";
import styleLocal from "./input.module.css";
import { Eye, EyeOff } from "lucide-react";
import { EntradaProps } from "@/types";

export default function InputSenha({
    id,
    texto,
    legenda = " ",
    obrigatorio = false,
    valor,
    AtualizarEstado,
    estilo
}: EntradaProps) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <div className={`${stylesGlobal.inputGroup} ${estilo}`}>
            <div className={styleLocal.inputWrapper}>
                <input
                    type={mostrarSenha ? "text" : "password"}
                    id={id}
                    placeholder={legenda}   // ⚠️ espaço vazio, necessário pro floating label
                    required={obrigatorio}
                    value={valor}
                    onChange={AtualizarEstado}
                />
                <label htmlFor={id}>
                    {texto} {obrigatorio && <span className={styleLocal.span}>*</span>}
                </label>
                <button
                    type="button"
                    className={styleLocal.eyeButton}
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                    {mostrarSenha ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
            </div>
        </div>
    );
}
