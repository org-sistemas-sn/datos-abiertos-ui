import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeCard from "../../components/Cards/ThemeCard";
import { categories } from "../../data/categories";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Hace que cada tarjeta entre con un retraso de 0.2s
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Inicia con opacidad 0 y 20px abajo
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CategoryPage = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const category = categories.find((cat) => cat.id === parseInt(id, 10)); // Busca la categoría por ID

  if (!category) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-center text-red-500 text-xl">
          Categoría no encontrada
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      {/* Breadcrumb */}
      <div className="h-32 w-full bg-[#f2f7ff] flex flex-col justify-end md:h-40 md:pt-0 md:mt-0 md:pb-8 md:pl-1 lg:pl-10 lg:h-48 lg:justify-center lg:items-center">
        <div className="w-full max-w-[1600px] flex justify-center items-center flex-col">
          <div className="w-full flex items-center md:pl-2">
            <div className="w-16 pl-6 md:mt-2 h-full flex justify-center items-end mb-6 md:mb-0">
              <Link to={"/"}>
                <IoArrowBack className="mb-1 lg:mb-5" size={32} color="#0477AD" />
              </Link>
            </div>
            <div className="w-auto flex items-center md:mt-10 lg:mt-0">
              <span className="font-grotesk pl-2 pb-1 text-[#677073] text-sm md:text-base">
                {category.label}
              </span>
              <MdOutlineKeyboardDoubleArrowRight
                color="#677073"
                className="ml-1 mb-1"
              />
              <span className="font-grotesk text-[#677073] pb-1 text-sm md:text-base">
                Temas
              </span>
            </div>
          </div>
          <div className="w-full pl-6 pt-5 pb-3 md:pt-8">
            <span className="text-3xl font-grotesk text-sn font-semibold md:text-5xl md:pl-4">
              {category.label}
            </span>
          </div>
        </div>
      </div>

      {/* Títulos */}
      <div className="w-full h-auto mt-6 md:mt-8 max-w-[1600px]">
        <div className="w-full flex items-center lg:mt-10 flex justify-center items-center">
          <div className="w-[89%]">
          <span className="font-semibold font-grotesk text-[#677073] text-lg md:text-xl">
            TEMAS
          </span>
          </div>
        </div>
      </div>

      {/* Contenedor de Temas */}
      <div className="w-full h-auto flex justify-center pb-20 max-w-[1600px]">
        <div className="w-[89%] max-w-[1400px]">
          {category.themes && category.themes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {category.themes.map((theme) => (
                <motion.div key={theme.id} variants={itemVariants}>
                  <ThemeCard
                    label={theme.label}
                    description={theme.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="mt-8 text-center text-gray-500">
              <p>No hay temas relacionados para esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
