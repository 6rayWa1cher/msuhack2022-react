import React from "react";
import { Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

const FormCheckbox = ({
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
        <Checkbox
          id={name}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          inputRef={ref}
          {...fieldProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormCheckbox;
