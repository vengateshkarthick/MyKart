import React from "react";
import closeIcon from "../../assets/close.svg";
import { IModal } from "./type";
import Button from "../Button";

function ConfirmationModal({
  header,
  subText,
  onClose,
  handleConfirm,
  open,
}: IModal) {
  return (
    open && (
      <div role="dialog" className="transition-all z-20 border rounded shadow-xl relative flex m-auto gap-4 p-4 items-center justify-start h-auto w-[450px] bg-[#fff]">
        <button type="button" onClick={onClose}>
          <img
            src={closeIcon}
            alt="close"
            className="absolute right-4 top-4 hover:bg-slate-100"
          />
        </button>
        <div className="text-sm font-[500]">{header}</div>
        {subText && <div className="text-slate-400 text-sm">{subText}</div>}
        <div className="bottom-0 flex justify-end gap-2 w-full">
          <Button
            code="danger"
            variant="outlined"
            onClick={handleConfirm}
            label="Confirm"
          />
        </div>
      </div>
    )
  );
}

export default ConfirmationModal;
