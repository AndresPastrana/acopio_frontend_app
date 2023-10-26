import { useEffect, useRef, useState } from "react";
import useProducers from "../../hooks/useProducers";
import { ProducerTable } from "./ProducerTable";
import { ProducerMenu } from "./ProducersMenu";
import { FormMode } from "../../const";
import { MonthContract, Producer, ProducerFormData } from "../../types";
import ProducerForm from "./ProducerForm";
import { findById } from "../../helper";

const Producers = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);
  const [activeProducer, setActiveProducer] = useState<ProducerFormData | null>(
    null
  );

  const [months_contracts, setMonthsContratcs] = useState<
    MonthContract[] | null
  >(null);

  const {
    producers,
    loadProducers,
    insertProducerAPI,
    updateProducerAPI,
    removeProducerAPI,
  } = useProducers();

  const handleBtnAddNew = () => {
    setActiveProducer(null);
    setMonthsContratcs(null);

    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };
  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const producer = findById(id, producers);
    if (producer) {
      const {
        second_surename,
        productive_base,
        age,
        secondname,
        months_contracts,
        ...withNoContratcs
      } = producer;
      setMonthsContratcs(months_contracts);
      setActiveProducer({ ...withNoContratcs });
      setOpen(true);
    }
  };

  const handleSubmit = async (
    producer: ProducerFormData & { months_contracts: MonthContract[] }
  ) => {
    if (mode === FormMode.insert) {
      return await insertProducerAPI(producer);
    }
    if (mode === FormMode.edit) {
      return await updateProducerAPI(producer);
    }
    return;
  };

  const handldeDelete = async (id: string) => {
    await removeProducerAPI(id);
    if (activeProducer) {
      setActiveProducer(null);
      setMonthsContratcs(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };
  const onModalClose = () => {
    setOpen(false);
    setMonthsContratcs(null);
    setActiveProducer(null);
    setMode(FormMode.insert);
  };

  useEffect(() => {
    loadProducers();
  }, []);
  return (
    <>
      <ProducerMenu onClcik={handleBtnAddNew} />
      <ProducerTable
        producers={producers}
        handleDelete={handldeDelete}
        hanldeEdit={handleBtnEdit}
      />
      <ProducerForm
        activeProducer={activeProducer}
        open={open}
        mode={mode}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
        months_contracts={months_contracts}
      />
    </>
  );
};

export default Producers;
