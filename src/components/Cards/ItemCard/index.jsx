import { useNavigate } from "react-router-dom";
import { FaEye, FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../../styles/itemCard.css";

export default function ItemCard({ id, name, description, type, publicationDate, url_or_ftp_path }) {
  const navigate = useNavigate();

  // Función para asignar colores según el tipo
  const getBadgeColor = (type) => {
    const cleanType = type.trim().toUpperCase();
    switch (cleanType) {
      case "CSV":
        return "bg-green-200 text-green-800";
      case "GIS":
        return "bg-blue-200 text-blue-800";
      case "PBIX":
        return "bg-yellow-200 text-yellow-800";
      case "XLSX":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  let ftpUrl = import.meta.env.VITE_FTP_SERVER_URL;

  // Corrección: Acceder a "type" y "url_or_ftp_path" desde las props en lugar de "item"
  if (type === "XLSX") {
    ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}xlsx/${url_or_ftp_path}`;
  } else if (type === "CSV") {
    ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}csv/${url_or_ftp_path}`;
  }

  // Función para manejar la descarga con SweetAlert2
  const handleDownload = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a descargar el archivo: ${url_or_ftp_path}`,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = ftpUrl; // Redirige a la URL externa
      }
    });
  };

  const cleanType = type.trim().toUpperCase();

  return (
    <div className="w-full border hover:shadow-lg hover:scale-x-105 hover:scale-y-105 border-gray-300 rounded-lg shadow-sm p-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 items-center transition-transform duration-500 ease-in-out">
      {/* Contenido principal (70%) */}
      <div className="w-auto">
        <h3
          className="font-grotesk cursor-pointer hover:underline inline text-lg font-bold text-[#3e4345]"
          onClick={() => {
            if (cleanType !== "PDF") {
              navigate(`/item/${id}`); // Navega al detalle del ítem si no es PDF
            } else {
              handleDownload(); // Disparar el modal para PDF
            }
          }}
        >
          {name.toUpperCase()}
        </h3>
        <p className="text-sm text-[#677073] mt-2">{description}</p>

        {/* Información del tipo y fecha */}
        <div className="flex items-center gap-2 mt-4">
          <span className={`px-3 py-1 rounded text-sm font-medium ${getBadgeColor(type)}`}>
            {cleanType}
          </span>
          <span className="text-sm text-[#677073] bg-[#f2f7ff] rounded p-1">
            Fecha de publicación: {publicationDate}
          </span>
        </div>
      </div>

      {/* Botones de acciones (30%) */}
      <div className="w-full flex lg:flex-col items-center gap-2 mt-4 lg:mt-0">
        {/* Si el archivo es GIS o PBIX, solo mostrar "Consultar" */}
        {(cleanType === "GIS" || cleanType === "PBIX") && (
          <button
            className="flex items-center gap-2 border border-[#0477AD] text-[#0477AD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6f7ff] transition"
            onClick={() => navigate(`/item/${id}`)}
          >
            Consultar <FaEye />
          </button>
        )}

        {/* Si el archivo es CSV o XLSX, mostrar ambos botones */}
        {(cleanType === "CSV" || cleanType === "XLSX") && (
          <>
            <button
              className="flex items-center gap-2 border border-[#0477AD] text-[#0477AD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6f7ff] transition"
              onClick={() => navigate(`/item/${id}`)}
            >
              Consultar <FaEye />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#0477AD] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a8c] transition"
            >
              Descargar <FaDownload />
            </button>
          </>
        )}

        {/* Si el archivo es PDF, solo mostrar "Descargar" */}
        {cleanType === "PDF" && (
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#0477AD] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a8c] transition"
          >
            Descargar <FaDownload />
          </button>
        )}
      </div>
    </div>
  );
}
