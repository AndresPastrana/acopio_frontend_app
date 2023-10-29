import { Link, Outlet } from "react-router-dom";
import { Dashboard, Header, Logout } from "../components/common/index";
import { ButtonFactory } from "../components/ui";

const Admin = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <section className="basis-11/12 flex h-[70vh]">
        {/* Dashboard */}
        <Dashboard>
          <Link to="routes">
            <ButtonFactory text="Rutas" variant="light" color="neutral" />
          </Link>
          <Link to="tanks">
            <ButtonFactory text="Tanques" variant="light" color="neutral" />
          </Link>

          <Link to="prodcutive-bases">
            <ButtonFactory
              text="Bases Productivas"
              variant="light"
              color="neutral"
            />
          </Link>
          <Link to="users">
            <ButtonFactory
              text="Especialistas"
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
        {/* Panel View */}
        <div className="basis-9/12 h-full flex flex-col gap-3">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Admin;
