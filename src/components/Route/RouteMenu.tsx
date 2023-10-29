import { FC } from "react";
import { ButtonFactory } from "../ui";
type Props = {
  onClick?: () => void;
};
export const RouteMenu: FC<Props> = ({ onClick }) => {
  return (
    <div className="basis-2/12 flex justify-between items-center px-3">
      <h2>Rutas</h2>
      <menu>
        <ButtonFactory
          onClick={onClick}
          className="mt-3"
          text="Agregar Ruta"
          variant="secondary"
        />
      </menu>
    </div>
  );
};
