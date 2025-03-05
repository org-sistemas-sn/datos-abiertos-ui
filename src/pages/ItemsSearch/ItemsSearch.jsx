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
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados globales del contexto
  const {
    selectedTheme,
    setSelectedTheme,
    selectedSection,
    setSelectedSection,
    searchItem,
    setSearchItem,
  } = useSectionContext();

  // 📌 Actualizar searchItem cuando location.state cambia
  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchItem(location.state.searchTerm);
      setSearchResults(location.state.results || []);
      validateSectionAndTheme(location.state.results || []);
    } else {
      setSearchItem("");
      setSearchResults([]);
    }
  }, [location.state]);

  useEffect(() => {
    const storedSection = localStorage.getItem("selectedSection");
    const storedTheme = localStorage.getItem("selectedTheme");

    if (storedSection) {
      setSelectedSection(JSON.parse(storedSection));
    }
    if (storedTheme) {
      setSelectedTheme(JSON.parse(storedTheme));
    }

    // 📌 Cargar el valor de la búsqueda guardada en el localStorage al montar el componente
    const lastSearchItem = localStorage.getItem("lastSearchItem");
    if (lastSearchItem) {
      setSearchItem(lastSearchItem);
      handleSearch(lastSearchItem); // Llamar a handleSearch si hay un valor en el localStorage
    }
  }, []);

  const validateSectionAndTheme = async (items) => {
    if (items.length === 0) return;

    try {
      const promises = items.map((item) =>
        itemsService.getItemSectionAndTheme(item.id)
      );
      const responses = await Promise.all(promises);

      const uniqueSections = new Set(
        responses.map((res) => res.section?.id || null)
      );
      const uniqueThemes = new Set(
        responses.map((res) => res.theme?.id || null)
      );

      if (uniqueSections.size === 1 && uniqueThemes.size === 1) {
        setSelectedSection(responses[0].section);
        setSelectedTheme(responses[0].theme);
        localStorage.setItem("selectedSection", JSON.stringify(responses[0].section));
        localStorage.setItem("selectedTheme", JSON.stringify(responses[0].theme));
      } else {
        setSelectedSection(null);
        setSelectedTheme(null);
        localStorage.removeItem("selectedSection");
        localStorage.removeItem("selectedTheme");
      }
    } catch (error) {
      console.error("Error validando secciones y temas:", error);
    }
  };

  // 📌 Función de búsqueda mejorada
  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") return;

    // Guardamos el término de búsqueda en el localStorage
    localStorage.setItem("lastSearchItem", searchTerm);

    Swal.fire({
      title: "Buscando...",
      text: "Por favor, espera mientras encontramos los resultados.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      setLoading(true);
      const results = await itemsService.getItemsByName(searchTerm);

      if (Array.isArray(results) && results.length > 0) {
        setSearchResults(results);
        await validateSectionAndTheme(results);
        Swal.close();
      } else {
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
      console.error("Error en la búsqueda de items:", error);
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
  };

  return (
    <div className="mt-24 w-full h-screen flex items-center flex-col">
      <Breadcrumb category={null} theme={null} showTitle={false} />
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
                value={searchItem} // Cambié localStorage.getItem() por searchItem directamente
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e.target.value)}
                placeholder="Qué dataset buscas?"
                className="w-full py-5 pl-4 pr-10 text-lg rounded-md shadow-lg focus:outline-none text-[#3e4345] placeholder-[#3e4345]"
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                onClick={() => handleSearch(searchItem)}
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

          <div className="w-full h-auto mt-10 pb-10">
            <h3 className="text-xl font-grotesk font-semibold text-[#3e4345] mb-3">
              Resultados
            </h3>

            {loading ? (
              <p className="text-gray-500 text-center">Cargando...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-gray-500 text-center">No hay resultados</p>
            ) : (
              <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" variants={containerVariants} initial="hidden" animate="show">
                {searchResults.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ItemCard {...item} />
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
