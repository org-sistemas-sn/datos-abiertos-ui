import { API } from "../../api";

export const itemsService = {
  getAllItems,
  getItemById,
  getItemsByThemeId
};

async function getAllItems() {
  try {
    const res = await API.get('/items');
    return res.data;
  } catch (error) {
    console.error('Error al obtener todas las secciones:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Nuevo servicio para obtener una sección por su ID
async function getItemById(itemId) {
  try {
    const res = await API.get(`/items/${itemId}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener la sección con ID ${sectionId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getItemsByThemeId(themeId) {
    try {
      const res = await API.get(`/themes/${themeId}/items`);
      return res.data;
    } catch (error) {
      console.error(`Error al obtener los temas de la sección con ID ${themeId}:`, error.response ? error.response.data : error.message);
      throw error;
    }
}


/*

async function createSection(sectionData) {
    try {
      if (!sectionData.name) {
        throw new Error('El nombre de la sección es requerido.');
      }
  
      const res = await API.post('/sections/create', { name: sectionData.name });
      return res.data;
    } catch (error) {
      console.error('Error al crear la sección:', error.response ? error.response.data : error.message);
      throw error;
    }
}


async function editSection(sectionData) {
  try {
    if (!sectionData.id) {
      throw new Error('El ID de la sección es requerido.');
    }
    if (!sectionData.name) {
      throw new Error('El nombre de la sección es requerido.');
    }

    const res = await API.put(`/sections/${sectionData.id}`, {
      name: sectionData.name,
      iconLink: sectionData.iconLink, // opcional, solo si está presente en sectionData
      enabled: sectionData.enabled // opcional, solo si está presente en sectionData
    });

    return res.data;
  } catch (error) {
    console.error('Error al editar la sección:', error.response ? error.response.data : error.message);
    throw error;
  }
}

*/