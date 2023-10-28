import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MilkType, ReportFormData } from "../../types.d.js";
import { FormMode } from "../../const";
import { FC, useEffect } from "react";
import { Callout, NumberInput, Select, SelectItem } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import useProducers from "../../hooks/useProducers";

type Props = {
  onSubmitAction: (report: ReportFormData) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

const initDefaultValues: ReportFormData = {
  type_milk: MilkType.cold,
  dayli_collect: 0,
  producer: "",
};

export const ReportForm: FC<Props> = ({
  mode,
  onSubmitAction,
  open,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";
  const { producers, loadProducers } = useProducers();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ReportFormData>({
    defaultValues: initDefaultValues,
  });

  const onSubmit: SubmitHandler<ReportFormData> = (data) => {
    alert(JSON.stringify(data));
    onSubmitAction(data);
  };

  useEffect(() => {
    loadProducers();
  }, []);
  useEffect(() => {
    if (!open) {
      reset(initDefaultValues);
    }
  }, [open]);

  return (
    <Modal
      hasCloseBtn={true}
      onClose={onClose}
      open={open}
      className="overflow-hidden p-5 rounded-lg max-w[300px] max-h-[800px]"
    >
      <div>
        <h2 className="mb-6 mt-2">Create Report</h2>
        <form
          className="max-w-md mx-auto flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="type_milk"
            control={control}
            rules={{
              required: { value: true, message: "Tipo de leche is required" },
            }}
            render={({ field }) => (
              <Select
                placeholder="Tipo de leche"
                className="[&>ul]:max-h-[100px]"
                {...field}
              >
                <SelectItem defaultChecked value={MilkType.hot}>
                  {MilkType.hot.toUpperCase()}
                </SelectItem>
                <SelectItem value={MilkType.cold}>
                  {MilkType.cold.toUpperCase()}
                </SelectItem>
              </Select>
            )}
          />
          {errors.type_milk && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.type_milk.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="producer"
            control={control}
            rules={{
              required: { value: true, message: "Producer  is required" },
            }}
            render={({ field }) => (
              <Select
                placeholder="Productor"
                className="[&>ul]:max-h-[100px]"
                {...field}
              >
                {producers.map((producer) => {
                  return (
                    <SelectItem key={producer.id} value={producer.id}>
                      {producer.firstname}
                    </SelectItem>
                  );
                })}
              </Select>
            )}
          />
          {errors.producer && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.producer.message || "Error"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}

          <Controller
            name="dayli_collect"
            control={control}
            rules={{
              required: { value: true, message: "dayli_collect is required" },
            }}
            render={({ field }) => (
              <NumberInput placeholder="Recolectado" {...field} />
            )}
          />
          {errors.dayli_collect && (
            <Callout
              className="mt-1 px-3 py-1 border-none"
              title={errors.dayli_collect.message || " invalid value"}
              icon={ExclamationCircleIcon}
              color="rose"
            />
          )}
          <ButtonFactory text={btnText} className="w-full mt-5" />
        </form>
      </div>
    </Modal>
  );
};
