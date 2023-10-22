import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import {
  ProductiveBase,
  ProductiveBaseFormData,
  ServerResponse,
} from "../types";

const urlbase = getURL(["SERVER", "PRODUCTIVE_BASE"]);

const createNewProductiveBase = async (
  productiveBase: ProductiveBaseFormData,
  options: AxiosRequestConfig
) => {
  try {
    const { id = null, ...data } = productiveBase;
    const res = await axios.post<ServerResponse & { data: ProductiveBase }>(
      urlbase,
      data,
      { ...options }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new productive base");
  }
};

const updateProductiveBase = async (
  productiveBase: ProductiveBaseFormData,
  options: AxiosRequestConfig
) => {
  try {
    const { id, ...data } = productiveBase;
    const url = `${urlbase}/${id}`;
    const res = await axios.put<ServerResponse & { data: ProductiveBase }>(
      url,
      data,
      { ...options }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to update a productive base");
  }
};

const getAllProductiveBases = async (options: AxiosRequestConfig) => {
  try {
    const resp = await axios.get<
      ServerResponse & { data: Array<ProductiveBase> }
    >(urlbase, { ...options });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting all productive bases: ${error}`);
  }
};

const getProductiveBaseById = async (
  productiveBaseId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/${productiveBaseId}`;
    const resp = await axios.get<ServerResponse & { data: ProductiveBase }>(
      url,
      { ...options }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting a productive base by ID: ${error}`);
  }
};

const deleteProductiveBaseById = async (
  productiveBaseId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/${productiveBaseId}`;
    const res = await axios.delete<ServerResponse & { data: ProductiveBase }>(
      url,
      { ...options }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to delete a productive base");
  }
};

export const ProductiveBaseService = {
  createNewProductiveBase,
  updateProductiveBase,
  getAllProductiveBases,
  getProductiveBaseById,
  deleteProductiveBaseById,
};
