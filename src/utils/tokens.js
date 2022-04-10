import { load, save, remove } from "./localStorage";

const tokenValueKey = "token.value";
const userIdKey = "user.id";
const tokenExpiryKey = "token.expiry";

export const localStorageSet = (authBag) => {
  const {
    token: { accessToken, expiry },
    user: { id },
  } = authBag;

  save(tokenValueKey, accessToken);
  save(userIdKey, id);
  save(tokenExpiryKey, expiry);
};

export const localStorageLoad = () => {
  const accessToken = load(tokenValueKey);
  const id = load(userIdKey);
  const expiry = load(tokenExpiryKey);

  if ([accessToken, id].includes(null)) {
    return {
      token: {
        accessToken: null,
        expiry: null,
      },
      user: {
        id: null,
      },
    };
  }

  return {
    token: {
      accessToken,
      expiry,
    },
    user: {
      id,
    },
  };
};

export const localStorageErase = () => {
  remove(tokenValueKey);
  remove(tokenExpiryKey);
  remove(userIdKey);
};
