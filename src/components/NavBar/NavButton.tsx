import { ButtonBase } from "@mui/material";
import React from "react";

interface NavButtonProps {
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ children }) => {
  return (
    <ButtonBase
      sx={{
        padding: "5px 10px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      {children}
    </ButtonBase>
  );
};

export default NavButton;
