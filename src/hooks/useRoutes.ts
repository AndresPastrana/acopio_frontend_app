import { toast } from "sonner";
import { RouteService } from "../services/index";
import { useAdminStore } from "../store";
import { Route } from "../types";
import useAuth from "./useAuth";

export const useRoutes = () => {
  const { loggedUser } = useAuth();
  const { routes, addRoute, removeRoute, setRoutes, editRoute } = useAdminStore(
    ({ routes, setRoutes, addRoute, editRoute, removeRoute }) => ({
      routes,
      setRoutes,
      addRoute,
      removeRoute,
      editRoute,
    })
  );

  const loadRoutes = async () => {
    try {
      const routes = await RouteService.getAllRoutes({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (routes) {
        setRoutes(routes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertRouteAPI = async (route: Route) => {
    try {
      const newRoute = await RouteService.createNewRoute(route, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newRoute) {
        addRoute(newRoute);
        return toast.success(`Route: ${route.name} inserted successfully`);
      }
      return toast.error("Error inserting route");
    } catch (error) {
      return toast.error("Error inserting route");
    }
  };

  const editRouteAPI = async (route: Route) => {
    try {
      const updatedRoute = await RouteService.updateRoute(route, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedRoute) {
        editRoute(updatedRoute);
        return toast.success(`Route: ${route.name} updated successfully`);
      }
      return toast.error("Error updating route");
    } catch (error) {
      return toast.error("Error updating route");
    }
  };

  const removeRouteAPI = async (routeId: string) => {
    try {
      const deletedRoute = await RouteService.deleteRouteById(routeId, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (deletedRoute) {
        removeRoute(deletedRoute.id);
        toast.success(`Route ${deletedRoute.name} deleted successfully!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    routes,
    loadRoutes,
    insertRouteAPI,
    editRouteAPI,
    removeRouteAPI,
  };
};
