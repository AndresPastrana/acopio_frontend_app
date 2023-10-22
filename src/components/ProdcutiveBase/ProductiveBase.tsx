import { useEffect, useState } from "react";
import { useProductiveBase } from "../../hooks/useProductiveBase";
import { ProductivBaseMenu } from "./ProductiveBaseMenu";
import { ProductiveBasesTable } from "./ProductiveBaseTable";
import { ProductiveBaseForm } from "./ProdictiveBaseForm";
import { FormMode } from "../../const";
import { ProductiveBaseFormData } from "../../types";
import { findById } from "../../helper";

export const ProductiveBase = () => {
  const {
    productiveBases,
    loadProductiveBases,
    insertProductiveBaseAPI,
    editProductiveBaseAPI,
    removeProductiveBaseAPI,
  } = useProductiveBase();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);

  const [activePB, setActivePB] = useState<ProductiveBaseFormData | null>(null);
  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const tank = findById(id, productiveBases);
    if (tank) {
      const trimed: ProductiveBaseFormData = {
        ...tank,
        id,
        state: tank.state._id,
        route: tank.route?._id ?? "",
      };
      setActivePB(trimed);
      setOpen(true);
    }
  };

  const handleBtnAddNew = () => {
    if (activePB) {
      setActivePB(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handldeDelete = (id: string) => {
    removeProductiveBaseAPI(id);
    if (activePB) {
      setActivePB(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };

  const handleSubmit = async (tank: ProductiveBaseFormData) => {
    if (mode === FormMode.insert) {
      return await insertProductiveBaseAPI(tank);
    }
    if (mode === FormMode.edit) {
      return await editProductiveBaseAPI(tank);
    }
    return;
  };
  const onModalClose = () => {
    setOpen(false);
    setActivePB(null);
    setMode(FormMode.insert);
  };

  useEffect(() => {
    loadProductiveBases();
  }, []);

  return (
    <>
      <ProductivBaseMenu onClick={handleBtnAddNew} />
      <ProductiveBaseForm
        activeProductiveBase={activePB}
        mode={mode}
        open={open}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
      />

      <ProductiveBasesTable
        productiveBases={productiveBases}
        handleDelete={handldeDelete}
        hanldeEdit={handleBtnEdit}
      />
    </>
  );
};
