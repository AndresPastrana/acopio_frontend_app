import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { Tank } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["Nombre", "Capacidad", "Address", "State", "Rutas"];

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
  tanks: Array<Tank>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ tanks, hanldeEdit }) => {
  return (
    <TableBody>
      {tanks.map(({ id, address, capacity, name, routes, state }) => {
        return (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{capacity}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{state.name}</TableCell>
            <TableCell>{routes.map((r) => r.name + ",  ")}</TableCell>

            <TableCell>
              <Flex justifyContent="around" className="gap-3">
                <ButtonFactory
                  onClick={() => hanldeEdit(id)}
                  icon={PencilIcon}
                  text="edit"
                  variant="light"
                  color="blue"
                />
                {/* <ButtonFactory
                  onClick={() => handleDelete(id)}
                  icon={TrashIcon}
                  text="delete"
                  variant="light"
                  color="red"
                /> */}
              </Flex>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const TanksTable: FC<TBodyProps> = ({
  tanks = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table>
      <THead />
      <TBody
        tanks={tanks}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
