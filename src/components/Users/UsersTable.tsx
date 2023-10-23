import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";
import { User } from "../../types";
import { FC } from "react";
import { ButtonFactory } from "../ui";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const THead = () => {
  const ths = ["Nombre", "Apellido", "Role", "Username", "BP a Cargo"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell key={`thu-${header}`}>
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  users: Array<User>;
  hanldeEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

const TBody: FC<TBodyProps> = ({ users, hanldeEdit, handleDelete }) => {
  return (
    <TableBody>
      {users.map(
        ({
          id,
          firstname,
          surename,
          username,
          role,
          productiveBaseInCharge,
        }) => {
          return (
            <TableRow key={id}>
              <TableCell>{firstname}</TableCell>
              <TableCell>{surename}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>
                {productiveBaseInCharge
                  ? productiveBaseInCharge.name
                  : "No Asign"}
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

export const UserTable: FC<TBodyProps> = ({
  users = [],
  handleDelete,
  hanldeEdit,
}) => {
  return (
    <Table>
      <THead />
      <TBody
        users={users}
        handleDelete={handleDelete}
        hanldeEdit={hanldeEdit}
      />
    </Table>
  );
};
