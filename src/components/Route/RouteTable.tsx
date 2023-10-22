import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { Route } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["Nombre"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell key={`thrr-${header}`}>
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  routes: Array<Route>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ routes, hanldeEdit, handleDelete }) => {
  return (
    <TableBody>
      {routes.map(({ id, name }) => {
        return (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>

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
      })}
    </TableBody>
  );
};

export const RoutesTable: FC<TBodyProps> = ({
  routes = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table>
      <THead />
      <TBody
        routes={routes}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
