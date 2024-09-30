import { Db } from "../../utils/ConnectMethod";

export const createUser = async (userDetails) => {
  const response = await Db.post("/auth/register", userDetails);
  return response;
};

export const login = async (loginDetails) => {
  const response = await Db.post("/auth/login", loginDetails);
  return response;
};
