import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";

import {
  loadingSelector,
  initApplication,
  errorSelector,
  AppStateEnum,
} from "@redux/app";
import { Backdrop, CircularProgress } from "@mui/material";

const MyBackdrop = ({ children }) => (
  <Backdrop
    open={true}
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      color: "#fff",
    }}
  >
    {children}
  </Backdrop>
);

const PreloaderWrapper = ({ children }) => {
  const { dispatch } = useStore();
  const loadingState = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (loadingState === AppStateEnum.OFF) {
      dispatch(initApplication());
    }
  }, [loadingState, dispatch]);

  const initialLoading =
    loadingState === AppStateEnum.INITIALIZING ||
    loadingState === AppStateEnum.OFF;
  const loadingCausedError = error !== null;

  return (
    <>
      {initialLoading && (
        <MyBackdrop>
          <CircularProgress color="inherit" />
        </MyBackdrop>
      )}
      {!initialLoading && loadingCausedError && (
        <MyBackdrop>
          <h1>Что-то пошло не так!</h1>
        </MyBackdrop>
      )}
      {!initialLoading && !loadingCausedError && children}
    </>
  );
};

export default PreloaderWrapper;
