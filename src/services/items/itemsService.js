import { API } from "../../api";

export const itemsService = {
  getAllItems,
  getItemById,
  getItemsByThemeId,
  getItemFile,
  getItemData,
  getItemsByName, 
  getItemSectionAndTheme
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

async function getItemById(itemId) {
  try {
    const res = await API.get(`/items/${itemId}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener la sección con ID ${itemId}:`, error.response ? error.response.data : error.message);
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

// 📌 Servicio para obtener el archivo de un item
async function getItemFile(itemId) {
  try {
    const res = await API.get(`/items/${itemId}/file`);
    return res.data; // Devuelve el archivo formateado en JSON
  } catch (error) {
    console.error(`Error al obtener el archivo del item con ID ${itemId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getItemData(itemId) {
  try {
    const res = await API.get(`/items/${itemId}/data`);
    return res.data; // Devuelve el archivo formateado en JSON
  } catch (error) {
    console.error(`Error al obtener el archivo del item con ID ${itemId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

// 📌 Nuevo servicio para buscar items por nombre
async function getItemsByName(name) {
  try {
    const res = await API.get(`/items/search`, { params: { name } });
    return res.data;
  } catch (error) {
    console.error(`Error al buscar items con el nombre ${name}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getItemSectionAndTheme(itemId) {
  try {
    const res = await API.get(`/items/${itemId}/section-theme`);
    return res.data; // Devuelve el item con su tema y sección
  } catch (error) {
    console.error(`Error al obtener la sección y el tema del item con ID ${itemId}:`, error.response ? error.response.data : error.message);
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