import { useState, useEffect } from "react";
import { sectionsService } from "../services/sections/sectionService";

const useSections = () => {
  const [sections, setSections] = useState([]);
  const [loadingSections, setLoadingSections] = useState(true); // Cambiado para evitar colisión
  const [errorSections, setErrorSections] = useState(null); // Cambiado para evitar colisión
  const [reload, setReload] = useState(false); // Para forzar la actualización manual

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoadingSections(true);
        setErrorSections(null);

        const sectionsData = await sectionsService.getAllSections();
        setSections(sectionsData);
      } catch (err) {
        console.error("Error al obtener las secciones:", err);
        setErrorSections(err);
      } finally {
        setLoadingSections(false);
      }
    };

    fetchSections();
  }, [reload]); // Se vuelve a ejecutar cuando reload cambia

  // Función para refrescar las secciones manualmente
  const refreshSections = () => setReload((prev) => !prev);

  return { sections, loadingSections, errorSections, refreshSections };
};

export default useSections;
