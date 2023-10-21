import { Flex } from "@tremor/react";
import { Slider } from "../components/common/index";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      <header>
        <Flex className="px-4 py-8">
          <span>Logo</span>
          <ul className="flex gap-2 [&>li>a]:text-gray-500 hover:[&>li>a]:text-gray-900 hover:[&>li>a]:transition hover:[&>li>a]:ease-in-out hover:[&>li>a]:delay-150">
            <li>
              <Link to="/login">Inicio</Link>
            </li>
            <li>
              <a>Sistema de Acopio</a>
            </li>
            <li>
              <a>Sobre Nosotros</a>
            </li>
            <li>
              <a>Contactenos</a>
            </li>
          </ul>
        </Flex>
        <Slider images={["foto-1.jpg", "foto-3.jpg"]} />
      </header>
    </>
  );
};
export default Landing;
