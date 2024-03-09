import React from "react";
import { IButton } from './types'

const constructStyles = ({
  variant = "filled",
  disabled = false,
  code = "primary",
  size = "sm",
}: Partial<IButton>) => {
  const pad = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  };
  const common = `text-center ${
    pad[size || "md"]
  } font-normal text-base cursor-pointer focus:outline-none outline-none`;
  const button_variants = {
    primary: {
      filled: "bg-[#1a73e8] text-[#fff] rounded border-1 border-[#1a73e8]",
      outlined:
        "border border-1 rounded border-[#1a73e8] bg-[#fff] text-[#1a73e8]",
      ghost:
        "border-none bg-[#fff] text-[#1a73e8] hover:underline hover:underline-offset-8 hover:decoration-[#1a73e8]",
    },
    danger: {
      filled: "bg-red-400 text-red-200 rounded border-1 border-red-400",
      outlined: "border border-1 rounded border-red-400 bg-[#fff] text-red-400",
      ghost:
        "border-none bg-[#fff] text-red-400 hover:underline hover:underline-offset-8 hover:decoration-red-400",
    },
    success: {
      filled:
        "bg-emerald-400 text-emerald-200 rounded border-1 border-emerald-400",
      outlined:
        "border border-1 rounded border-emerald-400 bg-[#fff] text-emerald-400",
      ghost:
        "border-none bg-[#fff] text-emerald-400 hover:underline hover:underline-offset-8 hover:decoration-emerald-400",
    },
  };

  return `${button_variants[code][variant]} ${common} ${
    disabled ? "backdrop-blur-md cursor-not-allowed" : "opacity-100"
  }`;
};
function Button(props: IButton) {
  return (
    <div className="h-full w-full">
      <button
        className={constructStyles(props)}
        disabled={props.disabled}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
        tabIndex={-1}
        type="button"
      >
        <div className="flex justify-center items-center gap-1">
          {props.label && <div className="text-sm">{props.label}</div>}
          {props.icon && <img src={props.icon} height={15} width={15} alt="btn-icon"/>}
        </div>
      </button>
    </div>
  );
}

export default Button;