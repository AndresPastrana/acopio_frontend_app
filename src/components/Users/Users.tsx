import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { UserTable } from "./UsersTable";
import { UsersMenu } from "./UsersMenu";
import { UserForm } from "./UserForm";
import { FormMode } from "../../const";
import { UserFormData } from "../../types";
import { findById } from "../../helper";

const Users = () => {
  const { users, loadUsers, insertUserAPI, deleteUserAPI, updateUserAPI } =
    useUsers();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>(FormMode.insert);
  const [activeUser, setActiveUser] = useState<UserFormData | null>(null);

  const handleBtnAddNew = () => {
    if (activeUser) {
      setActiveUser(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
    if (!open) {
      setOpen(true);
    }
  };

  const handleSubmit = async (user: UserFormData) => {
    if (mode === FormMode.insert) {
      return await insertUserAPI(user);
    }
    if (mode === FormMode.edit) {
      return await updateUserAPI(user);
    }
    return;
  };
  const handldeDelete = (id: string) => {
    deleteUserAPI(id);
    if (activeUser) {
      setActiveUser(null);
    }
    if (mode !== FormMode.insert) {
      setMode(FormMode.insert);
    }
  };
  const handleBtnEdit = (id: string) => {
    setMode(FormMode.edit);
    const user = findById(id, users);

    if (user) {
      const trimed: UserFormData = {
        ...user,
        id,
        productiveBaseInCharge: user?.productiveBaseInCharge?._id ?? "",
        password: "",
      };
      setActiveUser(trimed);
      setOpen(true);
    }
  };
  const onModalClose = () => {
    setOpen(false);
    setActiveUser(null);
    setMode(FormMode.insert);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      {/* {JSON.stringify(users)} */}
      <UsersMenu onClcik={handleBtnAddNew} />
      <UserForm
        open={open}
        mode={mode}
        activeUser={activeUser}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
      />

      <UserTable
        users={users}
        handleDelete={handldeDelete}
        hanldeEdit={handleBtnEdit}
      />
    </>
  );
};

export default Users;
