import { FC } from "react";
import { ButtonFactory } from "../ui";
type Props = {
  onClcik?: () => void;
};
export const ProducerMenu: FC<Props> = ({ onClcik }) => {
  return (
    <div>
      <menu>
        <ButtonFactory
          onClick={onClcik}
          className="mt-3"
          text="Agregar Productor"
          variant="secondary"
        />
      </menu>
    </div>
  );
};
