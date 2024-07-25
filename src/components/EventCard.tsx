import { Card, CardBody, Image, Text, Stack, Flex } from "@chakra-ui/react";

import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { EventCardProps } from "../types";
import moment from "moment";
import { Link } from "react-router-dom";

const EventCard = ({
  id,
  eventName,
  description,
  date,
  location,
}: EventCardProps) => {
  return (
    <Card maxW="sm" as={Link} to={`/event/${id}`}>
      <CardBody>
        <Flex alignItems="center" justifyContent="flex-end" mb={4}>
          <MdLocationPin color="red" />
          <Text fontSize={{ base: "sm", lg: "md" }}>{location}</Text>
        </Flex>
        <Image
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Flex w="100%" justifyContent="space-between">
            <Text
              maxW="150px"
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight="bold"
            >
              {eventName}
            </Text>
          </Flex>

          <Text fontSize={{ base: "sm", lg: "md" }} align="left">
            {description?.slice(0, 30)} ....
          </Text>

          <Flex alignItems="center" color="blue.600" gap={3}>
            <FaRegCalendarAlt />
            <Text
              color="blue.600"
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight="bold"
            >
              {moment(date).format("LLLL")}
            </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
