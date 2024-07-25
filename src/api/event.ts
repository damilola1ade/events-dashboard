/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventPayload } from "./../types";
import { api } from "./api";

export const createEvent = async (payload: EventPayload) => {
  try {
    const res = await api.post("/event/create-event", payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res?.data?.message || "error");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unauthorized action");
  }
};

export const getAllEvents = async () => {
  try {
    const res = await api.get("/event/get-all-events");

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unauthorized action");
  }
};

export const getSingleEvent = async (id: string) => {
  try {
    const res = await api.get(`/event/get-event/${id}`);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Unauthorized action");
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const res = await api.delete(`event/delete-event/${id}`);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "failed");
  }
};

export const updateEvent = async ({
  id,
  payload,
}: {
  id: string;
  payload: EventPayload;
}) => {
  try {
    const res = await api.put(`event/update-event/${id}`, payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "failed");
  }
};
