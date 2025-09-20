export interface ModalProps {
  isOpen: boolean;              // controla se o modal está visível
  title?: string;               // título do modal
  description?: string;         // descrição ou mensagem
  onConfirm?: () => void;       // callback do botão Confirmar
  onCancel?: () => void;        // callback do botão Cancelar
  confirmText?: string;         // texto do botão Confirmar
  cancelText?: string;          // texto do botão Cancelar
}
