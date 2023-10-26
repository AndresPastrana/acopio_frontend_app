import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import {
  ServerResponse,
  Producer,
  ProducerFormData,
  MonthContract,
} from "../../src/types";
// Use the VITE_PRODUCER environment variable
const baseURL = getURL(["SERVER", "PRODUCER"]);

const createNewProducer = async (
  producer: ProducerFormData & { months_contracts: MonthContract[] },
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
    throw new Error("Error while trying to insert a new producer");
  }
};

const updateProducer = async (
  producer: ProducerFormData & { months_contracts: MonthContract[] },
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

// Get all or one producer(s) from a Productive Base
// ?productiveBase=651efdc3710165dfd75b6780&id=all
const getProducers = async (options: AxiosRequestConfig) => {
  try {
    const resp = await axios.get<ServerResponse & { data: Array<Producer> }>(
      baseURL,
      { ...options }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting all producers: ${error}`);
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
  getProducers,
  deleteProducerById,
};
