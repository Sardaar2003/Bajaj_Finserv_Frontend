import React from 'react';
import './MultiSelectDropdown.css';  // Create a CSS file for styling

const MultiSelectDropdown = ({ options, selectedOptions, onChange }) => {
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    onChange(selectedOptions);
  };

  return (
    <div className="multi-select-container">
      <label htmlFor="multi-select">Multi Filter:</label>
      <select
        id="multi-select"
        className="multi-select"
        multiple
        value={selectedOptions}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectDropdown;
