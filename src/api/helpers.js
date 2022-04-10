import { logout, setTokens } from "@redux/auth";
import { loginTokenSelector } from "@redux/auth/selectors";
import { mainAxios } from "./utils";

const getTokensHelper = (store) => loginTokenSelector(store.getState());

const eraseTokensHelper = (store) => store.dispatch(logout());

export const createWrappedApiInterceptor = (store) => {
  const setRequestTokens = (request) => {
    const { accessToken } = getTokensHelper(store);
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  };

  const eraseTokensFromStore = () => {
    eraseTokensHelper(store);
  };

  mainAxios.interceptors.request.use((request) => {
    setRequestTokens(request);
    return request;
  });

  mainAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        eraseTokensFromStore();
      }
      return Promise.reject(error);
    }
  );
};
