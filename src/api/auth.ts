/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthPayload } from "../types";
import { api } from "./api";

export const signup = async (payload: AuthPayload): Promise<string> => {
  try {
    const response = await api.post("/auth/signup", payload);
    const result = response.data;

    if (response.status !== 200) {
      throw new Error(result.message || "Sign up failed");
    }

    return result.accessToken;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
};

export const login = async (payload: AuthPayload): Promise<string> => {
  try {
    const response = await api.post("/auth/login", payload);
    const result = response.data;

    if (response.status !== 200) {
      throw new Error(result.message || "Login failed");
    }

    return result.accessToken;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
