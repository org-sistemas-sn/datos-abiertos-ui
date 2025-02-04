import { categories } from "../../data/categories";
import CategoryHomeCard from "../../components/Cards/CategoryHomeCard";
import Breadcrumb from "../../components/Breadcrumb"; // Importamos el Breadcrumb
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};



export default function Categories() {
  return (
    <div className="mt-24 w-full h-auto flex flex-col items-center">
      {/* Breadcrumb con solo la flecha */}
      <Breadcrumb
        category={null} // No se necesita categoría para este caso
        theme={null} // Tampoco hay tema
        showTitle={false} // Solo mostramos la flecha para regresar
      />

      {/* Título */}
      <div className="w-[89%] max-w-[1400px] mb-8 lg:mt-12">
        <h1 className="font-grotesk text-2xl mt-6 ml-1 font-semibold text-[#3e4345]">
          Categorías
        </h1>
      </div>

      {/* Contenedor de categorías con animación */}
      <div className="w-full flex justify-center">
        <div className="w-[89%] max-w-[1400px]">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link to={`/themes/${category.id}`}>
                  <CategoryHomeCard
                    icon={category.icon}
                    label={category.label}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
