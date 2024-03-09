export interface ITextArea {
    showCharCount?: boolean;
    onChange: (value: string) => void;
    value: string;
    className?: string;
    key?: string;
    placeholderText?: string;
  }