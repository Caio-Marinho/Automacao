interface Opcao {
  texto: string;
  valor: string;
}

export interface SelecaoProps {
  id: string;
  texto: string;
  opcaoes: Opcao[]; // lista de objetos { label, value }
  obrigatorio?: boolean;
  valor: string;
  AtualizarEstado: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}