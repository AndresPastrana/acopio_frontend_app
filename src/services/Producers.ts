import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { ServerResponse, Producer } from "../../src/types";
// Use the VITE_PRODUCER environment variable
const baseURL = getURL(["VITE_PRODUCER"]);

const createNewProducer = async (
  producer: Omit<Producer, "id">,
  options: AxiosRequestConfig
) => {
  try {
    const res = await axios.post<ServerResponse & { data: Producer }>(
      baseURL, // Use the base URL
      producer,
      { ...options }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new producer");
  }
};

const updateProducer = async (
  producer: Producer,
  options: AxiosRequestConfig
) => {
  try {
    const { id, ...data } = producer;
    const url = `${baseURL}/${id}`;
    const res = await axios.put<ServerResponse & { data: Producer }>(
      url,
      data,
      {
        ...options,
      }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to update a producer");
  }
};

const getAllProducers = async (options: AxiosRequestConfig) => {
  try {
    const resp = await axios.get<ServerResponse & { data: Array<Producer> }>(
      baseURL, // Use the base URL
      { ...options }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting all producers: ${error}`);
  }
};

const getProducerById = async (
  producerId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${baseURL}/${producerId}`;
    const resp = await axios.get<ServerResponse & { data: Producer }>(url, {
      ...options,
    });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting producer by ID: ${error}`);
  }
};

const deleteProducerById = async (
  producerId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${baseURL}/${producerId}`;
    const res = await axios.delete<ServerResponse & { data: Producer }>(url, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to delete a producer");
  }
};

export const ProducerService = {
  createNewProducer,
  updateProducer,
  getAllProducers,
  getProducerById,
  deleteProducerById,
};
