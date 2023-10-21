import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import { ButtonFactory } from "../ui";
type Props = typeof ButtonFactory;
export const Logout: Props = ({ ...rest }) => {
  const { logout } = useAuth();
  return (
    <ButtonFactory
      icon={ArrowLeftCircleIcon}
      text="Logout"
      onClick={logout}
      variant="light"
      {...rest}
    />
  );
};
