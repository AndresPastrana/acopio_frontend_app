import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MonthContract, ProducerFormData } from "../../types";
import { FormMode, monthsContractsDefault } from "../../const";
import { FC, useEffect, useMemo, useState } from "react";
import { NumberInput, Text, TextInput } from "@tremor/react";
import { ButtonFactory, Modal } from "../ui";

type Props = {
  activeProducer: ProducerFormData | null;
  months_contracts: MonthContract[] | null;
  onSubmitAction: (
    producer: ProducerFormData & { months_contracts: MonthContract[] }
  ) => void;
  mode: FormMode;
  open?: boolean;
  onClose: () => void;
};

const initDefaultValues: ProducerFormData = {
  id: "",
  ci: "",
  firstname: "",
  surename: "",
  cant_animals: 0,
};

const ProducerForm: FC<Props> = ({
  mode,
  activeProducer,
  months_contracts = monthsContractsDefault,
  onSubmitAction,
  open,
  onClose,
}) => {
  const btnText = mode === FormMode.edit ? "Save changes" : "Save";

  // Init forms data
  const initData = useMemo(() => {
    return activeProducer ? activeProducer : initDefaultValues;
  }, [activeProducer]);
  const initContracts = useMemo(() => {
    if (!months_contracts || months_contracts.length === 0) {
      return monthsContractsDefault;
    } else {
      return months_contracts;
    }
  }, [months_contracts]);

  //  States for forms
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProducerFormData>({
    defaultValues: initData,
  });

  // State for handling contraccts
  const [contracts, setContracts] = useState<MonthContract[]>(initContracts);

  const handleChangeContracts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContracts((prev) => {
      const index = contracts.findIndex((c) => c.month === name);
      const parserdCant = value === "" ? 0 : parseInt(value);

      let arr = [...prev];
      arr[index] = {
        month: name,
        cant: parserdCant,
      };
      return arr;
    });
  };

  const onSubmit: SubmitHandler<ProducerFormData> = (data) => {
    onSubmitAction({ ...data, months_contracts: contracts });
  };
  useEffect(() => {
    reset(initData);

    setContracts(initContracts);
  }, [activeProducer]);

  return (
    <Modal
      hasCloseBtn={true}
      onClose={onClose}
      open={open}
      className="overflow-hidden p-5 rounded-lg max-w[300px] max-h-[800px]"
    >
      <div>
        <h2>Add New Producer</h2>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Text className="mb-1">CI :</Text>
            <Controller
              name="ci"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput placeholder="type your ci here" {...field} />
              )}
            />
            {errors.ci && <span>This field is required.</span>}
          </div>

          <div className="mb-4">
            <Text className="mb-1">First Name:</Text>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput placeholder="type your first name here" {...field} />
              )}
            />
            {errors.firstname && <span>This field is required.</span>}
          </div>

          <div className="mb-4">
            <Text className="mb-1">Surename: </Text>
            <Controller
              name="surename"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput placeholder="type your surename here" {...field} />
              )}
            />
            {errors.surename && <span>This field is required.</span>}
          </div>

          <div className="mb-4">
            <Text className="mb-1">Number of Animals:</Text>
            <Controller
              name="cant_animals"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({ field }) => <NumberInput {...field} />}
            />
            {errors.cant_animals && (
              <span>This field is required and must be at least 0.</span>
            )}
          </div>

          {/* Add the "Months Contracts" section as in the previous example */}
          <h3>Months Contracts</h3>
          <div className="max-h-32 overflow-x-hidden overflow-y-scroll">
            <ul className="flex flex-col gap-2">
              {contracts.map(({ month }, index) => {
                return (
                  <li key={month as string}>
                    <Text>{month as string}</Text>
                    <NumberInput
                      required
                      value={contracts[index].cant}
                      name={`${month as string}`}
                      onChange={handleChangeContracts}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <ButtonFactory text={btnText} className="w-full mt-3" />
        </form>
      </div>
    </Modal>
  );
};

export default ProducerForm;
