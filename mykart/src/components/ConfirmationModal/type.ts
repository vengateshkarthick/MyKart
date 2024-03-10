//TODO: need to configure actionItems with handlers and label 

export interface IModal {
  handleConfirm: () => void;
  header: string;
  subText?: string;
  onClose: () => void;
  open: boolean;
}
