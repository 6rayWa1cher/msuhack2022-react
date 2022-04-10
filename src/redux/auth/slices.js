import { createSlice } from "@reduxjs/toolkit";

import {
  localStorageErase,
  localStorageSet,
  localStorageLoad,
} from "@utils/tokens";
import { setTokens, setAuthBag, setUser } from "./actions";

const initialState = {
  token: {
    accessToken: false,
    expiry: false,
  },
  user: {
    id: false,
  },
};

const setTokensHelper = (state, { accessToken, expiry }) => {
  state.token = {
    accessToken,
    expiry,
  };
  localStorageSet({ ...state });
};

const setUserHelper = (state, { id }) => {
  state.user = {
    id,
  };
  localStorageSet({ ...state });
};

const setAuthBagHelper = (state, { token, user }) => {
  setTokensHelper(state, token);
  setUserHelper(state, user);
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuthBag(state) {
      setAuthBagHelper(state, localStorageLoad());
    },
    logout() {
      localStorageErase();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTokens, (state, { payload }) =>
      setTokensHelper(state, payload)
    );
    builder.addCase(setAuthBag, (state, { payload }) =>
      setAuthBagHelper(state, payload)
    );
    builder.addCase(setUser, (state, { payload }) =>
      setUserHelper(state, payload)
    );
  },
});

const actions = auth.actions;
export const loadAuthBag = actions.loadAuthBag;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
