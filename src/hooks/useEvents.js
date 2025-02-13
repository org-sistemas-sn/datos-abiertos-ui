import { useState, useEffect } from "react";
import { dateService } from "../services/date/dateService";

const useEvents = (date) => {
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true); // Cambiado para evitar colisión
  const [errorEvents, setErrorEvents] = useState(null); // Cambiado para evitar colisión

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true);
        setErrorEvents(null);

        const data = await dateService.getDatesByMonthYear(date);
        setEvents(data);

        // Transformar fechas al formato español
        const formattedDates = data.map((event) => {
          const dateObj = new Date(event.date);

          // Obtener día, mes y año
          const day = dateObj.toLocaleDateString("es-ES", { weekday: "long" });
          const month = dateObj.toLocaleDateString("es-ES", { month: "long" });

          // Convertir la primera letra a mayúscula
          const dayFormatted = day.charAt(0).toUpperCase() + day.slice(1);
          const monthFormatted = month.charAt(0).toUpperCase() + month.slice(1);

          return {
            fullDate: dateObj.toLocaleDateString("es-ES", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            day: dayFormatted, // "Martes"
            month: monthFormatted, // "Febrero"
            monthNumber: dateObj.getMonth() + 1, // Se agrega el mes en formato numérico (1-12)
            number: dateObj.getDate().toString(), // "25"
            year: dateObj.getFullYear().toString(), // "2025"
            title: event.title, // Se añade el título del evento
          };
        });

        setHighlightedDates(formattedDates);
        console.log("📅 Fechas transformadas (ES):", formattedDates);
      } catch (err) {
        console.error("Error al cargar eventos:", err);
        setErrorEvents(err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [date]);

  return { events, highlightedDates, loadingEvents, errorEvents };
};

export default useEvents;
