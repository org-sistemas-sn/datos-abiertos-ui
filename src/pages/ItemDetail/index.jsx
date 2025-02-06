import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { useSectionContext } from "../../context/sectionContext/sectionContext";

const ItemDetail = () => {
  const { id } = useParams();
  const itemId = parseInt(id, 10);

  const { selectedTheme, selectedSection } = useSectionContext();

  // Buscar el ítem dentro del tema actual
  const item = selectedTheme?.items?.find((item) => item.id === itemId);

  // Verificar si no se encontró el ítem
  if (!item) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          El ítem solicitado no fue encontrado.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full h-auto mt-24">
      {/* Breadcrumb con categoría, tema e ítem */}
      <Breadcrumb category={selectedSection} theme={selectedTheme} item={item} showTitle={false} />

      <div className="w-full h-auto flex flex-col items-center mt-10">
        <div className="w-[93%] max-w-[1200px]">
          {/* Título del ítem */}
          <h1 className="text-4xl font-bold text-[#3e4345]">{item.name}</h1>

          {/* Descripción del ítem */}
          <p className="mt-4 text-lg text-gray-600">{item.description}</p>

          {/* Información adicional */}
          <div className="mt-6 p-4 border rounded-lg bg-[#f9fafb]">
            <h2 className="text-2xl font-semibold text-[#3e4345]">Detalles</h2>
            <ul className="mt-2 text-gray-700">
              <li>
                <strong>Tipo:</strong> {item.type.toUpperCase()}
              </li>
              <li>
                <strong>Fecha de subida:</strong> {item.publication_date}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
