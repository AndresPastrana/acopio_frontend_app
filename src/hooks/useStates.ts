import { StateService } from "../services";
import { useAdminStore } from "../store";

export const useStates = () => {
  const { states, setStates } = useAdminStore(({ states, setStates }) => ({
    states,
    setStates,
  }));
  const loadStates = async () => {
    try {
      // We load by defualt the states of PR by now
      const states = await StateService.getStatesByprovinceId();
      if (states) {
        setStates(states);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { states, loadStates };
};
