import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { Role, ServerResponse, User, UserFormData } from "../types.d.js";

const baseUrl = getURL(["SERVER", "AUTH", "USER"]);

const insertUser = async (data: UserFormData, options?: AxiosRequestConfig) => {
  try {
    const res = await axios.post<ServerResponse & { data: User }>(
      baseUrl,
      data,
      {
        ...options,
        params: {
          role: Role.Specialist,
        },
      }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new user");
  }
};
const getUsersByRole = async (options?: AxiosRequestConfig) => {
  try {
    const res = await axios.get<ServerResponse & { data: Array<User> }>(
      baseUrl,
      {
        ...options,
        params: {
          role: "specialist",
          id: "all",
        },
      }
    );
    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);

    throw new Error("Error while trying to get the users");
  }
};

const updateUser = async (user: UserFormData, options?: AxiosRequestConfig) => {
  try {
    const { id, ...rest } = user;
    const res = await axios.put<ServerResponse & { data: User }>(
      `${baseUrl}`,
      rest,
      { ...options, params: { role: Role.Specialist, id } }
    );
    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to update the user");
  }
};

const deleteUser = async (userId: string, options?: AxiosRequestConfig) => {
  try {
    const res = await axios.delete<ServerResponse & { data: User }>(
      `${baseUrl}`,
      {
        ...options,
        params: {
          role: Role.Specialist,
          id: userId,
        },
      }
    );
    return res.data.success ? true : false;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to delete the user");
  }
};
export const UserService = {
  insertUser,
  getUsersByRole,
  deleteUser,
  updateUser,
};
