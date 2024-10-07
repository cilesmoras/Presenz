import { Db } from "../../utils/ConnectMethod";

export const createUser = async (userDetails) => {
  const response = await Db.post("/auth/register", userDetails);
  return response;
};

export const login = async (loginDetails) => {
  try {
    const response = await Db.post("/auth/login", loginDetails);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};
