 export interface InputProps {
    id: string;
    texto: string;
    legenda?: string;
    obrigatorio?: boolean;
    valor: string;
    estilo?: string;
    AtualizarEstado: (e: React.ChangeEvent<HTMLInputElement>) => void;
}