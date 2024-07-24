import { useMutation, useQueryClient } from "react-query";
import { login, signup } from "../api/auth";
import { AuthPayload } from "../types";

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: SignUp,
  } = useMutation<string, Error, AuthPayload>((payload) => signup(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([""]);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    SignUp,
  };
};

export const useLoginUpMutation = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: Login,
  } = useMutation<string, Error, AuthPayload>((payload) => login(payload), {
    onSuccess: (accessToken) => {
      localStorage.setItem("accessToken", accessToken);
      queryClient.invalidateQueries([""]);
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
