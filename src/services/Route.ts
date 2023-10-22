import { Route, ServerResponse } from "./../types.d";
import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";

const urlbase = getURL(["SERVER", "ROUTE"]);

const createNewRoute = async (
  route: Omit<Route, "id">,
  options: AxiosRequestConfig
) => {
  try {
    const res = await axios.post<ServerResponse & { data: Route }>(
      urlbase,
      route,
      {
        ...options,
      }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new route");
  }
};

const updateRoute = async (route: Route, options: AxiosRequestConfig) => {
  try {
    const { id, ...data } = route;
    const url = `${urlbase}${id}`;
    const res = await axios.put<ServerResponse & { data: Route }>(url, data, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to update a route");
  }
};

const getAllRoutes = async (options: AxiosRequestConfig) => {
  try {
    const resp = await axios.get<ServerResponse & { data: Array<Route> }>(
      urlbase,
      {
        ...options,
      }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while getting all routes: ${error}`);
  }
};

// const getRouteById = async (routeId: string, options: AxiosRequestConfig) => {
//   try {
//     const url = `${urlbase}/${routeId}`;
//     const resp = await axios.get<ServerResponse & { data: Route }>(url, {
//       ...options,
//     });

//     return resp.data.success ? resp.data.data : null;
//   } catch (error) {
//     console.log(error);
//     throw new Error(`Error while getting route by ID: ${error}`);
//   }
// };

const deleteRouteById = async (
  routeId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/${routeId}`;
    const res = await axios.delete<ServerResponse & { data: Route }>(url, {
      ...options,
    });

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to delete a route");
  }
};

export const RouteService = {
  createNewRoute,
  updateRoute,
  getAllRoutes,
  deleteRouteById,
};
