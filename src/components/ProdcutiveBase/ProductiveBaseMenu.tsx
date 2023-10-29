import { FC } from "react";
import { ButtonFactory } from "../ui";

type Props = {
  onClick?: () => void;
};
export const ProductivBaseMenu: FC<Props> = ({ onClick }) => {
  return (
    <div className="basis-2/12 flex justify-between items-center px-3">
      <h2>Productive Bases</h2>
      <menu>
        <ButtonFactory
          onClick={onClick}
          text="Agregar Base Productiva"
          variant="secondary"
        />
      </menu>
    </div>
  );
};
