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
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateEventMutation } from "../services/event";

import { EventPayload } from "../types";
import Button from "./Button";

const CreateEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm<EventPayload>();

  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, error, CreateEvent } =
    useCreateEventMutation();

  const onSubmit: SubmitHandler<EventPayload> = (payload) => {
    CreateEvent(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
      toast.success('Event created successfully!');
      onClose();
    }

    if (isError) {
      toast.error(error?.message);
    }
  }, [error, isError, isSuccess, navigate, onClose]);
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
                    fontSize={{ sm: "12px", md: "14px" }}
                  >
                    Event name
                  </FormLabel>

                  <Input
                    {...register("eventName")}
                    fontSize={{ sm: "12px", md: "14px" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                  />
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ sm: "12px", md: "14px" }}
                  >
                    Date & Time
                  </FormLabel>
                  <Input
                  {...register("date")}
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                  />
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ sm: "12px", md: "14px" }}
                  >
                    Location
                  </FormLabel>

                  <Input
                    id="location"
                    {...register("location")}
                    fontSize={{ sm: "12px", md: "14px" }}
                    placeholder="Input location"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                  />
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ sm: "12px", md: "14px" }}
                  >
                    Description
                  </FormLabel>

                  <Textarea
                    {...register("description")}
                    fontSize={{ sm: "12px", md: "14px" }}
                    placeholder="Email"
                    height="50px"
                    borderRadius="sm"
                  />
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter bg="gray.200" borderRadius="md">
              <Button isLoading={isLoading} type="submit">
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
