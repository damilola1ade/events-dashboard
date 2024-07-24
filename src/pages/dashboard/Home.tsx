import { Flex, SimpleGrid } from "@chakra-ui/react";
import { CreateEvent, EventCard, Loader } from "../../components";
import { useGetEvents } from "../../services/event";

const Home = () => {
  const { data, isLoading } = useGetEvents();

  if (isLoading) return <Loader />;

  return (
    <Flex p={4} flexDirection="column" gap={24}>
      <Flex w="100%" justifyContent="flex-end" alignItems="flex-end">
        <CreateEvent />
      </Flex>

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
    </Flex>
  );
};

export default Home;
