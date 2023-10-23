import { FC } from "react";
import { ButtonFactory } from "../ui";
type Props = {
  onClcik?: () => void;
};
export const UsersMenu: FC<Props> = ({ onClcik }) => {
  return (
    <div>
      <h2>Users</h2>
      <menu>
        <ButtonFactory
          onClick={onClcik}
          className="mt-3"
          text="Agregar Specialista"
          variant="secondary"
        />
      </menu>
    </div>
  );
};
