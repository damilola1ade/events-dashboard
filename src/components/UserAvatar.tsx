import { useEffect } from "react";

import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import Button from "./Button";
import { useLogoutMutation } from "../services/auth";
import { UserAvatarProps } from "../types";

const UserAvatar = ({ name, role }: UserAvatarProps) => {
  const { Logout, isLoading, isSuccess } = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        Logout(accessToken);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton>
          <Avatar size={{ base: "sm", md: "md" }} name={name} />
        </MenuButton>
        <MenuList as={Stack} p={4}>
          <Text textAlign="center" fontWeight="bold">
            {name}
          </Text>
          <Text textAlign="center" mb={4}>
            {role}
          </Text>
          <MenuItem
            as={Button}
            onClick={handleLogout}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserAvatar;
