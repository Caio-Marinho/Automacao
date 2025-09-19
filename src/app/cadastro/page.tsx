import RegisterForm from "@/components/cadastro/FormCadastroUsuario";
import Link from 'next/link';
import styles from "./cadastro.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm/>
      já tem uma conta? <Link href="/login">Login</Link>
    </div>
  );
}
