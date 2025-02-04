import { useParams } from "react-router-dom";
import { categories } from "../../data/categories";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/Cards/ItemCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Aparece cada tarjeta con un intervalo de 0.2s
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Aparece con desplazamiento hacia arriba
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

  // Función para asignar colores a las tarjetas según el tipo
  const getBadgeColor = (type) => {
    const cleanType = type.trim().toUpperCase(); // Limpiar espacios y normalizar a mayúsculas
    switch (cleanType) {
      case "CSV":
        return "bg-green-200 text-green-800";
      case "TXT":
        return "bg-blue-200 text-blue-800";
      case "PDF":
        return "bg-red-200 text-red-800";
      case "PBIX":
        return "bg-yellow-200 text-yellow-800";
      case "XLS":
        return "bg-orange-200 text-orange-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  

  // Extraer tipos únicos para evitar duplicados
  const uniqueTypes = [...new Set(theme.items?.map((item) => item.type))];

  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      {/* Breadcrumb */}
      <Breadcrumb category={category} theme={theme} showTitle={false} />

      {/* Título y descripción del tema */}
      <div className="w-full flex justify-center max-w-[1600px]">
        <div className="w-[92%] pt-4">
          <h2 className="font-grotesk text-3xl font-semibold text-[#3e4345]">
            {theme.label.toUpperCase()}
          </h2>
          <div className="w-full pt-1 font-semibold text-[#677073]">
            {theme.description}
          </div>

          {/* Tarjetas de tipos de archivos (únicas) */}
          <div className="flex flex-wrap gap-2 mt-4">
            {uniqueTypes.map((type, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded text-sm font-medium ${getBadgeColor(
                  type
                )}`}
              >
                {type.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Tarjetas de los items con animación escalonada */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {theme.items?.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <ItemCard
                  label={item.label}
                  description={item.description}
                  type={item.type}
                  uploadDate={item.upload_date}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThemeItems;
