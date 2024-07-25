import { Flex, Text, SimpleGrid, Image } from "@chakra-ui/react";
import { CreateEvent, EventCard, Loader, UserAvatar } from "../../components";
import { useGetEvents } from "../../services/event";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { data, isLoading } = useGetEvents();

  const { user } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <Flex p={4} flexDirection="column" gap={{ base: 12, md: 24 }}>
      <Flex w="100%" justifyContent="space-between" alignItems="center" gap={4}>
        <Image src="/images/logo.png" w={{ base: "80px", lg: "144px" }} />

        <Flex alignItems="center" gap={4}>
          <CreateEvent />
          <UserAvatar
            name={user?.user?.name || ""}
            role={user?.user?.role || ""}
          />
        </Flex>
      </Flex>

      {data?.events?.length > 0 ? (
        <>
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "4xl" }}>
            Upcoming Events
          </Text>
          <SimpleGrid columns={[1, 1, 3]} gap={12}>
            {data?.events?.map(
              (item: {
                id: number | string;
                eventName: string;
                description: string;
                date: string;
                location: string;
              }) => (
                <EventCard
                  key={item.id}
                  id={item.id}
                  eventName={item.eventName}
                  description={item.description}
                  date={item.date}
                  location={item.location}
                />
              )
            )}
          </SimpleGrid>
        </>
      ) : (
        <Flex
          minH="50vh"
          justifyContent="center"
          alignItems="center"
          color="black"
        >
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "2xl" }}>
            No upcoming event..
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
