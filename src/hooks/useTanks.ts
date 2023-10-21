import { toast } from "sonner";
import { TankService } from "../services/index";
import { useAdminStore } from "../store";
import useAuth from "./useAuth";
import { Tank } from "../types";

export const useTanks = () => {
  const { tanks, addTank, removeTank, setTanks, editTank } = useAdminStore(
    ({ tanks, setTanks, addTank, editTank, removeTank }) => ({
      addTank,
      removeTank,
      tanks,
      setTanks,
      editTank,
    })
  );

  const { loggedUser } = useAuth();

  const loadTanks = async () => {
    try {
      const tanks = await TankService.getAllTanks({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (tanks) {
        setTanks(tanks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertTankAPI = async (tank: Tank) => {
    try {
      const newTank = await TankService.createNewTank(tank, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newTank) {
        addTank(newTank);
        return toast.success(`Tank inserted successfully`);
      }
      return toast.error("Error inserting tank");
    } catch (error) {
      return toast.error("Error inserting tank");
    }
  };

  const editTankAPI = async (tank: Tank) => {
    try {
      const updatedTank = await TankService.updateTank(tank, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedTank) {
        editTank(updatedTank);
        return toast.success(`Tank updated successfully`);
      }
      return toast.error("Error updating tank");
    } catch (error) {
      return toast.error("Error updating tank");
    }
  };

  const removeTankAPI = async (tankId: string) => {
    try {
      const deletedTank = await TankService.deleteTankById(tankId, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (deletedTank) {
        removeTank(deletedTank.id);
        toast.success(`Tank deleted successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting tank");
    }
  };

  return {
    tanks,
    loadTanks,
    insertTankAPI,
    editTankAPI,
    removeTankAPI,
  };
};
