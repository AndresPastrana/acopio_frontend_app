import { Link, Outlet } from "react-router-dom";
import { Dashboard, Header, Logout } from "../components/common/index";
import { useProductiveBase } from "../hooks/useProductiveBase";
import { useEffect } from "react";
import ProductiveBaseInfo from "../components/ProdcutiveBase/ProductiveBaseInfo";
import { ButtonFactory } from "../components/ui";

const Specialist = () => {
  const { loadActiveProductiveBaseAPI, activeProductivebase } =
    useProductiveBase();

  useEffect(() => {
    loadActiveProductiveBaseAPI();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <section className="basis-11/12 flex h-[70vh]">
        <Dashboard>
          <Link to="producers">
            <ButtonFactory text="Productores" variant="light" color="neutral" />
          </Link>

          <Link to="reports">
            <ButtonFactory text="Partes" variant="light" color="neutral" />
          </Link>
          <Link to="stadistics">
            <ButtonFactory
              text="Estadisticas"
              variant="light"
              color="neutral"
            />
          </Link>

          <Logout
            className="justify-start font-extralight mt-8"
            color="neutral"
            size="xs"
          />
        </Dashboard>
        <div className="basis-9/12 h-full flex flex-col gap-3">
          <ProductiveBaseInfo
            data={{
              address: activeProductivebase?.address || "",
              name: activeProductivebase?.name || "",
              route: activeProductivebase?.route.name || "",
              state: activeProductivebase?.state.name || "",
              id: activeProductivebase?.id || "",
            }}
          />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Specialist;
