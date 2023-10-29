import { FC } from "react";
import { ButtonFactory } from "../ui";
type Props = {
  onClcik?: () => void;
};
export const TanksMenu: FC<Props> = ({ onClcik }) => {
  return (
    <div className="basis-2/12 flex justify-between items-center px-3">
      <h2>Tanques</h2>
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
