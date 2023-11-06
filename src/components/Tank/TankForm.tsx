import {
  TextInput,
  Select,
  SelectItem,
  Callout,
  NumberInput,
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TanksFormData } from "../../types";
import { FC, useEffect, useMemo } from "react";
import { useStates } from "../../hooks/useStates";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRoutes } from "../../hooks/useRoutes";

const initDefaultValues: TanksFormData = {
  address: "",
  capacity: 0,
  id: "",
  name: "",
  routes: [],
  state: "",
};

type Props = {
  activeTank: TanksFormData | null;
  onSubmitAction: (destiny: TanksFormData) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const TanksForm: FC<Props> = ({
  activeTank = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";
  // Get the states list from the store
  const { states, loadStates } = useStates();

  const { routes, loadRoutes } = useRoutes();

  // Form data
  const initData = useMemo(() => {
    return activeTank ? activeTank : initDefaultValues;
  }, [activeTank]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TanksFormData>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<TanksFormData> = (data) => {
    onSubmitAction(data);
  };

  useEffect(() => {
    loadStates();
    loadRoutes();
  }, []);

  useEffect(() => {
    reset(initData);
  }, [activeTank]);
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Tanques</h2>
        <section className="h-full basis-3/12">
          <article className="max-w-[400px] mx-auto p-5 flex flex-col gap-3">
            <Controller
              name="name"
              control={control}
              rules={{ required: { value: true, message: "name is required" } }}
              render={({ field }) => (
                <TextInput placeholder="Name" {...field} />
              )}
            />
            {errors.name && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.name.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <Controller
              name="capacity"
              control={control}
              rules={{
                required: { value: true, message: "Capacity is required" },
              }}
              render={({ field }) => (
                <NumberInput placeholder="Capacidad" {...field} />
              )}
            />
            {errors.capacity && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.capacity.message || " invalid value"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="address"
              control={control}
              rules={{
                required: { value: true, message: "Address is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="Address" {...field} />
              )}
            />
            {errors.address && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.address.message || " invalid value"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="state"
              control={control}
              rules={{
                required: { value: true, message: "State is required" },
              }}
              render={({ field }) => (
                <Select
                  placeholder="Municipio"
                  className="[&>ul]:max-h-[100px]"
                  {...field}
                >
                  {states.map((s) => (
                    <SelectItem value={s.id}>{s.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.state && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.state.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <Controller
              name="routes"
              control={control}
              rules={{
                required: { value: true, message: "Routes is required" },
              }}
              render={({ field }) => (
                <MultiSelect
                  placeholder="Routes"
                  className="[&>ul]:max-h-[100px]"
                  {...field}
                >
                  {routes.map((s) => (
                    <MultiSelectItem value={s.id}>{s.name}</MultiSelectItem>
                  ))}
                </MultiSelect>
              )}
            />
            {errors.routes && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.routes.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <ButtonFactory className="mt-24" type="submit" text={btnText} />
          </article>
        </section>
      </form>
    </Modal>
  );
};
