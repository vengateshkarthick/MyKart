

import React, { useRef, useState } from 'react';
import dropdownIcon from '../../assets/dropdown.svg';
import { IDropdown } from './types';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { conjuctStrings } from '../../shared/display';
import useOutsideClickHandler from '../../shared/hooks/useOutsideHandler';


function Dropdown ({ selected, options, onSelect, isMultiSelect = false, label }: IDropdown) {
  const [selectedOption, setSelectedOption] = useState<{ id: string, label: string }[]>(() => selected || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
 
  const handleOptionClick = (option: IDropdown['options'][0], isChecked: boolean) => {
    let opt = [...selectedOption];
    if (isChecked)  {
      opt?.push(option)
    }
    else {
      opt = opt?.filter(({ id }) => option.id === id);
    }
    setSelectedOption(() => opt);
    if (!isMultiSelect) {
       setIsDropdownOpen(!isDropdownOpen);
    }
  };


  React.useEffect(() => {
    if(!isDropdownOpen) {
      onSelect(selectedOption);
    }
  }, [isDropdownOpen, selectedOption])

  
  const optionsLabel = options.map(item => item.label);

  // closing the dropdown once clicked outside the component
  useOutsideClickHandler(ref, () =>  isMultiSelect && setIsDropdownOpen(false));

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {label && <div className="text-sm font-normal w-full font-[Poppins]">{label}</div>}
      <div className="h-6 w-10">
        <Button 
          label={ conjuctStrings(optionsLabel) || "Select Option"}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          icon={dropdownIcon}
          variant="ghost"
          code="primary"
        />
      </div>

      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
        >
          <div className="py-1 relative" role="none"> 
            {options.map((option) => (
              <Checkbox 
                 label={option.label}
                 className="relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                 onChecked={(isChecked) => handleOptionClick(option, isChecked)}
                 isChecked={!!selectedOption.find(({id}) => id === option.id) || false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
