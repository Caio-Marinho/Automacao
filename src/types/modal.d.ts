export interface ModalProps {
  aberto: boolean;              // controla se o modal está visível
  titulo?: string;               // título do modal
  descricao?: string;           // descrição ou mensagem
  aoConfirmar?: () => void;     // callback do botão Confirmar
  aoCancelar?: () => void;      // callback do botão Cancelar
  textoConfirmar?: string;      // texto do botão Confirmar
  textoCancelar?: string;       // texto do botão Cancelar
}

export interface ModalAlertaProps {
  aberto: boolean;            // controla se o modal está visível
  titulo?: string;            // título do alerta
  mensagem: string;           // mensagem do alerta
  aoFechar?: () => void;      // callback quando o usuário fechar o modal
  textoConfirmar?: string;    // texto do botão confirmar
}
