import { useMutation, useQuery, useQueryClient } from "react-query";
import { EventPayload } from "../types";
import { createEvent, deleteEvent, getAllEvents } from "../api/event";

export const useGetEvents = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
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

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: DeleteCard,
  } = useMutation((id) => deleteEvent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    DeleteCard,
  };
};
