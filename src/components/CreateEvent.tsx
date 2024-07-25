import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Flex,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateEventMutation } from "../services/event";

import { EventPayload } from "../types";
import Button from "./Button";
import { ErrorText } from ".";
import { useFormValidation } from "../hooks/useFormValidation";

const CreateEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventPayload>();

  const { isLoading, CreateEvent } = useCreateEventMutation();

  const { otherValidation } = useFormValidation();

  const onSubmit: SubmitHandler<EventPayload> = (payload) => {
    CreateEvent(payload, {
      onSuccess: () => {
        onClose();
        toast.success("Event created successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Create event</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Create event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" gap={4}>
                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Event name
                  </FormLabel>

                  <Input
                    {...register("eventName", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.eventName && "red"}
                  />
                  {errors.eventName && (
                    <ErrorText error={errors.eventName.message} />
                  )}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Date & Time
                  </FormLabel>
                  <Input
                    {...register("date")}
                    height="50px"
                    placeholder="Select Date and Time"
                    size={{ base: "xs", lg: "sm" }}
                    type="datetime-local"
                    required
                  />
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Location
                  </FormLabel>

                  <Input
                    {...register("location", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Input location"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.location && "red"}
                  />
                  {errors.location && (
                    <ErrorText error={errors.location.message} />
                  )}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Description
                  </FormLabel>

                  <Textarea
                    {...register("description", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Email"
                    height="50px"
                    borderRadius="sm"
                    borderColor={errors.description && "red"}
                  />
                  {errors.description && (
                    <ErrorText error={errors.description.message} />
                  )}
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter bg="gray.200" borderRadius="md">
              <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
                Create event
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateEvent;
