import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";

import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { EventCardProps } from "../types";
import moment from "moment";
import { useDeleteEvent } from "../services/event";

const EventCard = ({
  id,
  eventName,
  description,
  date,
  location,
}: EventCardProps) => {
  const { DeleteCard } = useDeleteEvent();

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Flex w="100%" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">
              {eventName}
            </Text>

            <Flex alignItems="center">
              <MdLocationPin color="red" />
              <Text fontSize="sm">{location}</Text>
            </Flex>
          </Flex>

          <Text align="left">{description}</Text>

          <Flex alignItems="center" color="blue.600" gap={3}>
            <FaRegCalendarAlt />
            <Text
              color="blue.600"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
            >
              {moment(date).format("LLLL")}
            </Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter
        w="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <ButtonGroup>
          <Button variant="ghost" colorScheme="blue">
            Edit event
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            onClick={() => DeleteCard(id)}
          >
            Delete event
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
