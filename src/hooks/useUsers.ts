import { toast } from "sonner";
import { UserService } from "../services";
import { useAdminStore } from "../store";
import useAuth from "./useAuth";
import { UserFormData } from "../types";
export const useUsers = () => {
  const { loggedUser } = useAuth();
  const { addUser, editUser, removeUser, setUsers, users } = useAdminStore(
    ({ users, setUsers, addUser, removeUser, editUser }) => ({
      users,
      addUser,
      setUsers,
      editUser,
      removeUser,
    })
  );
  const loadUsers = async () => {
    try {
      // Use the UserService function to get users, passing the user's access token
      const users = await UserService.getUsersByRole({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (users) {
        // Handle the retrieved users, e.g., set them in a state
        return setUsers(users);
      }
      toast.error("Error while trying to get users");
    } catch (error) {
      console.log(error);
      toast.error("Error while trying to get users");
    }
  };
  const insertUserAPI = async (user: UserFormData) => {
    try {
      // Use the UserService function to insert a user, passing the user data and access token
      const newUser = await UserService.insertUser(user, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newUser) {
        addUser(newUser);
        toast.success("User inserted successfully");
      } else {
        toast.error("Error inserting user");
      }
    } catch (error) {
      toast.error("Error inserting user");
    }
  };
  const updateUserAPI = async (user: UserFormData) => {
    try {
      // Use the UserService function to update a user, passing the user data and access token
      const updatedUser = await UserService.updateUser(user, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedUser) {
        editUser(updatedUser);
        toast.success("User updated successfully");
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };
  const deleteUserAPI = async (userId: string) => {
    try {
      // Use the UserService function to delete a user by their ID, passing the access token
      const success = await UserService.deleteUser(userId, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (success) {
        removeUser(userId);
        toast.success("User deleted successfully");
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting user");
    }
  };

  return { users, loadUsers, insertUserAPI, updateUserAPI, deleteUserAPI };
};
