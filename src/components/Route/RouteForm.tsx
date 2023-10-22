import { TextInput, Callout } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Route } from "../../types";
import { FC, useEffect, useMemo } from "react";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const initDefaultValues: Route = {
  id: "",
  name: "",
};

type Props = {
  activeRoute: Route | null;
  onSubmitAction: (route: Route) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const RoutesFrom: FC<Props> = ({
  activeRoute = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";

  // Form data
  const initData = useMemo(() => {
    return activeRoute ? activeRoute : initDefaultValues;
  }, [activeRoute]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Route>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<Route> = (data) => {
    alert(JSON.stringify(data));
    onSubmitAction(data);
  };

  useEffect(() => {
    reset(initData);
  }, [activeRoute]);
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Rutas</h2>
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

            <ButtonFactory className="mt-24" type="submit" text={btnText} />
          </article>
        </section>
      </form>
    </Modal>
  );
};
