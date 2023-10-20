import { useContext } from "react";
import { AuthContext, LogedUser } from "../context/Auth";
import { AuthService } from "../services";
import { User } from "../types";
import { decodeJWT } from "../helper/jwt";
import { toast } from "sonner";

const useAuth = () => {
  const { user: loggedUser, setUser } = useContext(AuthContext);
  const login = async (data: Pick<User, "username" | "password">) => {
    try {
      const { username, password } = data;
      const { access_token } = await AuthService.login(username, password);

      if (access_token) {
        const decode_token = decodeJWT(access_token) as LogedUser;
        const auth_user = { ...decode_token, access_token };
        setUser(auth_user); //Loged new user
        toast.success("Login successfull");
        return auth_user;
      }
      // Invalid username or password
      toast.error("Invalid username or password !");
    } catch (error) {
      // Error while login
      toast.error("Error while login !!");
      return false;
    }
    return false;
  };
  const logout = async () => {
    setUser(null);
  };

  return { loggedUser, login, logout };
};

export default useAuth;
