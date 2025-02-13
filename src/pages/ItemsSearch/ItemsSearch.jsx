import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { itemsService } from "../../services/items/itemsService";
import { motion } from "framer-motion";
import { useSectionContext } from "../../context/sectionContext/sectionContext";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/Cards/ItemCard";
import Swal from "sweetalert2";

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

export default function ItemsSearch() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados globales del contexto
  const {
    selectedTheme,
    setSelectedTheme,
    selectedSection,
    setSelectedSection,
  } = useSectionContext();

  // Al cargar la página, obtenemos los datos de búsqueda si los hay
  useEffect(() => {
    if (location.state) {
      setSearchTerm(location.state.searchTerm || "");
      setSearchResults(location.state.results || []);
      validateSectionAndTheme(location.state.results || []);
    }
  }, [location.state]);

  // 📌 Mostrar en consola cada vez que los estados cambian
  useEffect(() => {
    const storedSection = localStorage.getItem("selectedSection");
    const storedTheme = localStorage.getItem("selectedTheme");
  
    if (storedSection) {
      const parsedSection = JSON.parse(storedSection);
      setSelectedSection(parsedSection);
      console.log("🔄 Recuperando selectedSection del localStorage:", parsedSection);
    }
  
    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);
      setSelectedTheme(parsedTheme);
      console.log("🔄 Recuperando selectedTheme del localStorage:", parsedTheme);
    }
  }, []);
  

  // 📌 Función para verificar si todos los ítems pertenecen a la misma sección y tema
  const validateSectionAndTheme = async (items) => {
    if (items.length === 0) return;
  
    try {
      console.log("🟢 Iniciando validación de secciones y temas...");
      console.log("📦 Items recibidos:", items);
  
      const promises = items.map((item) =>
        itemsService.getItemSectionAndTheme(item.id)
      );
      const responses = await Promise.all(promises);
  
      console.log("✅ Respuestas del backend:", responses);
  
      // Extraer todas las secciones y temas únicos
      const uniqueSections = new Set(
        responses.map((res) => res.section?.id || null)
      );
      const uniqueThemes = new Set(
        responses.map((res) => res.theme?.id || null)
      );
  
      console.log("🔍 Secciones únicas encontradas:", uniqueSections);
      console.log("🔍 Temas únicos encontrados:", uniqueThemes);
  
      if (uniqueSections.size === 1 && uniqueThemes.size === 1) {
        console.log("✅ Se encontró una única sección y tema, actualizando...");
        
        // Actualizar el contexto global
        const section = responses[0].section;
        const theme = responses[0].theme;
        
        setSelectedSection(section);
        setSelectedTheme(theme);
  
        // Guardar en localStorage
        localStorage.setItem("selectedSection", JSON.stringify(section));
        localStorage.setItem("selectedTheme", JSON.stringify(theme));
  
        console.log("💾 selectedSection guardado en localStorage:", section);
        console.log("💾 selectedTheme guardado en localStorage:", theme);
      } else {
        console.log("⚠️ Hay múltiples secciones o temas, limpiando estados...");
        
        setSelectedSection(null);
        setSelectedTheme(null);
  
        localStorage.removeItem("selectedSection");
        localStorage.removeItem("selectedTheme");
  
        console.log("🗑 selectedSection y selectedTheme eliminados del localStorage");
      }
    } catch (error) {
      console.error("❌ Error validando secciones y temas:", error);
    }
  };
  

  // 📌 Función para buscar nuevos items
  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      Swal.fire({
        title: "Buscando...",
        text: "Por favor, espera mientras encontramos los resultados.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      try {
        setLoading(true);
        console.log("🔍 Iniciando búsqueda de:", searchTerm);
  
        const results = await itemsService.getItemsByName(searchTerm);
        console.log("✅ Resultados obtenidos:", results);
  
        if (Array.isArray(results) && results.length > 0) {
          console.log("📦 Items encontrados:", results);
          setSearchResults(results);
  
          // Validar si todos los ítems pertenecen a la misma sección y tema
          await validateSectionAndTheme(results);
  
          Swal.close();
        } else {
          console.log(`⚠️ No se encontraron items con el nombre "${searchTerm}"`);
          setSearchResults([]);
          setSelectedSection(null);
          setSelectedTheme(null);
  
          Swal.fire({
            title: "Sin resultados",
            text: `No se encontró ningún dataset con el nombre "${searchTerm}".`,
            icon: "warning",
            confirmButtonText: "Aceptar",
            customClass: { confirmButton: "custom-confirm-button" },
          });
        }
      } catch (error) {
        console.error("❌ Error en la búsqueda de items:", error);
        setSearchResults([]);
        setSelectedSection(null);
        setSelectedTheme(null);
  
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al buscar los items.",
          icon: "error",
          confirmButtonText: "Aceptar",
          customClass: { confirmButton: "custom-confirm-button" },
        });
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="mt-24 w-full h-screen flex items-center flex-col">
      <Breadcrumb
        category={null} // No se necesita categoría para este caso
        theme={null} // Tampoco hay tema
        showTitle={false} // Solo mostramos la flecha para regresar
      />
      <div className="w-[92%]">
        <div className="w-full h-32">
          <div className="w-full h-[45%] flex items-end">
            <h4 className="font-semibold text-[#3e4345] font-grotesk">
              Nombre del dataset
            </h4>
          </div>
          <div className="w-full h-[55%] flex items-end">
            <div className="relative w-full max-w-[500px] mt-24">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Permite buscar con ENTER
                placeholder="Qué dataset buscas?"
                className="w-full py-5 pl-4 pr-10 text-lg rounded-md shadow-lg focus:outline-none text-[#3e4345] placeholder-[#3e4345]"
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={handleSearch} // Permite buscar al hacer clic en la lupa
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 text-gray-400 mr-3 mb-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.55-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Contenedor de resultados con animación */}
          <div className="w-full h-auto mt-10 pb-10">
            <h3 className="text-xl font-grotesk font-semibold text-[#3e4345] mb-3">
              Resultados
            </h3>

            {loading ? (
              <p className="text-gray-500 text-center">Cargando...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-gray-500 text-center">No hay resultados</p>
            ) : (
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {searchResults.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ItemCard
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      type={item.type}
                      publicationDate={item.publication_date}
                      url_or_ftp_path={item.url_or_ftp_path}
                      selectedSection={selectedSection} // Pasamos la sección desde el contexto
                      selectedTheme={selectedTheme} // Pasamos el tema desde el contexto
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
