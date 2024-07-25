import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Flex,
  Input,
  Text,
  Icon,
  Button,
  FormLabel,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";

import { useSignUpMutation } from "../../services/auth";
import { toast } from "sonner";

import { AuthPayload } from "../../types";
import { useFormValidation } from "../../hooks/useFormValidation";
import { ErrorText } from "../../components";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPayload>();

  const navigate = useNavigate();

  const { isLoading, SignUp } = useSignUpMutation();

  const { nameValidation, emailValidation, signUpPasswordValidation } =
    useFormValidation();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const onSubmit: SubmitHandler<AuthPayload> = (payload) => {
    SignUp(payload, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <Flex position="relative" overflow="hidden">
      <Flex
        minH="720px"
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ md: "0px" }}
      >
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="5px"
            p="35px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
          >
            <Flex
              flexDirection="column"
              gap={6}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold" fontSize="xl" color="white">
                Sign up page
              </Text>
              <Box
                w="400px"
                p={6}
                position="relative"
                overflow="hidden"
                border="1px"
                borderRadius="md"
                bg="white"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex flexDirection="column" gap={4}>
                    <Box>
                      <FormLabel
                        fontWeight="bold"
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Name
                      </FormLabel>

                      <Input
                        {...register("name", {
                          ...nameValidation,
                        })}
                        fontSize={{ base: "xs", md: "md" }}
                        placeholder="Damilola Adegbemile"
                        height="50px"
                        borderRadius="sm"
                        type="text"
                      />
                      {errors.name && <ErrorText error={errors.name.message} />}
                    </Box>

                    <Box>
                      <FormLabel
                        fontWeight="bold"
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Email
                      </FormLabel>

                      <Input
                        {...register("email", {
                          ...emailValidation,
                        })}
                        fontSize={{ base: "xs", md: "md" }}
                        placeholder="Email"
                        height="50px"
                        borderRadius="sm"
                        borderColor={errors.email && "red"}
                        type="email"
                      />
                      {errors.email && (
                        <ErrorText error={errors.email.message} />
                      )}
                    </Box>

                    <Box>
                      <FormLabel
                        fontWeight="bold"
                        fontSize={{ base: "xs", md: "md" }}
                      >
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          id="password"
                          {...register("password", {
                            ...signUpPasswordValidation,
                          })}
                          borderRadius="sm"
                          placeholder="Password"
                          height="50px"
                          type={show ? "text" : "password"}
                          fontSize={{ base: "xs", md: "md" }}
                        />

                        <InputRightElement width="4.5rem">
                          <Button
                            ml={6}
                            mt={2}
                            bg="white"
                            h="2.0rem"
                            size="sm"
                            onClick={handleShow}
                          >
                            {show ? (
                              <Icon as={BsEyeFill} />
                            ) : (
                              <Icon as={BsEyeSlash} />
                            )}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {errors.password && (
                        <ErrorText error={errors.password.message} />
                      )}
                    </Box>

                    <Button
                      fontSize={{ base: "13px", md: "sm" }}
                      type="submit"
                      borderRadius="md"
                      color="white"
                      bg="#002C8A"
                      _hover={{ bg: "#002C6A" }}
                      width="100%"
                      height="50px"
                      isLoading={isLoading}
                      isDisabled={isLoading}
                    >
                      Sign up
                    </Button>

                    <Text
                      as={Link}
                      to="/login"
                      fontSize={{ base: "13px", md: "sm" }}
                      color="#002C8A"
                      textDecoration="underline"
                    >
                      Already have an account? Login
                    </Text>
                  </Flex>
                </form>
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <Box
          overflow="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="fixed"
          bg="#102d47"
        />
      </Flex>
    </Flex>
  );
};

export default SignUp;
