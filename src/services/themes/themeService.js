import { API } from "../../api";

export const themeService = {
  getAllThemes,
  getThemeById,
  getThemesBySectionId
};


async function getAllThemes() {
  try {
    const res = await API.get('/themes');
    return res.data;
  } catch (error) {
    console.error('Error al obtener todas las secciones:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getThemeById(themeId) {
    try {
      const res = await API.get(`/themes/${themeId}`);
      return res.data;
    } catch (error) {
      console.error(`Error al obtener el tema con ID ${themeId}:`, error.response ? error.response.data : error.message);
      throw error;
    }
}

async function getThemesBySectionId(sectionId) {
    try {
      const res = await API.get(`/sections/${sectionId}/themes`);
      return res.data;
    } catch (error) {
      console.error(`Error al obtener los temas de la sección con ID ${sectionId}:`, error.response ? error.response.data : error.message);
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