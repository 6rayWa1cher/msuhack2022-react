import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

import { signInApi } from "@api/auth";
import { user } from "@validation/normalizr";
import { setAuthBag, setTokens, setUser } from "./actions";
import { createAsyncThunkWrapped } from "@utils/thunkWrapper";
import { usersGetSelfUserThunk } from "@redux/users";
import { myNormalize } from "@utils/redux";
import jwtDecode from "jwt-decode";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }, store) => {
    try {
      const response = await signInApi(username, password);
      const { data } = response;
      const { access_token: accessToken } = data;
      const decoded = jwtDecode(accessToken);
      const { sub: userId, exp: expiry } = decoded;
      const authBag = {
        token: {
          accessToken,
          expiry,
        },
        user: {
          id: userId,
        },
      };
      store.dispatch(setAuthBag(authBag));
      const response1 = await store
        .dispatch(usersGetSelfUserThunk())
        .then(unwrapResult);
      console.log(response1);
      return response1;
    } catch (e) {
      console.error("Login thunk error", e);
      return store.rejectWithValue(e.response.data || e.message);
    }
  }
);

export const propagateTokenThunk = createAsyncThunkWrapped(
  "auth/propagateToken",
  async ({ accessToken }, { dispatch }) => {
    dispatch(setTokens({ accessToken }));
    const bag = await dispatch(usersGetSelfUserThunk());
    const id = bag.payload.result;
    dispatch(setUser({ id }));
    return {};
  }
);
