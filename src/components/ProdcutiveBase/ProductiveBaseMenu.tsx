import { FC } from "react";
import { ButtonFactory } from "../ui";

type Props = {
  onClick?: () => void;
};
export const ProductivBaseMenu: FC<Props> = ({ onClick }) => {
  return (
    <div>
      <h2>Productive Bases</h2>
      <menu>
        <ButtonFactory
          onClick={onClick}
          className="mt-3"
          text="Agregar Base Productiva"
          variant="secondary"
        />
      </menu>
    </div>
  );
};
