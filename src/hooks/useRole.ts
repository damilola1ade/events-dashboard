export const useRole = () => {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user || "");

  let Admin = false;
  let User = false;

  console.log(parsedUser)

  if (user) {
    Admin = parsedUser?.user?.role?.includes("ADMIN");
    User = parsedUser?.user?.role.includes("USER");

    return { Admin, User };
  }

  return { Admin, User };
};
