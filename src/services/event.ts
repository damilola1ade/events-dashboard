/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EventPayload } from "../types";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
} from "../api/event";

export const useGetEvents = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
  });

  return { data, isLoading, isError, error };
};

export const useGetEvent = (id: string | any) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getSingleEvent(id),
  });

  return { data, isLoading, isError, error };
};

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: CreateEvent,
  } = useMutation<string, Error, EventPayload>(
    (payload) => createEvent(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["events"]);
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    CreateEvent,
  };
};

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: UpdateEvent,
    data,
  } = useMutation(
    ({ id, payload }: { id: string; payload: EventPayload }) =>
      updateEvent({ id, payload }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["event"]);
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    UpdateEvent,
    data,
  };
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: DeleteEvent,
  } = useMutation((id: any) => deleteEvent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    DeleteEvent,
  };
};
