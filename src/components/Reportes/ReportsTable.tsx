import { FC } from "react";
import { Report } from "../../types";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeaderCell,
  Flex,
} from "@tremor/react";

const THead = () => {
  const ths = ["Cantidad Recolectada", "Productor", "Fecha", "Tipo Leche"];

  return (
    <TableHead>
      <TableRow>
        {ths.map((header) => (
          <TableHeaderCell
            className="bg-tremor-background"
            key={`thd-${header}`}
          >
            {header.toUpperCase()}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TBodyProps = {
  reports: Array<Report>;
};

const TBody: FC<TBodyProps> = ({ reports }) => {
  return (
    <TableBody>
      {reports.map(({ id, createdAt, dayli_collect, producer, type_milk }) => {
        return (
          <TableRow key={id}>
            <TableCell>{dayli_collect.toString()}</TableCell>
            <TableCell>
              {producer?.firstname
                ? producer.firstname
                : "The producer left the PB"}
            </TableCell>
            <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
            <TableCell>{type_milk}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const ReportsTable: FC<TBodyProps> = ({ reports = [] }) => {
  return (
    <Table className="transition ease-in-out delay-1000 grow">
      <THead />
      <TBody reports={reports} />
    </Table>
  );
};
