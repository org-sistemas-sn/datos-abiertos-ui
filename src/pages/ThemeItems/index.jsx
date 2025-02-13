import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/Cards/ItemCard";
import { itemsService } from "../../services/items/itemsService";
import { themeService } from "../../services/themes/themeService";
import { useSectionContext } from "../../context/sectionContext/sectionContext";
import MoonLoader from "react-spinners/MoonLoader";

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

const ThemeItems = () => {
  const { themeId } = useParams();
  const { selectedTheme, setSelectedTheme, selectedSection, setSelectedSection } = useSectionContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Recuperar el tema guardado en localStorage al montar el componente
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);
      console.log("🔵 Theme recuperado del localStorage:", parsedTheme);
      setSelectedTheme(parsedTheme);
    }

    const fetchThemeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener el tema con todos sus datos
        const themeData = await themeService.getThemeById(themeId);

        // Obtener los items relacionados al themeId
        const itemsData = await itemsService.getItemsByThemeId(themeId);
        setItems(itemsData);

        // Guardar el tema seleccionado con toda la información en el contexto
        const newTheme = {
          id: themeData.id,
          name: themeData.name,
          description: themeData.description,
          id_section: themeData.id_section,
          items: itemsData,
        };

        setSelectedTheme(newTheme);
        localStorage.setItem("selectedTheme", JSON.stringify(newTheme)); // Guardar en localStorage
        console.log("🟢 Theme guardado en localStorage:", newTheme);

        // Si no hay una sección seleccionada, obtener y guardar la sección
        if (!selectedSection || selectedSection.id !== themeData.id_section) {
          const sectionData = await themeService.getSectionById(themeData.id_section);
          setSelectedSection(sectionData);
          localStorage.setItem("selectedSection", JSON.stringify(sectionData)); // Guardar sección en localStorage
          console.log("🟢 Sección guardada en localStorage:", sectionData);
        }
      } catch (err) {
        setError("Error al cargar los datos del tema.");
      } finally {
        setLoading(false);
      }
    };

    fetchThemeData();
  }, [themeId, setSelectedTheme, setSelectedSection]);

  useEffect(() => {
    console.log("🟢 selectedSection:", selectedSection);
    console.log("🟢 selectedTheme:", selectedTheme);
  }, [selectedSection, selectedTheme]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <MoonLoader color="#0477AD" size={50} />
      </div>
    );
  }

  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      {/* Breadcrumb con la sección */}
      <Breadcrumb category={selectedSection} theme={selectedTheme} showTitle={false} />

      {/* Título y descripción del tema */}
      <div className="w-full flex justify-center max-w-[1730px]">
        <div className="w-[92%] pt-4">
          <h2 className="font-grotesk text-3xl font-semibold text-[#3e4345]">
            {selectedTheme?.name?.toUpperCase() || "TEMA"}
          </h2>
          <div className="w-full pt-1 font-semibold text-[#677073]">
            {selectedTheme?.description}
          </div>

          {/* Si el tema no tiene ítems, mostrar un mensaje */}
          {items.length === 0 ? (
            <div className="w-full text-center mt-6 text-gray-500 text-lg font-semibold">
              <p>Este tema no tiene ítems relacionados.</p>
            </div>
          ) : (
            /* Tarjetas de los items con animación escalonada */
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {items.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <ItemCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    type={item.type}
                    publicationDate={item.publication_date}
                    url_or_ftp_path={item.url_or_ftp_path}
                    selectedSection={selectedSection}
                    selectedTheme={selectedTheme}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeItems;
