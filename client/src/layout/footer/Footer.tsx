import './footer.scss';
import {
  FaSquareYoutube ,
  FaSquareWhatsapp,
  FaSquareInstagram ,
  FaTelegram,
  FaSquareXTwitter,
} from 'react-icons/fa6';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#005DA7] border-[1px] border-[#535353] h-[100%] text-white text-[14px] w-full  py-8 ">
      <div className=" flex justify-between px-10">
        <div className="flex flex-col justify-evenly indent-2 gap-3 w-[25%]">
          <h3 className="textRedHatDisplayRegular text-[#dadada] font-semibold indent-0">
            Contacto
          </h3>
          <p className="textRedHatDisplayRegular">
            Dirección: Capital Federal, Av. Libertador 123
          </p>
          <p className="textRedHatDisplayRegular">Teléfono: +54 1234-5678</p>
          <p className="textRedHatDisplayRegular">
            Correo electrónico: Yenny@rrhh.com
          </p>
          <p className="textRedHatDisplayRegular">
            Horario de atención: Lunes a Viernes de 9:00 a 18:00
          </p>

          <div className=" flex justify-evenly rounded-xl mt-5 px-5">
            <FaSquareYoutube className="text-[29px] cursor-pointer" />

            <FaSquareXTwitter className="text-[29px] cursor-pointer" />

            <FaTelegram className="text-[29px] cursor-pointer" />

            <FaSquareWhatsapp className="text-[29px] cursor-pointer" />

            <FaSquareInstagram className="text-[29px] cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-[25%]">
          <h3 className="textRedHatDisplayRegular text-[#dadada] font-semibold">
            Cuenta
          </h3>
          <Link
            to="/login"
            className="textRedHatDisplayRegular indent-2 hover:font-bold"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="textRedHatDisplayRegular indent-2 hover:font-bold"
          >
            Registrarse
          </Link>
        </div>

        <div className="flex flex-col gap-3 indent-2 w-[25%]">
          <h3 className="textRedHatDisplayRegular text-[#dadada] font-semibold indent-0">
            Información
          </h3>
          <p className="textRedHatDisplayRegular">Acerca de Yenny</p>
          <p className="textRedHatDisplayRegular">Preguntas frecuentes</p>
          <p className="textRedHatDisplayRegular">Términos y condiciones</p>
          <p className="textRedHatDisplayRegular">Política de privacidad</p>
        </div>
      </div>
      <div className="flex justify-end pt-4 px-5 mt-7 border-t-[1px] border-[#ffffff]">
        <p className="textRedHatDisplayRegular text-[#ffffff] text-[12px] hover:text-[#eeeeee]">
          © {new Date().getFullYear()} Yenny. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
