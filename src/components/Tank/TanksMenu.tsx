import { FC } from "react";
import { ButtonFactory } from "../ui";
type Props = {
  onClcik?: () => void;
};
export const TanksMenu: FC<Props> = ({ onClcik }) => {
  return (
    <div>
      <h2>Tanuqes</h2>
      <menu>
        <ButtonFactory
          onClick={onClcik}
          className="mt-3"
          text="Agregar Tanque"
          variant="secondary"
        />
      </menu>
    </div>
  );
};
