"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/componente.module.css";
import LoginForm from "./login/FormLogin";
import RegisterForm from "./cadastro/FormCadastroUsuario";
import Botao from "./button/button";
import ModalAlerta from "./modal/modalAlerta";

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

export default function AuthContainer() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const abrirAlerta = () => setIsAlertOpen(true);
  const fecharAlerta = () => {
    setIsAlertOpen(false);
    setIsLogin(true);
  }
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useIsMobile();
  const router = useRouter();

  // Componente interno para mobile
  const AuthMobile = () => (
    <div className={styles.mobileContainer}>
      <h2>Bem-vindo</h2>
      <p>Escolha uma opção:</p>
      <button className={styles.button} onClick={() => router.push("/login")}>
        Login
      </button>
      <button className={styles.button} onClick={() => router.push("/cadastro")}>
        Cadastrar
      </button>
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
          <LoginForm />
        </div>
        <div className={`${styles.form} ${styles.registerForm}`}>
          <RegisterForm abrirModal={abrirAlerta} />
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
        isOpen={isAlertOpen}
        title="Atenção"
        message="Seu cadastro foi enviado com sucesso!, aguarde a aprovação do seu cadastro."
        onClose={fecharAlerta}
        confirmText="Entendi"
      />
    </div>
  );

  return isMobile ? <AuthMobile /> : <AuthDesktop />;
}
