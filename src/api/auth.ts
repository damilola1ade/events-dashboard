/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthPayload } from "../types";
import { api } from "./api";

export const signup = async (payload: AuthPayload): Promise<string> => {
  try {
    const res = await api.post("/auth/signup", payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res?.data?.message || "Sign up failed");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unauthorized action");
  }
};

export const login = async (payload: AuthPayload): Promise<string> => {
  try {
    const res = await api.post("/auth/login", payload);

    if (res.status !== 200 || res.status >= 300) {
      throw new Error(res?.data?.message || "Login failed");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async (accessToken: string) => {
  try {
    const res = await api.post("/auth/logout", { accessToken });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
