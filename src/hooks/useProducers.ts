import { MonthContract, Producer, ProducerFormData } from "./../types.d";
import { toast } from "sonner";
import { ProducerService } from "../services"; // Import your ProducerService
import { useSpecialistStore } from "../store/index"; // Import your useSpecialistStore
import useAuth from "./useAuth"; // Import your useAuth hook
import { useProductiveBase } from "./useProductiveBase";

const useProducers = () => {
  const { loggedUser } = useAuth();
  const { activeProductivebase } = useProductiveBase();
  const {
    producers,
    setProducers,
    addProducer,
    updateProducer,
    deleteProducer,
  } = useSpecialistStore(
    ({
      producers,
      setProducers,
      addProducer,
      updateProducer,
      deleteProducer,
    }) => ({
      producers,
      setProducers,
      addProducer,
      updateProducer,
      deleteProducer,
    })
  );

  // This functions recives the id of the producer
  const loadProducers = async () => {
    try {
      activeProductivebase;
      const loadedProducers = await ProducerService.getProducers({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (loadedProducers) {
        setProducers(loadedProducers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertProducerAPI = async (
    producer: ProducerFormData & { months_contracts: MonthContract[] }
  ) => {
    try {
      const newProducer = await ProducerService.createNewProducer(producer, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newProducer) {
        addProducer(newProducer);
        return toast.success(
          `Producer: ${producer.firstname} inserted successfully`
        );
      } else {
        return toast.error("Error inserting producer");
      }
    } catch (error) {
      return toast.error("Error inserting producer");
    }
  };

  const updateProducerAPI = async (
    producer: ProducerFormData & { months_contracts: MonthContract[] }
  ) => {
    try {
      const updatedProducer = await ProducerService.updateProducer(producer, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedProducer) {
        updateProducer(updatedProducer);
        return toast.success(
          `Producer: ${producer.firstname} updated successfully`
        );
      } else {
        return toast.error("Error updating producer");
      }
    } catch (error) {
      return toast.error("Error updating producer");
    }
  };

  const removeProducerAPI = async (producerId: string) => {
    try {
      const deletedProducer = await ProducerService.deleteProducerById(
        producerId,
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        }
      );

      deleteProducer(producerId);
      toast.success(
        `Producer ${deletedProducer.firstname} deleted successfully`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    producers,
    loadProducers,
    insertProducerAPI,
    updateProducerAPI,
    removeProducerAPI,
  };
};

export default useProducers;
