"use client";

import stylesGlobal from "@/styles/componente.module.css";
import { useState } from "react";
import Select from "../Select/select";
import InputTexto from "../input/inputTexto";
import InputSenha from "../input/inputSenha";
import InputEmail from "../input/inputEmail";
import BotaoConfirm from "../button/buttonConfirm";
import ModalAlertaDinamico from "../modal/modalAlertaDinamico";
import LoadingSpinner from "../loading/Spinner";
import { apiLocal } from "@/app/api/apiLocal";

interface FilhoProps {
  abrirModalExterno?: () => void;
  mensagem: (msg: string) => void; // função para atualizar mensagem;
}

interface FormState {
  codigo: string;
  nome: string;
  email: string;
  senha: string;
  area: string;
  cargo: string;
  login?: string;
}

export default function FormCadastroUsuario({ abrirModalExterno,mensagem }: FilhoProps) {
  const [form, setForm] = useState<FormState>({
    codigo: "",
    nome: "",
    email: "",
    senha: "",
    area: "",
    cargo: "",
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [mensagensErro, setMensagensErro] = useState<string[]>([]);
  const [spinnerAberto, setSpinnerAberto] = useState(false);

  const opcaoesAreas = [
    { valor: "OGV", texto: "OGV" },
    { valor: "IGV", texto: "IGV" },
    { valor: "B2B", texto: "B2B" },
    { valor: "B2C", texto: "B2C" },
    { valor: "OGT", texto: "OGT" },
    { valor: "IGT", texto: "IGT" },
    { valor: "PM", texto: "PM" },
    { valor: "F&L", texto: "F&L" },
    { valor: "EB", texto: "EB" },
  ];

  const opcaoesCargo = [
    { valor: "Membro", texto: "Membro" },
    { valor: "TL", texto: "TL" },
    { valor: "Manager", texto: "Manager" },
    { valor: "Director", texto: "Director" },
    { valor: "VP", texto: "VP" },
    { valor: "LCP", texto: "LCP" },
  ];

  // ================= Validação =================
  const validarCadastro = (data: FormState) => {
    const erros: string[] = [];

    if (!data.codigo) erros.push("Código não preenchido");
    else if (!/^\d+$/.test(data.codigo)) erros.push("Código deve conter apenas números");

    if (!data.nome) erros.push("Nome não preenchido");
    else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(data.nome)) erros.push("Nome deve conter apenas letras");
    else if (data.nome.trim().split(/\s+/).length < 2) erros.push("Informe nome e sobrenome");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@aiesec\.org\.br$/;
    if (!emailRegex.test(data.email)) erros.push("Email deve ser do domínio @aiesec.org.br");

    if (data.senha.length < 8) erros.push("Senha deve ter ao menos 8 caracteres");
    if (!/[A-Z]/.test(data.senha)) erros.push("Senha deve conter pelo menos 1 letra maiúscula");
    if (!/[a-z]/.test(data.senha)) erros.push("Senha deve conter pelo menos 1 letra minúscula");
    if (!/\d/.test(data.senha)) erros.push("Senha deve conter pelo menos 1 número");
    if (!/[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]/.test(data.senha))
      erros.push("Senha deve conter pelo menos 1 caractere especial");

    if (!data.area || !opcaoesAreas.some((a) => a.valor === data.area)) erros.push("Área não selecionada ou inválida");
    if (!data.cargo || !opcaoesCargo.some((c) => c.valor === data.cargo)) erros.push("Cargo não selecionado ou inválido");

    return erros;
  };

  // ================= Login existente =================
  const loginExiste = async (login: string): Promise<boolean> => {
    try {
      const response = await apiLocal.post("/verificarusers", { login });
      return response.data.existe;
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      return true; // assume que existe em caso de erro
    }
  };

  // ================= Geração de login =================
  const gerarLogin = async (nomeCompleto: string): Promise<string> => {
    const conectores = ["da", "de", "do", "dos", "das", "e"];
    const partes = nomeCompleto
      .trim()
      .split(/\s+/)
      .filter((p) => !conectores.includes(p.toLowerCase()))
      .map((p) => p.toLowerCase());

    const tentarComb = async (p1: string, p2: string, contador?: number) => {
      const base = contador ? `${p1}.${p2}${contador}` : `${p1}.${p2}`;
      const existe = await loginExiste(base);
      return !existe ? base : null;
    };

    const tentarOrdem = async (arr1: string[], arr2: string[]) => {
      for (let i = 0; i < arr1.length; i++) {
        for (let j = arr2.length - 1; j >= 0; j--) {
          if (i === j) continue;
          const login = await tentarComb(arr1[i], arr2[j]);
          if (login) return login;
        }
      }
      return null;
    };

    let login = await tentarOrdem(partes, partes);
    if (login) return login;

    const partesInvertidas = [...partes].reverse();
    login = await tentarOrdem(partesInvertidas, partesInvertidas);
    if (login) return login;

    let contador = 1;
    while (true) {
      login = await tentarOrdem(partes, partes);
      if (login) return `${login}${contador}`;
      login = await tentarOrdem(partesInvertidas, partesInvertidas);
      if (login) return `${login}${contador}`;
      contador++;
    }
  };

  // ================= Cadastrar usuário =================
  const cadastrar = async () => {
    setSpinnerAberto(true);

    const erros = validarCadastro(form);
    if (erros.length > 0) {
      setMensagensErro(erros);
      setModalAberto(true);
      setSpinnerAberto(false);
      return;
    }
    const login = await gerarLogin(form.nome);
    const dados: FormState = { ...form, login };
    try {
      const response: any = await apiLocal.post("/users", dados);
      mensagem(response.data.mensagem);
      setForm({ codigo: "", nome: "", email: "", senha: "", area: "", cargo: "" });
      if (abrirModalExterno){
        abrirModalExterno();
      } 
    } catch (err) {
      console.log(err);
      setMensagensErro(["Erro ao cadastrar usuário. Tente novamente."]);
      setModalAberto(true);
    } finally {
      setSpinnerAberto(false);
    }
  };
  return (
    <div className={stylesGlobal.form}>
      <h2 className={stylesGlobal.tituloCadastro}>Cadastrar</h2>

      <div className={stylesGlobal.gridCadastro}>
        <InputTexto
          id="codigo"
          texto="Código de membro"
          obrigatorio
          valor={form.codigo}
          AtualizarEstado={(e) => setForm({ ...form, codigo: e.target.value })}
        />
        <InputTexto
          id="nome"
          texto="Nome Completo"
          obrigatorio
          valor={form.nome}
          AtualizarEstado={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <InputEmail
          id="email"
          texto="Email"
          obrigatorio
          valor={form.email}
          AtualizarEstado={(e) => setForm({ ...form, email: e.target.value })}
        />
        <InputSenha
          id="senha"
          texto="Senha"
          obrigatorio
          valor={form.senha}
          AtualizarEstado={(e) => setForm({ ...form, senha: e.target.value })}
        />
        <Select
          valor={form.area}
          AtualizarEstado={(e) => setForm({ ...form, area: e.target.value })}
          id="areas"
          texto="Área"
          obrigatorio
          opcaoes={opcaoesAreas}
        />
        <Select
          valor={form.cargo}
          AtualizarEstado={(e) => setForm({ ...form, cargo: e.target.value })}
          id="cargo"
          texto="Cargo"
          obrigatorio
          opcaoes={opcaoesCargo}
        />
      </div>

      <BotaoConfirm texto="Cadastrar" AoClicar={cadastrar} estilo={stylesGlobal.button} />

      <ModalAlertaDinamico
        aberto={modalAberto}
        titulo={"Erros no cadastro"}
        mensagens={mensagensErro}
        aoFechar={() => setModalAberto(false)}
      />

      <LoadingSpinner texto="Carregando..." aberto={spinnerAberto} />
    </div>
  );
}
