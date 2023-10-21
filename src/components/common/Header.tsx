import useAuth from "../../hooks/useAuth";
// import { Bars3Icon } from "@heroicons/react/24/outline";
// import { ButtonFactory } from "../ui/Button";
import { UserRole } from "../../const";
export const Header = () => {
  const { loggedUser } = useAuth();
  return (
    <header className="p-3 basis-1/12 flex justify-between items-center">
      <section className="flex items-center gap-7">
        {/* <ButtonFactory
          color="neutral"
          icon={Bars3Icon}
          variant="light"
          text=""
        /> */}
        <img
          className="rounded-full w-32"
          src="../assets/img/logo.jpg"
          alt=""
        />
      </section>
      <section className="flex justify-center items-center gap-4">
        <span
          className="flex items-center justify-center p-5 border-neutral-200 border-[0.1px]"
          style={{
            borderRadius: "50%",
          }}
        >
          {loggedUser?.role?.charAt(0)?.toUpperCase()}
        </span>
        <p className="text-base">
          {loggedUser?.role === UserRole.Admin ? "Admin" : "Specialist"}
        </p>
      </section>
    </header>
  );
};
