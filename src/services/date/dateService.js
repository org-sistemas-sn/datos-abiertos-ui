import { API } from "../../api";

export const dateService = {
    getAllDates,
    getDatesByMonthYear
};

// Obtener todas las fechas de eventos
async function getAllDates() {
  try {
    const res = await API.get('/event');
    return res.data;
  } catch (error) {
    console.error('Error al obtener todas las fechas:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Obtener fechas de eventos por mes y año a partir de un objeto Date
async function getDatesByMonthYear(date) {
  try {
    const year = date.getFullYear(); // Extraer el año de la fecha
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Extraer el mes (getMonth() es 0-indexed)

    const res = await API.get(`/event/month-year/${year}/${month}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener fechas de eventos para ${date}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}
