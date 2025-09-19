import LoginForm from "@/components/login/FormLogin";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div>
      <LoginForm/>
      não tem acesso? <Link href="/cadastro">Cadastrar</Link>
    </div>
  );
}
