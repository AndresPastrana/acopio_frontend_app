import { TextInput, Select, SelectItem, Callout } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Role, UserFormData } from "../../types.d.js";
import { FC, useEffect, useMemo } from "react";
import { FormMode } from "../../const";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useProductiveBase } from "../../hooks/useProductiveBase";

const initDefaultValues: UserFormData = {
  firstname: "",
  id: "",
  password: "",
  productiveBaseInCharge: "",
  role: Role.Specialist,
  surename: "",
  username: "",
};

type Props = {
  activeUser: UserFormData | null;
  onSubmitAction: (user: UserFormData) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

export const UserForm: FC<Props> = ({
  activeUser = null,
  onSubmitAction,
  mode,
  open = false,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";
  // Get the states list from the store
  const { productiveBases, loadProductiveBases } = useProductiveBase();

  // Form data
  const initData = useMemo(() => {
    return activeUser ? activeUser : initDefaultValues;
  }, [activeUser]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: initData,
  });

  // On submit
  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    onSubmitAction(data);
  };

  useEffect(() => {
    loadProductiveBases();
  }, []);

  useEffect(() => {
    reset(initData);
  }, [activeUser]);
  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Usuarios</h2>
        <section className="h-full basis-3/12">
          <article className="max-w-[400px] mx-auto p-5 flex flex-col gap-3">
            <Controller
              name="firstname"
              control={control}
              rules={{
                required: { value: true, message: "firstname is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="Primer Nombre" {...field} />
              )}
            />
            {errors.firstname && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.firstname.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <Controller
              name="surename"
              control={control}
              rules={{
                required: { value: true, message: "surename is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="Apellido" {...field} />
              )}
            />
            {errors.surename && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.surename.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="username"
              control={control}
              rules={{
                required: { value: true, message: "username is required" },
              }}
              render={({ field }) => (
                <TextInput placeholder="Nombre de usuario" {...field} />
              )}
            />
            {errors.username && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.username.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}
            <Controller
              name="password"
              control={control}
              rules={{
                required: { value: true, message: "Pasword is required" },
              }}
              render={({ field }) => (
                <TextInput type="password" placeholder="Password" {...field} />
              )}
            />
            {errors.password && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.password.message || "Error"}
                icon={ExclamationCircleIcon}
                color="rose"
              />
            )}

            <Controller
              name="productiveBaseInCharge"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Productive Base is required",
                },
              }}
              render={({ field }) => (
                <Select
                  placeholder="Base Productiva"
                  className="[&>ul]:max-h-[100px]"
                  {...field}
                >
                  {productiveBases.map((s) => (
                    <SelectItem
                      key={s.id}
                      defaultChecked={
                        s.id === activeUser?.productiveBaseInCharge
                      }
                      value={s.id}
                    >
                      {s.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.productiveBaseInCharge && (
              <Callout
                className="mt-1 px-3 py-1 border-none"
                title={errors.productiveBaseInCharge.message || "Error"}
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
