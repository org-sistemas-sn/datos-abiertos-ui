import { useParams } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();

  // Aquí puedes realizar una consulta o lógica para obtener los detalles del ítem
  // Ejemplo: Fetch los detalles del ítem usando `id`
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Detalles del ítem</h1>
      <p className="mt-4 text-gray-600">ID del ítem: {id}</p>
      {/* Renderiza más información del ítem aquí */}
    </div>
  );
}
