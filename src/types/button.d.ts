import { ReactNode } from "react";

export interface BotaoProps {
  estilo?: string;
  AoClicar?: () => void;
  children: ReactNode;
  tipo?: "button" | "submit" | "reset"; // opcional, caso use em forms
}

export interface BotaoConfirmarCancelarProps {
  AoClicar?: () => void;
  desativar?: boolean;
  estilo?: string;
  texto?: string; // permite personalizar o texto
}

export interface BotaoLinkProps {
  irPara: string;
  children: ReactNode;
}
