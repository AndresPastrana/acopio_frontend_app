import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { Tank, ServerResponse, TanksFormData } from "../types";

const urlbase = getURL(["SERVER", "TANK"]);

const createNewTank = async (
  tank: TanksFormData,
  options: AxiosRequestConfig
) => {
  try {
    const res = await axios.post<ServerResponse & { data: Tank }>(
      urlbase,
      tank,
      {
        ...options,
      }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new tank");
  }
};

const updateTank = async (tank: TanksFormData, options: AxiosRequestConfig) => {
  try {
    const { id, ...data } = tank;
    const url = `${urlbase}${id}`;
    const res = await axios.put<ServerResponse & { data: Tank }>(url, data, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to update a tank");
  }
};

const getAllTanks = async (options: AxiosRequestConfig) => {
  try {
    const resp = await axios.get<ServerResponse & { data: Array<Tank> }>(
      urlbase,
      {
        ...options,
      }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting all tanks: ${error}`);
  }
};

const getTankById = async (tankId: string, options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/${tankId}`;
    const resp = await axios.get<ServerResponse & { data: Tank }>(url, {
      ...options,
    });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting tank by ID: ${error}`);
  }
};

const deleteTankById = async (tankId: string, options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}${tankId}`;
    const res = await axios.delete<ServerResponse & { data: Tank }>(url, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to delete a tank");
  }
};

export const TankService = {
  createNewTank,
  updateTank,
  getAllTanks,
  getTankById,
  deleteTankById,
};
