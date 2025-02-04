import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeCard from "../../components/Cards/ThemeCard";
import { categories } from "../../data/categories";
import Breadcrumb from "../../components/Breadcrumb";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Themes = () => {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === parseInt(id, 10));

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
      <div className="w-full h-auto flex flex-col items-center">
        {/* Breadcrumb con título */}
        <Breadcrumb category={category} showTitle={true} />
      </div>

      {/* Títulos */}
      <div className="w-full h-auto mt-6 md:mt-8 max-w-[1730px]">
        <div className="w-full flex items-center lg:mt-10 flex justify-center items-center">
          <div className="w-[90.5%] max-w-[1730px]">
            <span className="font-semibold font-grotesk text-[#677073] text-lg md:text-xl">
              TEMAS
            </span>
          </div>
        </div>
      </div>

      {/* Contenedor de Temas */}
      <div className="w-full h-auto flex justify-center pb-20 max-w-[1730px]">
        <div className="w-[91%] max-w-[1730px]">
          {category.themes && category.themes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {category.themes.map((theme) => (
                <motion.div key={theme.id} variants={itemVariants}>
                  <Link to={`/themes/${category.id}/${theme.id}`}>
                    <ThemeCard
                      label={theme.label}
                      description={theme.description}
                    />
                  </Link>
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

export default Themes;
