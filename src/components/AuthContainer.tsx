"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/componente.module.css";
import FormLogin from "./login/FormLogin";
import FormCadastroUsuario from "./cadastro/FormCadastroUsuario";
import Botao from "./button/button";
import ModalAlerta from "./modal/modalAlerta";
import BotaoRota from "./button/buttonRouter";


// Hook para detectar se é mobile
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function ContainerAutenticacao() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [mensagem,setMensagem] = useState("");
  const abrirAlerta = () => setIsAlertOpen(true);
  const fecharAlerta = () => {
    setIsAlertOpen(false);
    setIsLogin(true);
  }

  const isMobile = useIsMobile();

  // Componente interno para mobile
  const AuthMobile = () => (
    <div className={styles.mobileContainer}>
      <h2>Bem-vindo</h2>
      <p>Escolha uma opção:</p>
      <BotaoRota texto="Login"  estilo={styles.button} rota="/login"/>
      <BotaoRota texto="Cadastrar"  estilo={styles.button} rota="/cadastro"/>
    </div>
  );

  // Componente interno para desktop
  const AuthDesktop = () => (
    <div
      className={`${styles.container} ${!isLogin ? styles.showRegister : ""} ${isAlertOpen ? styles.modalOpen : ""}`}
    >
      <div className={styles.formContainer}>
        {/* Formulários */}
        <div className={`${styles.form} ${styles.loginForm}`}>
          <FormLogin />
        </div>
        <div className={`${styles.form} ${styles.registerForm}`}>
          <FormCadastroUsuario mensagem={setMensagem} abrirModalExterno={abrirAlerta} />
        </div>

        {/* Overlay de texto */}
        <div className={styles.panelOverlay}>
          <h2>{isLogin ? "Olá, novo usuário!" : "Bem-vindo de volta!"}</h2>
          <p>
            {isLogin
              ? "Clique abaixo para criar sua conta rapidamente."
              : "Faça login para continuar usando nossos serviços."}
          </p>
          <Botao estilo={styles.button} AoClicar={() => setIsLogin(!isLogin)}>
            {isLogin ? "Cadastrar" : "Login"}
          </Botao>
        </div>
      </div>

      <ModalAlerta
        aberto={isAlertOpen}
        titulo="Atenção"
        mensagem={mensagem}
        aoFechar={fecharAlerta}
        textoConfirmar="Entendi"
      />
    </div>
  );

  return isMobile ? <AuthMobile /> : <AuthDesktop />;
}
