import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { Report } from "../types"; // Import your Report type
import { ServerResponse } from "../types"; // Import your ServerResponse type

const urlbase = getURL(["SERVER", "REPORT"]);

const createNewReport = async (
  report: Omit<Report, "id">,
  options: AxiosRequestConfig
) => {
  try {
    const res = await axios.post<ServerResponse & { data: Report }>(
      urlbase,
      report,
      {
        ...options,
      }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new report");
  }
};

const updateReport = async (report: Report, options: AxiosRequestConfig) => {
  try {
    const { id, ...data } = report;
    const url = `${urlbase}/${id}`;
    const res = await axios.put<ServerResponse & { data: Report }>(url, data, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to update a report");
  }
};

const getAllReports = async (options: AxiosRequestConfig) => {
  try {
    const resp = await axios.get<ServerResponse & { data: Array<Report> }>(
      urlbase,
      {
        ...options,
      }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting all reports: ${error}`);
  }
};

const deleteReportById = async (
  reportId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/${reportId}`;
    const res = await axios.delete<ServerResponse & { data: Report }>(url, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to delete a report");
  }
};

export const ReportService = {
  createNewReport,
  updateReport,
  getAllReports,
  deleteReportById,
};
