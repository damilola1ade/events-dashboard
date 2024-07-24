/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthPayload {
  name?: string;
  email?: string;
  password?: string;
}

export interface EventPayload {
  eventName: string;
  date: string;
  location: string;
  description: string;
}

export interface ServerResponse {
  accessToken?: string;
  message?: string;
}

export interface ButtonProps {
  onClick?: VoidFunction;
  isLoading?: boolean;
  type?: string;
  children: string;
}

export interface EventCardProps {
  id: string | number | null | undefined | any;
  eventName: string;
  description: string;
  date: string;
  location: string;
}
