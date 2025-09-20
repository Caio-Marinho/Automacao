"use client";
import stylesGlobal from "@/styles/componente.module.css";
import { useState } from "react";
import Select from "../Select/select";
import InputTexto from "../input/inputTexto";
import InputSenha from "../input/inputSenha";
import InputEmail from "../input/inputEmail";
import BotaoConfirm from "../button/buttonConfirm";

export default function RegisterForm() {
  const [codigo, setCodigo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");

  const opcaoesAreas = [
    { valor: "OGV", texto: "OGV" },
    { valor: "IGV", texto: "IGV" },
    { valor: "B2B", texto: "B2B" },
    { valor: "B2C", texto: "B2C" },
    { valor: "OGT", texto: "OGT" },
    { valor: "IGT", texto: "IGT" },
    { valor: "PM", texto: "PM" },
    { valor: "F&L", texto: "F&L" },
    { valor: "LCP", texto: "LCP" }
  ]

  const opcaoesCargo = [
    { valor: "Membro", texto: "Membro" },
    { valor: "TL", texto: "TL" },
    { valor: "Manager", texto: "Manager" },
    { valor: "VP", texto: "VP" },
    { valor: "LCP", texto: "LCP" }
  ]

  return (
    <div className={stylesGlobal.form}>
      <h2>Cadastrar</h2>

      <InputTexto estilo={`${stylesGlobal.inputTop}`} id="codigo" texto="Código de membro" obrigatorio valor={codigo} AtualizarEstado={(e) => { setCodigo(e.target.value) }} />

      <InputTexto id="nome" texto="nome" obrigatorio valor={nome} AtualizarEstado={(e) => { setNome(e.target.value) }} />

      <InputEmail id="email" texto="email" obrigatorio valor={email} AtualizarEstado={(e) => { setEmail(e.target.value) }} />

      <InputSenha id="senha" texto="senha" obrigatorio valor={senha} AtualizarEstado={(e) => { setSenha(e.target.value) }} />

      <Select valor={area} AtualizarEstado={(e) => setArea(e.target.value)} id="areas" texto="Areas" obrigatorio opcaoes={opcaoesAreas} />

      <Select valor={cargo} AtualizarEstado={(e) => setCargo(e.target.value)} id="cargo" texto="Cargo" obrigatorio opcaoes={opcaoesCargo} />

      <BotaoConfirm texto="Cadastrar" AoClicar={() => {}} estilo={stylesGlobal.button} />
    </div>

  );
}
