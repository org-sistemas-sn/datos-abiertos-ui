import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronDown, FaChevronUp, FaHome, FaFileAlt } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import { sectionsService } from "../../services/sections/sectionService";
import saludWhite from "../../assets/icons/salud-white.png"; // Asegúrate de usar el formato de archivo correcto
import snLogo from "../../assets/sn-logos/san-nicolas.logo.png";
import snMobile from "../../assets/sn-logos/sn-mobile-logo.png";
import movilidadWhite from "../../assets/icons/movilidad-white.png";
import descubriWhite from "../../assets/icons/descubri-white.png";
import gisWhite from "../../assets/icons/gis-white.png";
import educacionWhite from "../../assets/icons/educacion-white.png";
import crossIcon from "../../assets/icons/x-circle.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [sections, setSections] = useState([]);

  const ftpUrl = import.meta.env.VITE_FTP_SERVER_URL + "statics/icons/";

  const sectionsIcons = [
    {
      id: 1, // ID de la sección
      icon: saludWhite, // Ruta al ícono correspondiente
    },
    {
      id: 2,
      icon: movilidadWhite,
    },
    {
      id: 3,
      icon: descubriWhite,
    },
    {
      id: 4,
      icon: gisWhite,
    },
    {
      id: 5,
      icon: educacionWhite,
    },
    // Agrega más íconos según corresponda
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sectionsData = await sectionsService.getAllSections();
        setSections(sectionsData);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };

    fetchSections();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Encabezado visible para pantallas grandes */}
      <div className="hidden md:flex w-full h-24 bg-sn justify-center font-grotesk items-center fixed top-0 z-50">
        <div className="w-[93%] h-full flex justify-between max-w-[1600px]">
          <div className="w-80 h-full flex items-center">
            <div className="w-[180px] h-full flex justify-center items-center">
              <Link to={"/"}>
                <img
                  src={snLogo}
                  className="w-[80%] cursor-pointer h-[80%] object-contain select-none"
                  alt="Logo San Nicolás"
                />
              </Link>
            </div>
            <div className="h-[60%] ml-1 border border-white"></div>
            <div className="w-[180px] h-full flex justify-center items-center">
              <Link to={"/"}>
                <span className="text-white text-lg select-none cursor-pointer ml-4">
                  Datos abiertos
                </span>
              </Link>
            </div>
          </div>
          <div className="w-80 h-full flex items-center justify-evenly">
            <Link to={`/categorias`}>
              <span className="text-lg ml-20 mr-8 text-white cursor-pointer select-none hover:underline">
                Categorías
              </span>
            </Link>
            <Link to={`/acerca`}>
              <span className="text-lg text-white cursor-pointer select-none hover:underline">
                Acerca
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar visible solo para dispositivos móviles */}
      <div className="block md:hidden">
        <div className="fixed font-grotesk top-0 w-full h-24 bg-sn flex justify-center items-center z-50">
          <div className="w-[97%] flex justify-between h-full">
            <div className="w-auto h-full flex items-center">
              <Link to={"/"}>
                <div className="w-20 h-full flex justify-center items-center">
                  <img
                    src={snMobile}
                    className="object-contain cursor-pointer select-none w-[55%] h-[55%]"
                    alt="snLogo"
                  />
                </div>
              </Link>
              <div className="h-[60%] ml-1 border border-white"></div>
              <Link to={"/"}>
                <div className="w-36 h-full flex justify-center items-center">
                  <span className="text-white cursor-pointer select-none">
                    Datos abiertos
                  </span>
                </div>
              </Link>
            </div>
            <div className="w-16 h-full pl-2 flex items-center">
              <RxHamburgerMenu
                size={32}
                color="white"
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer select-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar full-width */}
        <motion.div
          initial={{ transform: "translateX(-100%)", opacity: 0 }}
          animate={{
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 22,
            opacity: { duration: 0.6 },
          }}
          className="fixed top-0 left-0 h-full w-full font-grotesk bg-sn shadow-lg z-50 p-4"
        >
          {/* Botón de cierre */}
          <div className="flex justify-between">
            <div className="w-64 h-24 ml-6 flex">
              <img
                src={snLogo}
                className="object-contain w-[70%] h-[70%] select-none"
                alt="Logo San Nicolás"
              />
            </div>
            <div className="w-[55px] h-[50px] flex justify-center items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white select-none w-8 h-8 flex items-center justify-center"
              >
                <img src={crossIcon} className="select-none" alt="Cerrar" />
              </button>
            </div>
          </div>

          {/* Lista de enlaces */}
          <ul className="mt-8 pl-6 text-white space-y-4 text-xl font-medium">
            <li className="flex items-center gap-2 rounded cursor-pointer select-none hover:underline">
              <div className="w-auto h-auto">
                <FaHome className="mb-1" size={22} />
              </div>
              <Link to={"/"} onClick={() => setIsOpen(false)}>
                <span className="ml-1 mb-1">Inicio</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 rounded cursor-pointer select-none hover:underline">
              <div className="w-auto h-auto">
                <FaFileAlt className="mb-1" size={22} />
              </div>
              <Link to={"/acerca"} onClick={() => setIsOpen(false)}>
                <span className="ml-1 mb-1">Acerca</span>
              </Link>
            </li>
            <li>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <HiOutlineViewGrid size={22} />
                <span className="hover:underline select-none cursor-pointer">
                  Categorías
                </span>
                <div className="flex items-center">
                  {isCategoriesOpen ? (
                    <FaChevronUp size={12} className="text-white mt-1" />
                  ) : (
                    <FaChevronDown size={12} className="text-white mt-1" />
                  )}
                </div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isCategoriesOpen ? "auto" : 0,
                  opacity: isCategoriesOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-[#2490C6] rounded-lg mt-2"
              >
                <ul className="p-4 space-y-4 text-base">
                  {sections.map((section, index) => {
                    const icon =
                      sectionsIcons.find((iconObj) => iconObj.id === section.id)
                        ?.icon || `${ftpUrl}default-icon.png`; // Ícono predeterminado si no hay coincidencia

                    return (
                      <motion.li
                        key={section.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-white hover:underline select-none cursor-pointer"
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          <img
                            src={icon}
                            alt={section.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <Link
                          to={`/themes/${section.id}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{section.name}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
