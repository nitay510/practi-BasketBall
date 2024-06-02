import React from 'react';

interface DropdownMenuProps {
  options: string[]; // Array of options for the dropdown menu
  onSelectOption: (option: string) => void; // Callback function to handle option selection
  selectedOption: string; // Currently selected option
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelectOption, selectedOption }) => {
  return (
    <div className='dropdown-menu'>
      {options.map((option, index) => (
        <div
          key={index}
          className={`dropdown-option ${option === selectedOption ? 'selected' : ''}`}
          onClick={() => onSelectOption(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
