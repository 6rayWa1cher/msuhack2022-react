import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormTextField = ({
  name,
  control,
  controllerProps = {},
  ...fieldProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <TextField
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          error={!!error}
          helperText={error ? error.message : null}
          {...fieldProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormTextField;
