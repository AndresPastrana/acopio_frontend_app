import { FC } from "react";
import { Producer } from "../../types";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const THead = () => {
  const ths = [
    "CI",
    "Nombre",
    "Apellido",
    "Edad",
    "Animales",
    "Contratos Mensuales",
  ];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell key={`thd-${header}`}>
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  producers: Array<Producer>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ producers, hanldeEdit, handleDelete }) => {
  return (
    <TableBody>
      {producers.map(
        (
          { id, ci, age, firstname, cant_animals, surename, months_contracts },
          indexProducer
        ) => {
          return (
            <TableRow key={id}>
              <TableCell>{ci}</TableCell>
              <TableCell>{firstname}</TableCell>
              <TableCell>{surename}</TableCell>
              <TableCell>{age}</TableCell>
              <TableCell>{cant_animals}</TableCell>
              <TableCell>
                <ul className="max-h-24 overflow-x-auto scroll-smooth">
                  {months_contracts.map((m, indexMonth) => {
                    return (
                      <li
                        key={`${id}${indexProducer}${indexMonth}${
                          m.month as string
                        }`}
                      >
                        <span className="font-light mr-5">
                          {m.month as string}
                        </span>
                        <span className="font-normal mr-5">
                          {m.cant} Litros
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </TableCell>
              <TableCell>
                <Flex justifyContent="around" className="gap-3">
                  <ButtonFactory
                    onClick={() => hanldeEdit(id)}
                    icon={PencilIcon}
                    text="edit"
                    variant="light"
                    color="blue"
                  />
                  <ButtonFactory
                    onClick={() => handleDelete(id)}
                    icon={TrashIcon}
                    text="delete"
                    variant="light"
                    color="red"
                  />
                </Flex>
              </TableCell>
            </TableRow>
          );
        }
      )}
    </TableBody>
  );
};

export const ProducerTable: FC<TBodyProps> = ({
  producers = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table>
      <THead />
      <TBody
        producers={producers}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
