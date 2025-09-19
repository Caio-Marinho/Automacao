"use client";
import stylesGlobal from "@/styles/componente.module.css";
import { useEffect, useState } from "react";
import Select from "../Select/select";
import Input from "../input/input";

export default function RegisterForm() {
  const [area, setArea] = useState("");
  const [cargo, setCargo] = useState("");
  
  const opcaoesAreas =[
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

  const opcaoesCargo =[
    { valor: "Membro", texto: "Membro" },
    { valor: "TL", texto: "TL" },
    { valor: "Manager", texto: "Manager" },
    { valor: "VP", texto: "VP" },
    { valor: "LCP", texto: "LCP" }
  ]
  
  return (
    <div className={stylesGlobal.form}>
      <h2>Cadastrar</h2>

      <Input estilo={`${stylesGlobal.inputTop}`} id="codigo" tipo="text" texto="Código de membro" obrigatorio valor="" AtualizarEstado={() => {}}/>

      <Input id="nome" tipo="text" texto="nome" obrigatorio valor="" AtualizarEstado={() => {}}/>

      <Input id="email" tipo="E-mail Aiesec" texto="email" obrigatorio valor="" AtualizarEstado={() => {}}/>

      <Input id="senha" tipo="senha" texto="password" obrigatorio valor="" AtualizarEstado={() => {}} />

      <Select valor={area}  AtualizarEstado={(e) => setArea(e.target.value)}  id="areas" texto="Areas" obrigatorio opcaoes={opcaoesAreas} />

      <Select valor={cargo} AtualizarEstado={(e) => setCargo(e.target.value)} id="cargo" texto="Cargo" obrigatorio opcaoes={opcaoesCargo}/>

      <button className={stylesGlobal.button}>Cadastrar</button>
    </div>

  );
}
