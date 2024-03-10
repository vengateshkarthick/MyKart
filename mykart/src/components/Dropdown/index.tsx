import React, { useRef, useState } from "react";
import dropdownIcon from "../../assets/dropdown.svg";
import { IDropdown } from "./types";
import Button from "../Button";
import Checkbox from "../Checkbox";
import { conjuctStrings } from "../../shared/display";
import useOutsideClickHandler from "../../shared/hooks/useOutsideHandler";

function Dropdown({
  selected,
  options,
  onSelect,
  isMultiSelect = false,
  label,
}: IDropdown) {
  const [selectedOption, setSelectedOption] = useState<
    { id: string; label: string }[]
  >(() => selected || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (
    option: IDropdown["options"][0],
    isChecked: boolean
  ) => {
    const opt = [...selectedOption];
  
    if (isChecked) {
      opt.push(option);
    } else {
      const idx = opt?.findIndex((opt) => opt.id === option.id)
      opt.splice(idx, 1);
    }

    setSelectedOption(() => [...opt]);

    if (!isMultiSelect) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  React.useEffect(() => {
    if (!isDropdownOpen) {
      onSelect(selectedOption);
    }
  }, [isDropdownOpen, selectedOption]);

  const optionsLabel = selectedOption?.map((item) => item.label);

  // closing the dropdown once clicked outside the component
  useOutsideClickHandler(ref, () => isMultiSelect && setIsDropdownOpen(false));

  const dropdownPosition = React.useMemo(() => {
    if (btnRef.current) {
      const area = btnRef.current.getBoundingClientRect();
      return { top: `${area.top + 10}px` };
    }
  }, [btnRef?.current]);
  return (
    <div className="relative inline-block text-left w-[300px]" ref={ref}>
      
      <div className="h-6 w-full flex justify-start gap-2 items-center" ref={btnRef}>
      {label && (
        <div className="text-sm font-normal w-auto font-[Poppins] text-nowrap">{label}</div>
      )}
        <Button
          label={conjuctStrings(optionsLabel) || "Select Option"}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          icon={dropdownIcon}
          variant="outlined"
          code="primary"
        />
      </div>

      {isDropdownOpen && (
        <div
          className="absolute h-64 overflow-y-auto top-10 flex flex-col gap-2 justify-start py-2 items-center w-full rounded-md shadow-2xl bg-white ring-black ring-opacity-5"
          role="menu"
          // style={dropdownPosition}
        >
          {options.map((option) => (
            <Checkbox
              label={option.label}
              className="p-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onChecked={(isChecked) => handleOptionClick(option, isChecked)}
              isChecked={
                !!selectedOption.find(({ id }) => id === option.id) || false
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
