import React from 'react';
import { ITextArea } from './type';


function TextArea({
  value,
  onChange,
  className = '',
  key = '',
  placeholderText = 'search with product name...',
}: ITextArea) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value: currentValue },
    } = e;
    onChange(currentValue);
  };
  return (
    <div className={`my-1 flex w-full flex-col justify-start gap-1 rounded-lg bg-white-100 p-2 ${className}`}>
      <input
        key={key}
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholderText}
        className="focus:border-blue-700 resize-none rounded-none border-none text-sm placeholder:text-[#767D83] focus:outline-none"
      />
     
    </div>
  );
}

export default TextArea;
