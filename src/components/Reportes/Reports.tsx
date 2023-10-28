import { useEffect, useMemo, useState } from "react";
import useReports from "../../hooks/useReports";
import { Flex, Select, SelectItem, TextInput, Title } from "@tremor/react";
import { ReportsTable } from "./ReportsTable";
import { utils, writeFile } from "xlsx";
import { monthsContractsDefault } from "../../const";
import { ButtonFactory } from "../ui";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const Reports = () => {
  const { loadReports, reports } = useReports();

  const months = useMemo(() => {
    return monthsContractsDefault.map((c) => c.month);
  }, [monthsContractsDefault]);

  // Filters
  const [filters, setFilter] = useState<{
    month: string;
    search: string;
  }>({
    month: "",
    search: "",
  });
  const { month, search } = filters;

  // This will containt a filtered list
  const [filteredReports, setfilteredReports] = useState(reports);

  const dowlnloadPDF = () => {
    const data = filteredReports.map(
      ({ id, createdAt, dayli_collect, type_milk, producer }) => {
        const dateInfo = new Date(createdAt).toLocaleString().split(", ");
        return {
          code: id,
          productor: producer?.firstname || "Left the db",
          fecha: dateInfo[0],
          hora: dateInfo[1],
          leche: type_milk,
          cantidad: dayli_collect,
        };
      }
    );
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Dates");
    writeFile(workbook, "Presidents.xlsx", {
      compression: true,
    });
  };
  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    setfilteredReports(reports);
  }, [reports]);

  useEffect(() => {
    let tempFilterList = reports;

    // Filter by month
    if (month !== "") {
      tempFilterList = tempFilterList.filter((report) => {
        const { createdAt } = report;
        const monthNumber = new Date(createdAt).getMonth() + 1;

        return monthNumber.toString() === month;
      });
    }

    // Filter by search term
    if (search !== "") {
      const regexp = new RegExp(search, "i");
      tempFilterList = tempFilterList.filter(({ producer }) => {
        return regexp.test(producer?.firstname);
      });
    }

    if (tempFilterList.length === 0) {
      return setfilteredReports(reports);
    }

    return setfilteredReports(tempFilterList);
  }, [month, search]);
  return (
    <div className="mt-6">
      <Flex justifyContent="between" className="mt-10 mb-5 pr-2">
        <Title>Reports </Title>

        <div className="flex gap-2 items-center">
          <Select
            value={month}
            onChange={(e) => {
              setFilter({ ...filters, month: e });
            }}
            placeholder="Select a month"
            className="max-w-[200px] [&>ul]:max-h-[150px] scroll-smooth "
          >
            {months.map((m, index) => {
              return (
                <SelectItem
                  value={(index + 1).toString()}
                  key={crypto.randomUUID()}
                >
                  {m}
                </SelectItem>
              );
            })}
          </Select>
          <TextInput
            placeholder="Search"
            className="max-h-[33.91px]"
            onChange={(e) => {
              const searchParam = e.target.value;
              setFilter({ ...filters, search: searchParam });
            }}
          />
          <ButtonFactory
            variant="primary"
            icon={DocumentArrowDownIcon}
            onClick={dowlnloadPDF}
            text=""
            className="max-h-[34px]"
          />
        </div>
      </Flex>

      <ReportsTable reports={filteredReports} />
      {/* TODO ADD BUTTON TO GENERATE EXCEL HERE */}
    </div>
  );
};

export default Reports;
