import { Text } from "@chakra-ui/react";
import { ErrorTextProp } from "../types";

const ErrorText = ({ error }: ErrorTextProp) => {
  return (
    <Text color="red" align="left" mt={1} fontSize={{ base: "xs", md: "sm" }}>
      {error}
    </Text>
  );
};

export default ErrorText;
