import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeCard from "../../components/Cards/ThemeCard";
import Breadcrumb from "../../components/Breadcrumb";
import MoonLoader from "react-spinners/MoonLoader";
import { themeService } from "../../services/themes/themeService";
import { sectionsService } from "../../services/sections/sectionService";
import { useSectionContext } from "../../context/sectionContext/sectionContext";

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
  const { selectedSection, setSelectedSection, setSelectedTheme } = useSectionContext();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener la sección por ID y guardarla en el contexto
        const sectionData = await sectionsService.getSectionById(id);
        setSelectedSection(sectionData);

        // Obtener los temas de la sección
        const themesData = await themeService.getThemesBySectionId(id);
        setThemes(themesData);
      } catch (err) {
        setError("Error al cargar los datos de la sección.");
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [id, setSelectedSection]);

  // useEffect para monitorear los cambios en selectedSection y themes
  useEffect(() => {
    console.log("🟢 Sección seleccionada en contexto:", selectedSection);
  }, [selectedSection]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <MoonLoader color="#0477AD" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-center text-red-500 text-xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      {/* Breadcrumb con la sección */}
      <div className="w-full h-auto flex flex-col items-center">
        <Breadcrumb category={selectedSection} showTitle={true} />
      </div>

      {/* Títulos */}
      <div className="w-full h-auto mt-6 md:mt-8 max-w-[1730px]">
        <div className="w-full flex items-center lg:mt-10 flex justify-center">
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
          {themes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  variants={itemVariants}
                  onClick={() => setSelectedTheme(theme)} // Guarda el tema seleccionado en el contexto
                >
                  <Link to={`/themes/${id}/${theme.id}`}>
                    <ThemeCard name={theme.name} description={theme.description} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="mt-8 text-center text-gray-500">
              <p>No hay temas relacionados para esta sección.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Themes;
