import { createAction } from "@reduxjs/toolkit";

export const setTokens = createAction("auth/setTokens");

export const setAuthBag = createAction("auth/setAuthBag");

export const setUser = createAction("auth/setUser");
