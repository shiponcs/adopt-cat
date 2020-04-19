import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  console.log("inside of useDropdown");
  const [state, setState] = useState(defaultState);
  const id = label.toLowerCase();
  console.log(state);
  const Dropdown = () => (
    <label htmlFor="{id}">
      {label}
      <select
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={!options.length}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  return [state, Dropdown, setState];
};

export default useDropdown;
