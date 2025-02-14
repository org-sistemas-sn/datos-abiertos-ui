import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useSectionContext } from "../../context/sectionContext/sectionContext";
import MoonLoader from "react-spinners/MoonLoader";
import { itemsService } from "../../services/items/itemsService";
import Swal from "sweetalert2";

const ItemDetail = () => {
  const { id } = useParams();
  const itemId = parseInt(id, 10);
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fileData, setFileData] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Recuperar `selectedTheme` y `selectedSection` desde localStorage al montar el componente
  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    const storedSection = localStorage.getItem("selectedSection");

    if (storedTheme) {
      setSelectedTheme(JSON.parse(storedTheme));
    }

    if (storedSection) {
      setSelectedSection(JSON.parse(storedSection));
    }
  }, []);

  // Buscar el ítem dentro del tema actual
  const item = selectedTheme?.items?.find((item) => item.id === itemId);

  useEffect(() => {
    if (item && (item.type === "XLSX" || item.type === "CSV")) {
      console.log(`📂 Buscando datos del item (${item.type}): ${itemId}`);

      itemsService
        .getItemData(itemId)
        .then((data) => {
          console.log("✅ Archivo obtenido desde el servicio:", data);
          setFileData(data);

          // 📌 El backend ya trae solo los últimos 10 registros
          if (data?.data && Array.isArray(data.data)) {
            setTableData(data.data);
          }
        })
        .catch((error) => {
          console.error("❌ Error al obtener el archivo:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [item, itemId]);


  const handleLoad = () => {
    console.log("Iframe cargado completamente");
    setIsLoading(false);
  };

  let ftpUrl = import.meta.env.VITE_FTP_SERVER_URL;

  if (item.type === "XLSX") {
    ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}xlsx/${
      item.url_or_ftp_path
    }`;
  } else if (item.type === "CSV") {
    ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}csv/${
      item.url_or_ftp_path
    }`;
  }

  console.log(ftpUrl);

  const handleDownload = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a descargar el archivo: ${item.url_or_ftp_path}`,
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
        window.location.href = ftpUrl;
      }
    });
  };

  return (
    <div className="w-full h-auto mt-24">
      {/* Breadcrumb */}
      <Breadcrumb
        category={selectedSection}
        theme={selectedTheme}
        item={item}
        showTitle={false}
      />

      <div className="w-full h-auto flex flex-col items-center mt-5 md:mt-10 font-grotesk">
        <div className="w-[93%] max-w-[1600px]">
          {/* Condicional para GIS o PBIX */}
          {item.type === "GIS" || item.type === "PBIX" ? (
            <>
              <div className="w-full h-[100vh] flex flex-col">
                <h1 className="text-4xl font-bold text-[#3e4345]">
                  {item.name}
                </h1>
                <p className="mt-4 text-lg text-gray-600">{item.description}</p>

                <div className="flex md:flex-row md:items-center gap-2 mt-3 mb-3">
                  <span
                    className={`w-[50px] px-3 py-1 text-sm font-medium rounded ${
                      item.type.toUpperCase() === "CSV"
                        ? "bg-green-200 text-green-800"
                        : item.type.toUpperCase() === "GIS"
                        ? "bg-blue-200 text-blue-800"
                        : item.type.toUpperCase() === "PBIX"
                        ? "bg-yellow-200 text-yellow-800"
                        : item.type.toUpperCase() === "XLSX"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </span>

                  <span className="w-auto text-sm text-[#677073] bg-[#f2f7ff] rounded px-2 py-1">
                    Fecha de publicación: {item.publication_date}
                  </span>
                </div>

                {isLoading && (
                  <div className="w-full h-[100%] flex items-center justify-center">
                    <MoonLoader color="#0477AD" size={50} />
                  </div>
                )}

                <iframe
                  src={item.url_or_ftp_path}
                  title="Iframe Content"
                  className={`w-full h-full ${isLoading ? "hidden" : "block"}`}
                  frameBorder="0"
                  allowFullScreen
                  onLoad={handleLoad} // Detecta cuando carga el iframe
                ></iframe>
              </div>
              <div className="w-full h-20 flex items-center">
                <h4 className="text-2xl font-semibold text-[#3e4345] mt-2">
                  Información adicional
                </h4>
              </div>
              <div className="mt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Responsable */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Responsable</h3>
                  <p className="text-gray-700">{item.responsible}</p>
                </div>

                {/* Mantenimiento */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Mantenimiento
                  </h3>
                  <p className="text-gray-700">
                    {item.maintenance.split(",").map((name, index) => (
                      <span key={index}>
                        {name.trim()}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>

                {/* Proceso de creación */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Proceso de creación
                  </h3>
                  <p className="text-gray-700">Recolección de datos</p>
                  <p className="text-gray-700">Validación y Limpieza</p>
                  <p className="text-gray-700">Análisis Preliminar</p>
                </div>

                {/* Etiquetas */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Etiquetas</h3>
                  <p className="text-gray-700">
                    {selectedSection.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                  <p className="text-gray-700">
                    {selectedTheme.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>

                {/* Fecha de publicación */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Fecha de publicación
                  </h3>
                  <p className="text-gray-700">22/11/2024</p>
                </div>

                {/* Formato */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Formato</h3>
                  <p className="text-gray-700">{item.type}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Título */}
              <h1 className="text-4xl font-bold text-[#3e4345]">{item.name}</h1>

              {/* Descripción */}
              <p className="mt-4 text-lg text-gray-600">{item.description}</p>

              {/* Contenedor dinámico */}
              <div className="flex md:flex-row md:items-center gap-2 mt-3">
                {/* Etiqueta */}
                <span
                  className={`w-[50px] px-3 py-1 text-sm font-medium rounded ${
                    item.type.toUpperCase() === "CSV"
                      ? "bg-green-200 text-green-800"
                      : item.type.toUpperCase() === "GIS"
                      ? "bg-blue-200 text-blue-800"
                      : item.type.toUpperCase() === "PBIX"
                      ? "bg-yellow-200 text-yellow-800"
                      : item.type.toUpperCase() === "XLSX"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item.type.toUpperCase()}
                </span>

                {/* Fecha de publicación */}
                <span className="w-auto text-sm text-[#677073] bg-[#f2f7ff] rounded px-2 py-1">
                  Fecha de publicación: {item.publication_date}
                </span>
              </div>

              {/* Botón */}
              <div className="mt-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-[#0477AD] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#005a8c] transition"
                >
                  Descargar{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5h15m-10.5-6.75 3 3 3-3m-3-9v12"
                    />
                  </svg>
                </button>
              </div>

              {/* Campos de este recurso */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-[#3e4345] mb-4">
                  Últimos 10 registros del {item.type}
                </h2>

                <div className="overflow-x-auto w-full">
                  {isLoading ? (
                    <div className="w-full h-[30vh] flex justify-center items-center">
                      <MoonLoader color="#0477AD" size={50} />
                    </div>
                  ) : (
                    tableData.length > 0 && (
                      <table className="min-w-full border-collapse border border-gray-200 bg-white rounded-lg">
                        <thead>
                          <tr className="bg-[#f2f7ff]">
                            {/* Renderizar encabezados solo si hay datos */}
                            {tableData.length > 0 &&
                              Object.keys(tableData[0]).map((key, index) => (
                                <th
                                  key={index}
                                  className="border border-gray-200 px-4 lg:px-6 py-2 lg:py-4 text-left font-semibold text-[#3e4345]"
                                >
                                  {key}
                                </th>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className={
                                rowIndex % 2 === 0 ? "bg-[#f9fafb]" : "bg-white"
                              }
                            >
                              {Object.keys(row).map((key, colIndex) => (
                                <td
                                  key={colIndex}
                                  className="border border-gray-200 px-4 lg:px-6 py-2 lg:py-4 text-[#3e4345]"
                                >
                                  {row[key]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  )}
                </div>
              </div>

              {/* Información adicional */}
              <div className="w-full h-20 flex items-center">
                <h4 className="text-2xl font-semibold text-[#3e4345] mt-2">
                  Información adicional
                </h4>
              </div>
              <div className="mt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Responsable */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Responsable</h3>
                  <p className="text-gray-700">{item.responsible}</p>
                </div>

                {/* Mantenimiento */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Mantenimiento
                  </h3>
                  <p className="text-gray-700">
                    {item.maintenance.split(",").map((name, index) => (
                      <span key={index}>
                        {name.trim()}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>

                {/* Proceso de creación */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Proceso de creación
                  </h3>
                  <p className="text-gray-700">Recolección de datos</p>
                  <p className="text-gray-700">Validación y Limpieza</p>
                  <p className="text-gray-700">Análisis Preliminar</p>
                </div>

                {/* Etiquetas */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Etiquetas</h3>
                  <p className="text-gray-700">
                    {selectedSection.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                  <p className="text-gray-700">
                    {selectedTheme.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>

                {/* Fecha de publicación */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Fecha de publicación
                  </h3>
                  <p className="text-gray-700">22/11/2024</p>
                </div>

                {/* Formato */}
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Formato</h3>
                  <p className="text-gray-700">{item.type}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
