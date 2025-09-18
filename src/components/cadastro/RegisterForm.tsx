"use client";
import styles from "@/styles/componente.module.css";
import { useEffect, useState } from "react";
import Select from "../Select/select";
import Input from "../input/input";

export default function RegisterForm() {
  const [area, setArea] = useState("");
  const [cargo, setCargo] = useState("");
  
  return (
    <div className={styles.form}>
      <h2>Cadastrar</h2>

      <Input estilo={`${styles.inputTop}`} id="codigo" type="text" label="Código de membro" required value="" AtualizarEstado={() => {}}/>

      <Input id="nome" type="text" label="nome" required value="" AtualizarEstado={() => {}}/>

      <Input id="email" label="E-mail Aiesec" type="email" required value="" AtualizarEstado={() => {}}/>

      <Input id="senha" label="senha" type="password" required value="" AtualizarEstado={() => {}} />

      <Select value= {area} AtualizarEstado={(e) => setArea(e.target.value)}  id="areas" label="Areas" values={["OGV", "IGV", "B2B", "B2C", "OGT", "IGT", "PM", "F&L", "LCP"]} labels={["OGV", "IGV", "B2B", "B2C", "OGT", "IGT", "PM", "F&L", "LCP"]} />

      <Select value={cargo} AtualizarEstado={(e) => setCargo(e.target.value)} id="cargo" label="Cargo" values={["Membro","TL","Manager","VP","LCP"]} labels={["Membro","TL","Manager","VP","LCP"]} />

      <button className={styles.button}>Registrar</button>
    </div>

  );
}
