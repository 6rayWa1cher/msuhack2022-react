import React, { useCallback } from "react";
import { Button, Container, LinearProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMySnackbar, useParamSelector } from "@utils/hooks";
import { buttonSchema } from "@validation/yup";
import { useForm } from "react-hook-form";
import FormTextField from "@components/FormTextField";
import { getButtonByIdSelector, putButtonThunk } from "@redux/buttons";

const ButtonEditWidget = ({ buttonId, onClose }) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const currentButtonState = useParamSelector(getButtonByIdSelector, {
    buttonId,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(buttonSchema),
    mode: "all",
    defaultValues: {
      label: currentButtonState.label ?? "",
      description: currentButtonState.description ?? "",
      press_counter: currentButtonState.press_counter ?? 0,
    },
  });

  const onSubmit = useCallback(
    ({ label, description, press_counter }) =>
      dispatch(putButtonThunk({ buttonId, label, description, press_counter }))
        .then(unwrapResult)
        .then(() => {
          onClose();
        })
        .catch((e) => {
          console.error(e);
          enqueueError("Возникла непредвиденная ошибка");
        }),
    [dispatch, enqueueError, buttonId, onClose]
  );

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          name="label"
          control={control}
          variant="outlined"
          margin="normal"
          label="Название"
          type="text"
          fullWidth
          required
        />
        <FormTextField
          name="description"
          control={control}
          variant="outlined"
          margin="normal"
          label="Описание"
          type="text"
          fullWidth
        />
        <FormTextField
          name="press_counter"
          control={control}
          variant="outlined"
          margin="normal"
          label="Количество нажатий"
          type="number"
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            margin: (theme) => theme.spacing(3, 0, 2),
          }}
        >
          Сохранить
        </Button>
        {isSubmitting && <LinearProgress />}
      </form>
    </Container>
  );
};

export default ButtonEditWidget;
