import { Flex, Icon, Title } from "@tremor/react";
import { Slider } from "../components/common/index";
import { Link } from "react-router-dom";
import Articule from "../components/common/Articule";
import {
  BuildingOfficeIcon,
  MapIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
const Landing = () => {
  return (
    <>
      <header>
        <Flex className="px-4 py-8">
          <span>
            <img
              className="max-w-[100px]"
              src="../../assets/img/logo.jpg"
              alt="Primavera logo"
            />
          </span>
          <menu className="[&>li>a]:text-sm flex gap-2 [&>li>a]:text-gray-500 hover:[&>li>a]:text-gray-900 hover:[&>li>a]:transition hover:[&>li>a]:ease-in-out hover:[&>li>a]:delay-150">
            <li>
              <Link to="/login">Inicio</Link>
            </li>
            <li>
              <Link to="#">Sistema de Acopio</Link>
            </li>
            <li>
              <Link to="#">Sobre Nostros</Link>
            </li>
            <li>
              <Link to="#">Contactanos</Link>
            </li>
          </menu>
        </Flex>
        <Slider
          images={[
            "sld-1.jpg",
            "sld-2.jpg",
            "sld-3.jpg",
            "sld-4.jpg",
            "sld-5.jpg",
            "sld-6.jpg",
          ]}
        />
      </header>
      <main>
        <section className="flex flex-col gap-5">
          <Title className="max-w-fit mx-auto my-9 py-2 border-b border-gray-400">
            Sistema de Acopio
          </Title>
          <Articule
            text="Un productor es el encargadod de asegurar que la leche recolectada cumpla con los estandares de calidad y seguridad alimentaria establecidos.
          Debe garantizar que la leche acopiada este en optimas condiciones  de conservacion durante su transporte y almacenamiento, evitando su contaminacion
          "
            titule="Productor"
            image="../../assets/img/producer.jpg"
          />
          <Articule
            text="La base productiva en el acopio de la leche se refiere a las instalaciones y recursos necesarios para llevar a cabo la recoleccion y almacenamiento de la leche. Incluye tambie los centros de acopio deonde se recibe y clasifican las diferentes entregas de leche"
            titule="Base Productiva"
            image="../../assets/img/base_productiva.jpg"
            order_image="1"
            order_text="2"
          />
          <Articule
            text="En el proceso de acopio de la leche un tanque se refiere a un recipiente o contenedor utilzado para almacenar y enfriar la leche recolectada de las fincas ganaderas. Suelen ser de acero inoxidable y estan disenadas para que la leche este en condiciones optimas de temperatura y conservacion"
            titule="Tanques"
            image="../../assets/img/tanques.jpg"
          />
        </section>
        <section></section>
      </main>
      <footer className="bg-green-800 flex justify-between px-5 py-10 text-white">
        {/* <span className="max-w-xs">
          <img src="../../assets/img/logo.jpg" alt="Logo Primavera" />
        </span> */}
        <ul className="max-w-lg text-sm ">
          <h2 className="pl-[6px] mb-4 font-light">Where to contact us ?</h2>
          <li className="flex items-center text-sm">
            <span>
              <Icon icon={MapIcon} color="gray" />
            </span>
            <p className="text-center">
              Lacteo Pinar, km 1{"(1/2)"} Carretera a Aereopuerto Alvaro Barba,
              Pinar del Rio
            </p>
          </li>
          <li className="flex items-center text-sm">
            <span>
              <Icon icon={PhoneIcon} color="gray" />
            </span>
            <p className="text-center">48506758</p>
          </li>
          <li className="flex items-center text-sm">
            <span>
              <Icon icon={BuildingOfficeIcon} color="gray" />
            </span>
            <Link to={"mailto:informatico@lactoepr.alinet.cu"}>Email</Link>
          </li>
          <li></li>
        </ul>
      </footer>
    </>
  );
};
export default Landing;
