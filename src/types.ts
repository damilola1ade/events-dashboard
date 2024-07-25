import { ReactNode } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export type AuthPayload = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  accessToken?: string | any;
};

export interface EventPayload {
  id?: string;
  eventName: string;
  date: string;
  location: string;
  description: string;
  payload?: {
    eventName: string;
    date: string;
    location: string;
    description: string;
  };
}

export interface ServerResponse {
  accessToken?: string;
  message?: string;
}

export interface UserAvatarProps {
  name: string;
  role: string;
}

export interface ButtonProps {
  onClick?: VoidFunction;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "ghost" | "outline" | "solid" | "link" | "unstyled";
  type?: "button" | "reset" | "submit";
  children: string;
}

export interface EventCardProps {
  id: string | number | null | undefined | any;
  eventName: string;
  description: string;
  date: string;
  location: string;
}

export interface User {
  accessToken: string | any;
  error: boolean;
  message: string;
  user: {
    name?: string;
    role?: string;
  };
}

export interface AuthContextType {
  user: User | null | undefined;
  login: (userData: User) => void;
}

export interface AuthContextProps {
  children: ReactNode;
}

export type ErrorTextProp = {
  error: any;
};

export interface ProtectedRouteProps {
  children: ReactNode;
}
