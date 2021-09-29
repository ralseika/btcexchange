import React, { useState } from "react";

// #region -------------- Interfaces -------------------------------------------------------------------

export interface IDropdownOptions {
  id: number;
  label: string;
}

interface IProps {
  options: IDropdownOptions[];
  defaultKey?: string;
  placeholder?: string;
  onSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

// #end region

// #region -------------- Component -------------------------------------------------------------------

export default function Dropdown({
  options,
  defaultKey,
  placeholder,
  onSelect,
}: IProps) {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(defaultKey || "");

  // #region -------------- Event handlers -------------------------------------------------------------------

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    selectedItem == e.currentTarget.id
      ? setSelectedItem("")
      : setSelectedItem(e.currentTarget.id);
    setOpen(false);
    onSelect(e);
  };

  // #end region
  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {placeholder
          ? placeholder
          : selectedItem
          ? options.find((item) => item.id.toString() == selectedItem)?.label
          : placeholder}

        <i className={`icon-right-open-big icon ${isOpen ? "open" : ""}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {options.map((item, idx) => (
          <div
            key={idx}
            className="dropdown-item"
            onClick={(e) => handleItemClick(e)}
            id={item.id.toString()}
          >
            <span
              className={`${
                item.id.toString() == selectedItem ? "selected" : ""
              }`}
            ></span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// #end region
