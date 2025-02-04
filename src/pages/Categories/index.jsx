import { useParams } from "react-router-dom";
import { categories } from "../../data/categories";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/Cards/ItemCard";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ThemeItems = () => {
  const { categoryId, themeId } = useParams();
  const category = categories.find(
    (cat) => cat.id === parseInt(categoryId, 10)
  );
  const theme = category?.themes?.find((th) => th.id === parseInt(themeId, 10));

  if (!category || !theme) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-center text-red-500 text-xl">Tema no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      {/* Breadcrumb */}
      <Breadcrumb category={category} theme={theme} showTitle={false} />

      {/* Título y descripción del tema */}
      <div className="w-full flex justify-center">
        <div className="w-[87%] pt-4">
          <h2 className="font-grotesk text-3xl font-semibold text-[#3e4345]">
            {theme.label.toUpperCase()}
          </h2>
          <div className="w-full pt-1 font-semibold text-[#677073]">
            {theme.description}
          </div>

          {/* Tarjetas de los items en diseño grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {theme.items?.map((item) => (
              <motion.div key={item.id} variants={itemVariants} initial="hidden" animate="show">
                <ItemCard
                  label={item.label}
                  description={item.description}
                  type={item.type}
                  uploadDate={item.upload_date}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeItems;
