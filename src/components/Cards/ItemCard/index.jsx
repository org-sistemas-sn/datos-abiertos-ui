import { FaEye, FaDownload } from "react-icons/fa";

export default function ItemCard({ label, description, type, uploadDate }) {
  // Función para asignar colores según el tipo
  const getBadgeColor = (type) => {
    switch (type.toUpperCase()) {
      case "CSV":
        return "bg-green-200 text-green-800";
      case "TXT":
        return "bg-blue-200 text-blue-800";
      case "PDF":
        return "bg-red-200 text-red-800";
      case "ZIP":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="w-full border hover:shadow-lg hover:scale-x-105 hover:scale-y-105 border-gray-300 rounded-lg shadow-sm p-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 items-center transition-transform duration-500 ease-in-out">
      {/* Contenido principal (70%) */}
      <div className="w-auto">
        <h3 className="font-grotesk cursor-pointer hover:underline inline text-lg font-bold text-[#3e4345]">
          {label.toUpperCase()}
        </h3>
        <p className="text-sm text-[#677073] mt-2">{description}</p>

        {/* Información del tipo y fecha */}
        <div className="flex items-center gap-2 mt-4">
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${getBadgeColor(
              type
            )}`}
          >
            {type.toUpperCase()}
          </span>
          <span className="text-sm text-[#677073] bg-[#f2f7ff] rounded p-1">
            Fecha de publicación: {uploadDate}
          </span>
        </div>
      </div>

      {/* Botones de acciones (30%) */}
      <div className="w-full flex lg:flex-col items-center gap-2 mt-4 lg:mt-0">
        <button className="flex items-center gap-2 border border-[#0477AD] text-[#0477AD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6f7ff] transition">
          Consultar <FaEye />
        </button>
        <button className="flex items-center gap-2 bg-[#0477AD] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a8c] transition">
          Descargar <FaDownload />
        </button>
      </div>
    </div>
  );
}
