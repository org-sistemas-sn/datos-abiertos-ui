import { useState } from "react";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronDown, FaChevronUp, FaHome, FaWater, FaCar, FaShieldAlt, FaLeaf } from "react-icons/fa"; // Nuevos íconos
import { HiOutlineViewGrid } from "react-icons/hi";
import snMobile from "../../assets/sn-logos/sn-mobile-logo.png";
import snLogo from "../../assets/sn-logos/san-nicolas.logo.png";
import crossIcon from "../../assets/icons/x-circle.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  // Array de objetos para las categorías
  const categories = [
    { name: "General", icon: <HiOutlineViewGrid /> },
    { name: "Salud", icon: <FaLeaf /> },
    { name: "Aguas", icon: <FaWater /> },
    { name: "Licencia", icon: <FaCar /> },
    { name: "Seguridad", icon: <FaShieldAlt /> },
  ];

  return (
    <div>
      {/* Encabezado visible para pantallas grandes */}
      <div className="hidden md:block w-full h-20 bg-sn flex justify-center items-center sticky top-0 z-50"></div>

      {/* Sidebar visible solo para dispositivos móviles */}
      <div className="block md:hidden">
        <div className="w-full h-20 bg-sn flex justify-center items-center sticky top-0 z-50">
          <div className="w-[97%] flex justify-between h-full">
            <div className="w-auto h-full flex items-center">
              <div className="w-20 h-full flex justify-center items-center">
                <img
                  src={snMobile}
                  className="object-contain w-[60%] h-[60%]"
                  alt="snLogo"
                />
              </div>
              <div className="h-[70%] ml-1 border border-white"></div>
              <div className="w-36 h-full flex justify-center items-center">
                <span className="text-white">Datos abiertos</span>
              </div>
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
          className="fixed top-0 left-0 h-full w-full bg-sn shadow-lg z-50 p-4"
        >
          {/* Botón de cierre */}
          <div className="flex justify-between">
            <div className="w-64 h-24 ml-6 flex items-center">
              <img
                src={snLogo}
                className="object-contain w-[70%] h-[70%]"
                alt="Logo San Nicolás"
              />
            </div>
            <div className="w-[55px] h-[50px] flex justify-center items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white w-8 h-8 flex items-center justify-center"
              >
                <img src={crossIcon} alt="Cerrar" />
              </button>
            </div>
          </div>

          {/* Lista de enlaces */}
          <ul className="mt-8 pl-6 text-white space-y-2 text-xl font-medium">
            <li className="flex items-center gap-2 rounded cursor-pointer select-none hover:underline">
              <div className="w-auto h-auto">
                <FaHome className="mb-1" size={22} />
              </div>
              <span className="ml-1 mb-1">Inicio</span>
            </li>
            <li>
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <HiOutlineViewGrid size={22} /> {/* Ícono de Categorías */}
                <span className="hover:underline select-none cursor-pointer">Categorías</span>
                <div className="flex items-center">
                  {isCategoriesOpen ? (
                    <motion.div
                      key="up"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-1"
                    >
                      <FaChevronUp size={12} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-1"
                    >
                      <FaChevronDown size={12} className="text-white" />
                    </motion.div>
                  )}
                </div>
              </div>
              {/* Contenedor con fondo para las categorías con animación */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isCategoriesOpen ? "auto" : 0,
                  opacity: isCategoriesOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-[#2490C6] rounded-lg mt-2"
              >
                <ul className="p-4 space-y-2 text-base">
                  {categories.map((category, index) => (
                    <motion.li
                      key={category.name}
                      variants={itemVariants}
                      initial="hidden"
                      animate={isCategoriesOpen ? "visible" : "hidden"}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 text-white hover:underline select-none cursor-pointer"
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
