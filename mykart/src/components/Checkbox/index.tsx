import React from "react";
import { ICheckbox } from "./type";

function Checkbox({ label, id, onChecked, isChecked, className }: ICheckbox) {
  return (
    <div
      className={`flex justify-start items-center gap-2 h-full w-full cursor-pointer ${className}`}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="checkbox"
        id={id}
        className="h-3 w-3 accent-emerald-400 text-[#fff] border border-slate-200 rounded focus:border-blue-700 outline-none"
        onChange={(e) => {
          onChecked(e.target.checked);
        }}
        value={isChecked.toString()}
        checked={isChecked}
      />
    </div>
  );
}

export default Checkbox;
