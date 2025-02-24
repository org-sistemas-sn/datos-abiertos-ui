import { useEffect, useState } from "react";
import CategoryHomeCard from "../../components/Cards/CategoryHomeCard";
import { sectionsService } from "../../services/sections/sectionService";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

export default function Categories() {
  const [sections, setSections] = useState([]);

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

  return (
    <div className="mt-24 w-full h-auto flex flex-col items-center">
      {/* Breadcrumb con solo la flecha */}
      <Breadcrumb 
        category={null}
        theme={null}
        showTitle={false}
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
            {sections.map((section) => (
              <motion.div key={section.id} variants={itemVariants}>
                <Link
                  to={
                    section.name === "GIS"
                      ? "/item/10"
                      : `/themes/${section.id}`
                  }
                  onClick={() => {
                    if (section.name === "GIS") {
                      localStorage.setItem(
                        "selectedSection",
                        JSON.stringify({
                          id: 4,
                          name: "GIS",
                          icon_path: "gis.png",
                          enabled: 1,
                          createdAt: "2025-02-07T10:45:56.000Z",
                          updatedAt: "2025-02-07T10:45:56.000Z",
                          deletedAt: null,
                        })
                      );
                      localStorage.setItem(
                        "selectedTheme",
                        JSON.stringify({
                          id: 7,
                          name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                          description:
                            "plataforma de aplicaciones geográficas para la gestión municipal ",
                          id_section: 4,
                          items: [
                            {
                              id: 10,
                              name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                              description:
                                "plataforma de aplicaciones geográficas para la gestión municipal",
                              url_or_ftp_path:
                                "https://experience.arcgis.com/experience/b877e6b58fb6478d81b93da2cdea7774/?draft=true",
                              id_theme: 7,
                              type: "GIS",
                              publication_date: "12/01/2025",
                              responsible:
                                "Secretaría de Innovación y ciudad inteligente",
                              maintenance: "Departamento de Datos & GIS",
                              have_gis_detail: 0,
                              enabled: 1,
                              createdAt: "2025-02-07T11:37:06.000Z",
                              updatedAt: "2025-02-07T11:37:06.000Z",
                              deletedAt: null,
                            },
                          ],
                        })
                      );
                    }
                  }}
                >
                  <CategoryHomeCard
                    icon={section.icon_path}
                    name={section.name}
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
