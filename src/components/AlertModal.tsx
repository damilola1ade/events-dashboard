import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Flex,
  Icon,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { MdInfoOutline } from "react-icons/md";

const AlertModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [checked] = useState<boolean>(false);
  const [lastOpened, setLastOpened] = useState<Date | null>(null);
  const toast = useToast();

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("alertBox");
    const lastOpenedTime = storedTimestamp ? new Date(storedTimestamp) : null;
    setLastOpened(lastOpenedTime);
  }, []);

  useEffect(() => {
    if (
      !checked &&
      (!lastOpened ||
        new Date().getTime() - lastOpened.getTime() >= 24 * 60 * 60 * 1000)
    ) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [checked, lastOpened]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} has been copied to clipboard.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      {isVisible && (
        <Box
          pos="fixed"
          bottom="10px"
          right="10px"
          w="300px"
          bg="white"
          boxShadow="lg"
          borderRadius="sm"
          p={4}
          zIndex={1000}
        >
          <Flex alignItems="center" gap={2} mb={2}>
            <Icon as={MdInfoOutline} />
            <Text fontSize="lg" fontWeight="bold">
              Admin details
            </Text>
          </Flex>
          <Divider borderColor="gray.500" />

          <Box mt={3} fontSize="sm" fontWeight="bold">
            <Flex gap={2} alignItems="center">
              <Text>Email:</Text>
              <Text>damiiyi@gmail.com</Text>
              <Button
                size="xs"
                colorScheme="blue"
                onClick={() => handleCopy("damiiyi@gmail.com")}
              >
                Copy
              </Button>
            </Flex>

            <Flex gap={2} alignItems="center" mt={2}>
              <Text>Password:</Text>
              <Text>Admin123&</Text>
              <Button
                size="xs"
                colorScheme="blue"
                onClick={() => handleCopy("Admin123&")}
              >
                Copy
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AlertModal;
