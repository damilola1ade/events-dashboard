/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { login, logout, signup } from "../api/auth";
import { AuthPayload } from "../types";
import { useAuth } from "../context/AuthContext";

export const useSignUpMutation = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: SignUp,
  } = useMutation<string, Error, AuthPayload>((payload) => signup(payload));

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    SignUp,
  };
};

export const useLoginMutation = () => {
  const { login: setUser } = useAuth();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: Login,
  } = useMutation<any, Error, AuthPayload>((payload) => login(payload), {
    onSuccess: (data) => {
      const { accessToken }: any = data;
      localStorage.setItem("accessToken", accessToken);
      setUser(data);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    Login,
  };
};

export const useLogoutMutation = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: Logout,
  } = useMutation(logout, {
    onSuccess: () => {
      localStorage.clear()
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    Logout,
  };
};
