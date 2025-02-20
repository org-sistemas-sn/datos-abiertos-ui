import { API } from "../../api";

export const gisDetailsService = {
    getGisDetailsById
};

async function getGisDetailsById(id_item) {
  try {
    const res = await API.get(`/gis-details/${id_item}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener los detalles GIS:', error.response ? error.response.data : error.message);
    throw error;
  }
}
