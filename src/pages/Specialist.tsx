import { Link, Outlet } from "react-router-dom";
import { Dashboard, Header } from "../components/common/index";

const Specialist = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <section className="basis-11/12 flex ">
        <Dashboard>
          <Link to="producers">Productores</Link>
          <Link to="reports">Partes</Link>
          <Link to="stadistics">Cumplimmiento</Link>
        </Dashboard>
        <div className="bg-green-500 basis-9/12">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Specialist;
