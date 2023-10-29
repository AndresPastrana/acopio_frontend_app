import { useEffect, useMemo, useState } from "react";
import useReports from "../../hooks/useReports";
import { Flex, Select, SelectItem, TextInput, Title } from "@tremor/react";
import { ReportsTable } from "./ReportsTable";
import { utils, writeFile } from "xlsx";
import { FormMode, monthsContractsDefault } from "../../const";
import { ButtonFactory } from "../ui";
import {
  DocumentArrowDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { ReportForm } from "./ReportsForm";
import { ReportFormData } from "../../types";

const Reports = () => {
  // State for handle if the modal is open or not
  const [open, setOpen] = useState(false);
  const [mode] = useState<FormMode>(FormMode.insert);

  const { loadReports, reports, insertReportAPI } = useReports();

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

  const handleBtnAddNew = () => {
    if (!open) {
      setOpen(true);
    }
  };
  const onModalClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (report: ReportFormData) => {
    if (mode === FormMode.insert) {
      return await insertReportAPI(report);
    }

    return;
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
    <>
      <Flex justifyContent="between" className="px-4 mt-8">
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
          <ButtonFactory
            variant="primary"
            icon={PlusCircleIcon}
            onClick={handleBtnAddNew}
            text=""
            className="max-h-[34px]"
          />
        </div>
      </Flex>

      <ReportsTable reports={filteredReports} />
      <ReportForm
        mode={mode}
        onClose={onModalClose}
        onSubmitAction={handleSubmit}
        open={open}
      />
    </>
  );
};

export default Reports;
