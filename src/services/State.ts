import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { State, ServerResponse } from "../types";

const urlbase = getURL(["SERVER", "STATE"]);

//Public endpoint
const getStatesByprovinceId = async (options?: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}`;
    const resp = await axios.get<ServerResponse & { data: Array<State> }>(url, {
      ...options,
    });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while loading states");
  }
};

export const StateService = {
  getStatesByprovinceId,
};
