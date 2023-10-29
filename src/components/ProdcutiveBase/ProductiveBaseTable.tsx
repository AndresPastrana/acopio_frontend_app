import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { ProductiveBase, Route } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["Nombre", "Direccion", "Ruta", "Municipio"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell
            className="bg-tremor-background"
            key={`thpb-${header}`}
          >
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
        <TableHeaderCell
          className="bg-tremor-background text-center"
          key={`thrr-actions`}
        >
          {"Actions".toUpperCase()}
        </TableHeaderCell>
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  productiveBases: Array<ProductiveBase>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({
  productiveBases,
  hanldeEdit,
  handleDelete,
}) => {
  return (
    <TableBody>
      {productiveBases.map(({ id, name, address, route, state }) => {
        return (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>
              {route?.name ? route.name : "Ninguna ruta asignada"}
            </TableCell>
            <TableCell>{state.name}</TableCell>
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

export const ProductiveBasesTable: FC<TBodyProps> = ({
  productiveBases = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table className="basis-10/12  w-full max-h-full mx-auto ">
      <THead />
      <TBody
        productiveBases={productiveBases}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
