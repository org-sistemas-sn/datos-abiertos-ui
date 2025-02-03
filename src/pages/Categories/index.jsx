import { categories } from "../../data/categories";
import CategoryHomeCard from "../../components/Cards/CategoryHomeCard";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

export default function Categories() {
  return (
    <div className="mt-24 w-full h-auto flex flex-col items-center">
      {/* Breadcrumb */}
      <div className="h-16 w-full bg-[#f2f7ff] flex flex-col justify-end md:h-40 md:pt-0 md:mt-0 md:pb-8 md:pl-1 lg:pl-10 lg:h-20 lg:justify-center lg:items-center">
        <div className="w-full max-w-[1600px] flex justify-center items-center flex-col">
          <div className="w-full flex items-center md:pl-2">
            <div className="w-16 pl-6 md:mt-2 h-full flex justify-center items-end mb-6 md:mb-0">
              <Link to={"/"}>
                <IoArrowBack
                  className="mt-10 mb-1 lg:mb-5"
                  size={32}
                  color="#0477AD"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

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
                <Link to={`/categoria/${category.id}`}>
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
