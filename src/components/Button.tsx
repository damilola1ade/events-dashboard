import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonProps } from "../types";

const Button = ({ onClick, isLoading, type, children }: ButtonProps) => {
  return (
    <ChakraButton
      bg="#002c8a"
      borderRadius="md"
      color="white"
      _hover={{ bg: "#002c8a" }}
      onClick={onClick}
      isLoading={isLoading}
      type={type}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
