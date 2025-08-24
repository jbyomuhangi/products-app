import { TextFieldProps as MuiTextFieldProps, TextField } from "@mui/material";

import React from "react";

interface TextInputProps {
  TextFieldProps?: MuiTextFieldProps;
}

const TextInput: React.FC<TextInputProps> = ({ TextFieldProps }) => {
  const { sx, ...otherProps } = TextFieldProps || {};

  return (
    <TextField
      sx={{
        height: "40px",
        "& .MuiInputBase-root": { height: "40px", padding: 0 },
        "& input": { padding: "0px 8px" },
        ...sx,
      }}
      {...otherProps}
    />
  );
};

export default TextInput;
