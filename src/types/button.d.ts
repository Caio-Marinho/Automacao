import { ReactNode } from "react";

export interface ButtonProps {
  estilo?: string;
  AoClicar?: () => void;
  children: ReactNode;
  tipo?: "button" | "submit" | "reset"; // opcional, caso use em forms
}

export interface ButtonConfirmCancelProps {
  AoClicar?: () => void;
  desativar?: boolean;
  estilo?: string;
  texto?: string; // permite personalizar o texto
}
