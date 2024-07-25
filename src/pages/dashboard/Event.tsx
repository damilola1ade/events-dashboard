import { useEffect, useRef } from "react";
import {
  useDeleteEvent,
  useGetEvent,
  useUpdateMutation,
} from "../../services/event";
import { ErrorText, Loader } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Stack,
  Image,
  Text,
  Flex,
  ButtonGroup,
  Box,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import moment from "moment";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { EventPayload } from "../../types";
import { useRole } from "../../hooks/useRole";
import { useFormValidation } from "../../hooks/useFormValidation";

const Event = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventPayload>();

  const navigate = useNavigate();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const { Admin } = useRole();

  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const { isLoading, data } = useGetEvent(id);

  const {
    DeleteEvent,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleting,
  } = useDeleteEvent();

  const { isLoading: isEditing, UpdateEvent } = useUpdateMutation();

  const { otherValidation } = useFormValidation();

  const onSubmit: SubmitHandler<EventPayload> = (payload) => {
    if (id) {
      UpdateEvent(
        { id, payload },
        {
          onSuccess: () => {
            closeEditModal();
            toast.success("Event updated successfully!");
          },
        }
      );
    }
  };

  useEffect(() => {
    const defaults = {
      eventName: data?.event?.eventName,
      date: data?.event?.date,
      location: data?.event?.location,
      description: data?.event?.description,
    };
    reset(defaults);
  }, [
    data?.event?.date,
    data?.event?.description,
    data?.event?.eventName,
    data?.event?.location,
    reset,
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate(-1);
    }
  }, [navigate, isDeleteSuccess]);

  if (isLoading || isDeleting) {
    return <Loader />;
  }
  return (
    <>
      <Flex py={12} px={{ base: 2, lg: 28 }}>
        <Flex h="40px" w="100%" justifyContent="space-between">
          <Button
            as={Link}
            to="/home"
            leftIcon={<BiArrowBack />}
            variant="ghost"
          >
            Go back
          </Button>

          {Admin && (
            <ButtonGroup>
              <Button
                onClick={openEditModal}
                variant="ghost"
                colorScheme="blue"
              >
                Edit event
              </Button>

              <Modal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                isCentered
              >
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
                      <Button
                        bg="#002c8a"
                        borderRadius="md"
                        color="white"
                        _hover={{ bg: "#002c8a" }}
                        size={{ base: "sm", md: "md" }}
                        isLoading={isEditing}
                        isDisabled={isEditing}
                        type="submit"
                      >
                        Update event
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </form>
              </Modal>

              <Button
                colorScheme="red"
                onClick={openDeleteModal}
                borderRadius="md"
              >
                Delete event
              </Button>

              <AlertDialog
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                leastDestructiveRef={cancelRef}
                isCentered
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete event
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button
                        size={{ base: "sm", md: "md" }}
                        onClick={closeDeleteModal}
                        ref={cancelRef}
                        borderRadius="md"
                      >
                        Cancel
                      </Button>
                      <Button
                        ml={4}
                        size={{ base: "sm", md: "md" }}
                        borderRadius="md"
                        colorScheme="red"
                        onClick={() => DeleteEvent(id)}
                        isLoading={isDeleting}
                        isDisabled={isDeleting}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </ButtonGroup>
          )}
        </Flex>
      </Flex>

      <Flex
        w="100%"
        p={4}
        flexDirection={{ base: "column", lg: "row-reverse" }}
        justifyContent="space-around"
        alignItems={{ base: "normal", lg: "center" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          w="400px"
        />

        <Stack mt="6" spacing="3">
          <Flex alignItems="center" color="blue.600" gap={3}>
            <FaRegCalendarAlt />
            <Text
              color="blue.600"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
            >
              {moment(data?.event?.date).format("LLLL")}
            </Text>
          </Flex>

          <Text fontSize="2xl" fontWeight="bold" align="left">
            {data?.event?.eventName}
          </Text>

          <Flex alignItems="center">
            <MdLocationPin color="red" />
            <Text fontSize="md">{data?.event?.location}</Text>
          </Flex>

          <Text maxW="600px" align="left">
            {data?.event?.description}
          </Text>
        </Stack>
      </Flex>
    </>
  );
};

export default Event;
