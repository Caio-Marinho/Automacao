"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormLogin from "@/components/login/FormLogin";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [renderizar, setRenderizar] = useState(false);

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
      <FormLogin />
      <p>
        Não tem acesso? <Link href="/cadastro">Cadastrar</Link>
      </p>
    </div>
  );
}
