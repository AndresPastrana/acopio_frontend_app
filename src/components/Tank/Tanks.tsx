import { useEffect, useState } from "react";
import { useTanks } from "../../hooks/useTanks";
import { TanksMenu } from "./TanksMenu";
import { TanksTable } from "./TanksTable";
import { FormMode } from "../../const";
import { TanksFormData } from "../../types";
import { findById } from "../../helper";
import { TanksForm } from "./TankForm";

export const Tanks = () => {
  const { loadTanks, tanks, insertTankAPI, removeTankAPI, editTankAPI } =
    useTanks();
  // State for handle if the modal is open or not
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);

  const [activeTank, setActiveTank] = useState<TanksFormData | null>(null);

  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const tank = findById(id, tanks);
    if (tank) {
      const trimed: TanksFormData = {
        ...tank,
        id,
        state: tank.state._id,
        routes: tank.routes.map((t) => t._id),
      };
      setActiveTank(trimed);
      setOpen(true);
    }
  };

  const handleBtnAddNew = () => {
    if (activeTank) {
      setActiveTank(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handldeDelete = (id: string) => {
    removeTankAPI(id);
    if (activeTank) {
      setActiveTank(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleSubmit = async (tank: TanksFormData) => {
    if (mode === FormMode.insert) {
      return await insertTankAPI(tank);
    }
    if (mode === FormMode.edit) {
      return await editTankAPI(tank);
    }
    return;
  };
  const onModalClose = () => {
    setOpen(false);
    setActiveTank(null);
    setMode(FormMode.insert);
  };

  useEffect(() => {
    loadTanks();
  }, []);

  return (
    <>
      <TanksForm
        mode={mode}
        open={open}
        activeTank={activeTank}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
      />
      <TanksMenu onClcik={handleBtnAddNew} />
      <TanksTable
        tanks={tanks}
        hanldeEdit={handleBtnEdit}
        handleDelete={handldeDelete}
      />
    </>
  );
};
