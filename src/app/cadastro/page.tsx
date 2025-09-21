"use client";
import FormCadastroUsuario from "@/components/cadastro/FormCadastroUsuario";
import Link from 'next/link';
import styles from "@/styles/cadastro.module.css";
import { useEffect, useState } from "react";
import ModalAlerta from "@/components/modal/modalAlerta";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const abrirAlerta = () => setIsAlertOpen(true);
  const fecharAlerta = () => {
    setIsAlertOpen(false);
  }
  const router = useRouter();
  const [renderizar, setRenderizar] = useState(false);
  const [mensagem,setMensagem] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        router.replace("/"); // força redirect
      } else {
        setRenderizar(true);
      }
    };

    handleResize(); // já checa no carregamento
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // depende só do router

  if (!renderizar) return null;
  return (
    <div className={styles.container}>
      <FormCadastroUsuario mensagem={setMensagem} abrirModalExterno={abrirAlerta} />
      já tem uma conta? <Link href="/login">Login</Link>
      <ModalAlerta
        aberto={isAlertOpen}
        titulo="Atenção"
        mensagem={mensagem}
        aoFechar={fecharAlerta}
        textoConfirmar="Entendi"
      />
    </div>
  );
}
