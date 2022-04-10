import React, { useCallback, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";

import { usersCreateThunk } from "@redux/users";
import { useMySnackbar } from "@utils/hooks";
import { registrationSchema } from "@validation/yup";
import { useForm } from "react-hook-form";
import FormTextField from "@components/FormTextField";
import { FormControlLabel } from "@mui/material";
import FormCheckbox from "@components/FormCheckboxWithLabel";
import MyLink from "@components/MyLink";
import CenteredRoundBox from "@components/CenteredRoundBox";
import CenteredMarginBox from "@components/CenteredMarginBox";

export default function SignUpWidget() {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const [redirect, setRedirect] = useState(false);
  const [redirectEmail, setRedirectEmail] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      privacyPolicyAgreement: false,
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    ({ username, email, password }) =>
      dispatch(usersCreateThunk({ username, email, password }))
        .then(unwrapResult)
        .then(() => {
          setRedirectEmail(email);
          setRedirect(true);
        })
        .catch((error) => {
          console.error("Sign up failed", error);
          let errored = false;
          if (error?.data) {
            const errors = error?.data?.errors;
            if (errors?.username?.includes("has already been taken")) {
              enqueueError("Username уже был занят!");
              setError("username", {
                type: "manual",
                message: "Этот username недоступен",
              });
              errored = true;
            }
          }
          if (!errored) enqueueError("Что-то пошло не так...");
        }),
    [dispatch, enqueueError, setError]
  );

  if (redirect) {
    return <Navigate to={`/email?email=${redirectEmail}`} replace />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <CenteredMarginBox>
          <CenteredRoundBox>
            <LockIcon />
          </CenteredRoundBox>
          <Typography component="h1" variant="h5">
            Зарегистрироваться
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormTextField
                  name="username"
                  control={control}
                  label="Username"
                  autoComplete="username"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  name="password"
                  control={control}
                  type="password"
                  label="Пароль"
                  autoComplete="new-password"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  name="confirmPassword"
                  control={control}
                  type="password"
                  label="Повторите пароль"
                  autoComplete="new-password"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <FormCheckbox
                      name="privacyPolicyAgreement"
                      control={control}
                      type="checkbox"
                      required
                    />
                  }
                  label="Я согласен с политикой конфиденциальности и на обработку моих персональных данных"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: (theme) => theme.spacing(3, 0, 2),
              }}
            >
              Зарегистрироваться
            </Button>
            {isSubmitting && <LinearProgress />}
            <Grid container justify="flex-end">
              <Grid item>
                <MyLink to="/login">Уже есть аккаунт? Войти</MyLink>
              </Grid>
            </Grid>
          </form>
        </CenteredMarginBox>
      </Container>
    );
  }
}
