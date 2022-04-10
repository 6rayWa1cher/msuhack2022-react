import { createSelector } from "@reduxjs/toolkit";

const authSelector = (state) => state.auth;
const tokenSelector = (state) => state.auth.token;
const userSelector = (state) => state.auth.user;

export const loginTokenSelector = createSelector(
  tokenSelector,
  ({ accessToken }) => ({ accessToken })
);

export const loggedInSelector = createSelector(
  authSelector,
  (auth) =>
    auth.user.id &&
    auth.token.accessToken &&
    Date.now() < new Date(+auth.token.expiry * 1000)
);

export const accessValidSelector = createSelector(
  tokenSelector,
  ({ accessToken, expiry }) => accessToken && Date.now() < new Date(expiry)
);

export const userIdSelector = createSelector(userSelector, (user) => user.id);
