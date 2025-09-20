interface opcao {
  texto: string;
  valor: string;
}

export interface SelectProps {
  id: string;
  texto: string;
  opcaoes: opcao[]; // lista de objetos { label, value }
  obrigatorio?: boolean;
  valor: string;
  AtualizarEstado: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}