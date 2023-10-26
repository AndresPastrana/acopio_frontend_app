import { Link, Outlet } from "react-router-dom";
import { Dashboard, Header, Logout } from "../components/common/index";
import { useProductiveBase } from "../hooks/useProductiveBase";
import { useEffect } from "react";
import ProductiveBaseInfo from "../components/ProdcutiveBase/ProductiveBaseInfo";

const Specialist = () => {
  const { loadActiveProductiveBaseAPI, activeProductivebase } =
    useProductiveBase();

  useEffect(() => {
    loadActiveProductiveBaseAPI();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <section className="basis-11/12 flex ">
        <Dashboard>
          <Link to="producers">Productores</Link>
          <Link to="reports">Partes</Link>
          <Link to="stadistics">Cumplimmiento</Link>

          <Logout
            className="justify-start font-extralight mt-8"
            color="neutral"
            size="xs"
          />
        </Dashboard>
        <div className="basis-9/12">
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
