"use client";
import stylesGlobal from "@/styles/componente.module.css";
import { useState } from "react";
import Select from "../Select/select";
import InputTexto from "../input/inputTexto";
import InputSenha from "../input/inputSenha";
import InputEmail from "../input/inputEmail";
import BotaoConfirm from "../button/buttonConfirm";
import ModalAlertaDinamico from "../modal/modalAlertaDinamico";
import { api } from "@/api/api"
import LoadingSpinner from "../loading/Spinner";

interface FilhoProps {
  abrirModalExterno?: () => void; // opcional
}

export default function FormCadastroUsuario({ abrirModalExterno }: FilhoProps) {
  const [codigo, setCodigo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [area, setArea] = useState("");
  const [cargo, setCargo] = useState("");

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
  ];

  const opcaoesCargo = [
    { valor: "Membro", texto: "Membro" },
    { valor: "TL", texto: "TL" },
    { valor: "Manager", texto: "Manager" },
    { valor: "VP", texto: "VP" },
    { valor: "LCP", texto: "LCP" }
  ];

  const [modalAberto, setModalAberto] = useState(false);
  const [mensagensErro, setMensagensErro] = useState<string[]>([]);
  const [spinnerAberto,setSpinnerAberto] = useState<boolean>(false);
  const validarCadastro = ({
    codigo,
    nome,
    email,
    senha,
    area,
    cargo
  }: {
    codigo: string;
    nome: string;
    email: string;
    senha: string;
    area: string;
    cargo: string;
  }) => {
    const erros: string[] = [];

    // Código: apenas números
    if (!codigo) {
      erros.push("Código não preenchido");
    } else if (!/^\d+$/.test(codigo)) {
      erros.push("Código deve conter apenas números");
    }

    // Validação de nome
    if (!nome) {
      erros.push("Nome não preenchido");
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
      erros.push("Nome deve conter apenas letras");
    } else if (nome.trim().split(/\s+/).length < 2) {
      erros.push("Informe nome e sobrenome");
    }

    // Email: domínio específico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@aiesec\.org\.br$/;
    if (!emailRegex.test(email)) erros.push("Email deve ser do domínio @aiesec.org.br");

    // Senha - requisitos separados
    if (senha.length < 8) erros.push("Senha deve ter ao menos 8 caracteres");
    if (!/[A-Z]/.test(senha)) erros.push("Senha deve conter pelo menos 1 letra maiúscula");
    if (!/[a-z]/.test(senha)) erros.push("Senha deve conter pelo menos 1 letra minúscula");
    if (!/\d/.test(senha)) erros.push("Senha deve conter pelo menos 1 número");
    if (!/[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]/.test(senha))
      erros.push("Senha deve conter pelo menos 1 caractere especial");

    // Área
    const areasValidas = ["OGV", "IGV", "B2B", "B2C", "OGT", "IGT", "PM", "F&L", "LCP"];
    if (!area || !areasValidas.includes(area)) erros.push("Área não selecionada ou inválida");

    // Cargo
    const cargosValidos = ["Membro", "TL", "Manager", "VP", "LCP"];
    if (!cargo || !cargosValidos.includes(cargo)) erros.push("Cargo não selecionado ou inválido");

    return erros;
  };

  async function loginExiste(login: string): Promise<boolean> {
    try {
      const response = await api.post("/verificarLogin", { login:login });
      // Supõe que o backend retorna { existe: true/false }
      return response.data.existe;
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      return true; // assume que existe em caso de erro
    }
  }

  async function gerarLogin(nomeCompleto: string): Promise<string> {
    const conectores = ["da", "de", "do", "dos", "das", "e"];

    const partes = nomeCompleto
      .trim()
      .split(/\s+/)
      .filter(p => !conectores.includes(p.toLowerCase()))
      .map(p => p.toLowerCase());

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

    // 1️⃣ Ordem normal
    let login = await tentarOrdem(partes, partes);
    if (login) return login;

    // 2️⃣ Ordem inversa
    const partesInvertidas = [...partes].reverse();
    login = await tentarOrdem(partesInvertidas, partesInvertidas);
    if (login) return login;

    // 3️⃣ Se não encontrou, adiciona números sequenciais
    let contador = 1;
    while (true) {
      login = await tentarOrdem(partes, partes);
      if (login) return login.includes(`${contador}`) ? login : `${login}${contador}`;
      login = await tentarOrdem(partesInvertidas, partesInvertidas);
      if (login) return login.includes(`${contador}`) ? login : `${login}${contador}`;
      contador++;
    }
  }
  const cadastrar = async () => {
    setSpinnerAberto(true);
    const erros = validarCadastro({ codigo, nome, email, senha, area, cargo });
    if (erros.length > 0) {
      setMensagensErro(erros);
      setModalAberto(true);
      setSpinnerAberto(false);
    } else {
      const login =  await gerarLogin(nome)
      const dados = {
        codigo:codigo,
        nome:nome,
        senha:senha,
        login:login,
        email:email,
        area:area,
        cargo:cargo,
      }
      setSpinnerAberto(false);
      console.log(dados)
      // Se tudo correto, chama o modal externo ou envia os dados
      if (abrirModalExterno) abrirModalExterno();
    }
  };

  return (
    <div className={stylesGlobal.form}>
      <h2 className={stylesGlobal.tituloCadastro}>Cadastrar</h2>

      <div className={stylesGlobal.gridCadastro}>
        <InputTexto id="codigo" texto="Código de membro" obrigatorio valor={codigo} AtualizarEstado={(e) => setCodigo(e.target.value)} />
        <InputTexto id="nome" texto="Nome Completo" obrigatorio valor={nome} AtualizarEstado={(e) => setNome(e.target.value)} />
        <InputEmail id="email" texto="Email" obrigatorio valor={email} AtualizarEstado={(e) => setEmail(e.target.value)} />
        <InputSenha id="senha" texto="Senha" obrigatorio valor={senha} AtualizarEstado={(e) => setSenha(e.target.value)} />
        <Select valor={area} AtualizarEstado={(e) => setArea(e.target.value)} id="areas" texto="Área" obrigatorio opcaoes={opcaoesAreas} />
        <Select valor={cargo} AtualizarEstado={(e) => setCargo(e.target.value)} id="cargo" texto="Cargo" obrigatorio opcaoes={opcaoesCargo} />
      </div>

      <BotaoConfirm texto="Cadastrar" AoClicar={cadastrar} estilo={stylesGlobal.button} />

      <ModalAlertaDinamico
        aberto={modalAberto}
        titulo="Erros no cadastro"
        mensagens={mensagensErro}
        aoFechar={() => setModalAberto(false)}
      />
      <LoadingSpinner texto="Carregando..." aberto={spinnerAberto}/>
    </div>
  );
}
