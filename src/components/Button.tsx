import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonProps } from "../types";

const Button = ({
  onClick,
  isLoading,
  isDisabled,
  type,
  variant,
  children,
}: ButtonProps) => {
  return (
    <ChakraButton
      bg="#002c8a"
      borderRadius="md"
      color="white"
      _hover={{ bg: "#002c8a" }}
      size={{ base: "sm", md: "md" }}
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      type={type}
      variant={variant}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
