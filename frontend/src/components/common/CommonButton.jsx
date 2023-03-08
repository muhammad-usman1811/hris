import React from "react";
import Button from "@mui/material/Button";

const CommonButton = ({ children, color, disabled, size, sx, variant }) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      sx={sx}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
