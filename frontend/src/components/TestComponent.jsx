import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

const TestComponent = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [selectedOption, setSelectedOption] = useState("");
  const [customOption, setCustomOption] = useState("");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (value === "addCustom") {
      setSelectedOption("addCustom");
    } else {
      setSelectedOption(value);
    }
  };

  const handleCustomOptionChange = (event) => {
    setCustomOption(event.target.value);
  };

  const handleAddCustomOption = () => {
    if (customOption) {
      setOptions([...options, customOption]);
      setSelectedOption(customOption);
      setCustomOption("");
    }
  };

  return (
    <div>
      <TextField
        select
        value={selectedOption}
        onChange={handleOptionChange}
        variant="standard"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        <MenuItem value="addCustom">Add Custom</MenuItem>
      </TextField>

      {selectedOption === "addCustom" && (
        <div>
          <TextField
            value={customOption}
            onChange={handleCustomOptionChange}
            variant="standard"
          />
          <button onClick={handleAddCustomOption}>Add</button>
        </div>
      )}
    </div>
  );
};

export default TestComponent;
