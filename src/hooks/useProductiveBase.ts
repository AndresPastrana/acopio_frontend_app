import { toast } from "sonner";
import { ProductiveBaseService } from "../services";
import { useAdminStore } from "../store";
import { ProductiveBase } from "../types";
import useAuth from "./useAuth";

export const useProductiveBase = () => {
  const {
    productiveBases,
    addProductiveBase,
    removeProductiveBase,
    setProductiveBases,
    editProductiveBase,
  } = useAdminStore(
    ({
      productiveBases,
      setProductiveBases,
      addProductiveBase,
      editProductiveBase,
      removeProductiveBase,
    }) => ({
      addProductiveBase,
      removeProductiveBase,
      productiveBases,
      setProductiveBases,
      editProductiveBase,
    })
  );

  const { loggedUser } = useAuth();

  const loadProductiveBases = async () => {
    try {
      const productiveBases = await ProductiveBaseService.getAllProductiveBases(
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        }
      );
      if (productiveBases) {
        setProductiveBases(productiveBases);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertProductiveBaseAPI = async (productiveBase: ProductiveBase) => {
    try {
      const newProductiveBase =
        await ProductiveBaseService.createNewProductiveBase(productiveBase, {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        });
      if (newProductiveBase) {
        addProductiveBase(newProductiveBase);
        return toast.success(`Productive Base inserted successfully`);
      }
      return toast.error("Error inserting Productive Base");
    } catch (error) {
      return toast.error("Error inserting Productive Base");
    }
  };

  const editProductiveBaseAPI = async (productiveBase: ProductiveBase) => {
    try {
      const updatedProductiveBase =
        await ProductiveBaseService.updateProductiveBase(productiveBase, {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        });
      if (updatedProductiveBase) {
        editProductiveBase(updatedProductiveBase);
        return toast.success(`Productive Base updated successfully`);
      }
      return toast.error("Error updating Productive Base");
    } catch (error) {
      return toast.error("Error updating Productive Base");
    }
  };

  const removeProductiveBaseAPI = async (productiveBaseId: string) => {
    try {
      const deletedProductiveBase =
        await ProductiveBaseService.deleteProductiveBaseById(productiveBaseId, {
          headers: {
            Authorization: `Bearer ${loggedUser?.access_token}`,
          },
        });
      if (deletedProductiveBase) {
        removeProductiveBase(deletedProductiveBase.id);
        toast.success(`Productive Base deleted successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Productive Base");
    }
  };

  return {
    productiveBases,
    loadProductiveBases,
    insertProductiveBaseAPI,
    editProductiveBaseAPI,
    removeProductiveBaseAPI,
  };
};
