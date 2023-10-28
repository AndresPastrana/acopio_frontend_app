import { FC, useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { monthsContractsDefault } from "../../const";
import { Card, Flex, Select, SelectItem, Subtitle, Title } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { ProducerService } from "../../services";
import { toast } from "sonner";

type Stadistics = {
  total: number;
  cumplidores: number;
  no_cumplidores: number;
};

type GraphicProps = {
  data: Stadistics;
};

const Stadistics = () => {
  const { loggedUser } = useAuth();

  const months = useMemo(() => {
    return monthsContractsDefault.map((c) => c.month);
  }, [monthsContractsDefault]);

  const [month, setMonth] = useState<string>(() => months[0]);

  const [stadistics, setstadistics] = useState<Stadistics>({
    total: 0,
    cumplidores: 0,
    no_cumplidores: 0,
  });

  const handleChange = (e: any) => {
    setMonth(e);
  };

  useEffect(() => {
    ProducerService.getStadistics(month, {
      headers: { Authorization: `Bearer ${loggedUser?.access_token}` },
    })
      .then((data) => {
        const { totalProducers, compliantWorkers, nonCompliantWorkers } = data;
        setstadistics({
          cumplidores: compliantWorkers,
          no_cumplidores:
            compliantWorkers + nonCompliantWorkers < totalProducers
              ? totalProducers - (nonCompliantWorkers + nonCompliantWorkers)
              : nonCompliantWorkers,
          total: totalProducers,
        });
      })
      .catch((error) => {
        const err = error as Error;
        toast.error(err.message);
      });
    // Set the state
  }, [month]);

  return (
    <div className="pt-12">
      <Flex flexDirection="row" justifyContent="between" className="px-3">
        <Title>Cumplimento por mes</Title>
        <Select
          value={month}
          onChange={handleChange}
          placeholder="Select a month"
          className="max-w-[200px] [&>ul]:max-h-[150px] scroll-smooth"
        >
          {months.map((m) => {
            return (
              <SelectItem
                defaultChecked={month === m}
                value={m}
                key={crypto.randomUUID()}
              />
            );
          })}
        </Select>
      </Flex>
      <Graphic data={stadistics} />
    </div>
  );
};

// Graphic

const Graphic: FC<GraphicProps> = ({ data }) => {
  const transformData = [
    {
      name: "Cumplidores",
      cant: data.cumplidores,
    },
    {
      name: "Resagados",
      cant: data.no_cumplidores,
    },
  ];

  return (
    <>
      <Card className="max-w-lg mt-6">
        <DonutChart
          className="mt-6"
          data={transformData}
          category="cant"
          index="name"
          colors={["violet", "amber"]}
        />
        <Subtitle>
          Trabajadores :{" "}
          <span className="text-tremor-content-strong">{data.total}</span>
        </Subtitle>
      </Card>
    </>
  );
};

export default Stadistics;
