import { EventPayload } from "../types";
import { api } from "./api";

export const createEvent = async (payload: EventPayload) => {
  const res = await api.post("/event/create-event", payload);
  return res.data;
};

export const getAllEvents = async () => {
  const res = await api.get("/event/get-all-events");
  return res.data;
};

export const deleteEvent = async (id: string) => {
  const res = await api.delete(`event/delete-event/${id}`);
  return res.data;
};
