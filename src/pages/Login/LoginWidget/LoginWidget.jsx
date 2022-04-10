import React, { useCallback } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginThunk } from "@redux/auth/thunks";
import { useMySnackbar } from "@utils/hooks";
import { emailPasswordSchema } from "@validation/yup";
import { useForm } from "react-hook-form";
import FormTextField from "@components/FormTextField";
import { Box } from "@mui/system";
import MyLink from "@components/MyLink";
import CenteredMarginBox from "@components/CenteredMarginBox";
import CenteredRoundBox from "@components/CenteredRoundBox";

const LoginWidget = ({ redirectTo = "/" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueError } = useMySnackbar();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(emailPasswordSchema),
    mode: "all",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = useCallback(
    ({ username, password }) =>
      dispatch(loginThunk({ username, password }))
        .then(unwrapResult)
        .then(() => {
          navigate(redirectTo, { replace: true });
        })
        .catch((e) => {
          if (
            e.errors?.includes(
              "Invalid login credentials. Please try again."
            ) ||
            e.code === 401
          ) {
            enqueueError("Неверный username или пароль");
          } else {
            enqueueError("Возникла непредвиденная ошибка");
          }
        }),
    [dispatch, navigate, enqueueError, redirectTo]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <CenteredMarginBox>
        <CenteredRoundBox>
          <CheckCircleOutlineIcon />
        </CenteredRoundBox>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextField
            name="username"
            control={control}
            variant="outlined"
            margin="normal"
            label="Имя пользователя"
            type="text"
            fullWidth
            required
            autoComplete="username"
          />
          <FormTextField
            name="password"
            control={control}
            variant="outlined"
            margin="normal"
            label="Пароль"
            type="password"
            fullWidth
            required
            autoComplete="current-password"
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
            Войти
          </Button>
          {isSubmitting && <LinearProgress />}
          <MyLink to="/sign_up">{"Нет аккаунта? Зарегистрируйтесь"}</MyLink>
        </form>
      </CenteredMarginBox>
    </Container>
  );
};

export default LoginWidget;
