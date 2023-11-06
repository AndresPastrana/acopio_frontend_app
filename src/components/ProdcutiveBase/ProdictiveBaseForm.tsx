import { TextInput, Callout, Select, SelectItem } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ProductiveBaseFormData } from "../../types";
import { FC, useEffect, useMemo } from "react";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRoutes } from "../../hooks/useRoutes";
import { useStates } from "../../hooks/useStates";

const initDefaultValues: ProductiveBaseFormData = {
  id: "",
  name: "",
  address: "",
  route: "",
  state: "",
};

type Props = {
  activeProductiveBase: ProductiveBaseFormData | null;
  onSubmitAction: (route: ProductiveBaseFormData) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const ProductiveBaseForm: FC<Props> = ({
  activeProductiveBase = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const { routes, loadRoutes } = useRoutes();
  const { states, loadStates } = useStates();
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";

  // Form data
  const initData = useMemo(() => {
    return activeProductiveBase ? activeProductiveBase : initDefaultValues;
  }, [activeProductiveBase]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductiveBaseFormData>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<ProductiveBaseFormData> = (data) => {
    onSubmitAction(data);
  };
  useEffect(() => {
    loadRoutes();
    loadStates();
  }, []);

  useEffect(() => {
    reset(initData);
  }, [activeProductiveBase]);
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Bases Productivas</h2>
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
              name="address"
              control={control}
              rules={{
                required: { value: true, message: "Address is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="Direccion" {...field} />
              )}
            />
            {errors.address && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.address.message || "Error"}
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
              name="route"
              control={control}
              rules={{
                required: { value: true, message: "Route is required" },
              }}
              render={({ field }) => (
                <Select
                  placeholder="Ruta"
                  className="[&>ul]:max-h-[100px]"
                  {...field}
                >
                  {routes.map((s) => (
                    <SelectItem value={s.id}>{s.name}</SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.route && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.route.message || "Error"}
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
