import { useEffect, useState } from "react";
import { RoutesTable } from "./RouteTable";

import { FormMode } from "../../const";
import { Route } from "../../types";
import { findById } from "../../helper";
import { useRoutes } from "../../hooks/useRoutes";
import { RouteMenu } from "./RouteMenu";
import { RoutesFrom } from "./RouteForm";

export const Routes = () => {
  const { routes, loadRoutes, insertRouteAPI, editRouteAPI, removeRouteAPI } =
    useRoutes();
  // State for handle if the modal is open or not
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);

  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const route = findById(id, routes);
    if (route) {
      setActiveRoute({ id, ...route });
      setOpen(true);
    }
  };

  const handleBtnAddNew = () => {
    if (activeRoute) {
      setActiveRoute(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handldeDelete = async (id: string) => {
    await removeRouteAPI(id);
    if (activeRoute) {
      setActiveRoute(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleSubmit = async (route: Route) => {
    if (mode === FormMode.insert) {
      return await insertRouteAPI(route);
    }
    if (mode === FormMode.edit) {
      return await editRouteAPI(route);
    }
    return;
  };
  const onModalClose = () => {
    setOpen(false);
    setActiveRoute(null);
    setMode(FormMode.insert);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <>
      <RoutesFrom
        mode={mode}
        open={open}
        activeRoute={activeRoute}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
      />
      <RouteMenu onClick={handleBtnAddNew} />
      <RoutesTable
        routes={routes}
        handleDelete={handldeDelete}
        hanldeEdit={handleBtnEdit}
      />
    </>
  );
};
