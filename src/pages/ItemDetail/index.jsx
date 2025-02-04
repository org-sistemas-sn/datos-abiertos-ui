import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { categories } from "../../data/categories";

const ItemDetail = () => {
  const { id } = useParams();
  const itemId = parseInt(id, 10);

  // Depuración: Mostrar el ID y los datos cargados
  console.log("Buscando item con ID:", itemId);
  console.log("Categorías disponibles:", categories);

  // Buscar la categoría que contiene el ítem
  const category = categories.find(
    (cat) => cat.themes && cat.themes.some((theme) =>
      theme.items && theme.items.some((item) => item.id === itemId)
    )
  );

  // Buscar el tema que contiene el ítem dentro de la categoría encontrada
  const theme = category?.themes?.find((th) =>
    th.items && th.items.some((item) => item.id === itemId)
  );

  // Buscar el ítem dentro del tema encontrado
  const item = theme?.items?.find((it) => it.id === itemId);

  // Verificar si el ítem no existe
  if (!item || !theme || !category) {
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
      <Breadcrumb category={category} theme={theme} item={item} showTitle={false} />

      <div className="w-full h-auto flex flex-col items-center mt-10">
        <div className="w-[93%] max-w-[1200px]">
          {/* Título del ítem */}
          <h1 className="text-4xl font-bold text-[#3e4345]">{item.label}</h1>

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
                <strong>Fecha de subida:</strong> {item.upload_date}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
