export interface ModalProps {
  isOpen: boolean;              // controla se o modal está visível
  title?: string;               // título do modal
  description?: string;         // descrição ou mensagem
  onConfirm?: () => void;       // callback do botão Confirmar
  onCancel?: () => void;        // callback do botão Cancelar
  confirmText?: string;         // texto do botão Confirmar
  cancelText?: string;          // texto do botão Cancelar
}

export interface ModalAlertProps {
  isOpen: boolean;            // controla se o modal está visível
  title?: string;             // título do alerta
  message: string;            // mensagem do alerta
  onClose?: () => void;       // callback quando o usuário fechar o modal
  confirmText?: string;       // texto do botão confirmar
}
