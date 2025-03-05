import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/Cards/ItemCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import checkCircle from "../../assets/icons/check-circle.png";
import XlsxCsvItemCard from "../../components/Cards/XlsxCsvItemCard";
import { itemsService } from "../../services/items/itemsService";
import { gisDetailsService } from "../../services/gisDetail/gisDetailService";
import Swal from "sweetalert2";

function removeExtension(path) {
  const dotIndex = path.lastIndexOf(".");
  return dotIndex !== -1 ? path.substring(0, dotIndex) : path;
}

const ItemDetail = () => {
  const { id } = useParams();
  const itemId = parseInt(id, 10);
  const navigate = useNavigate();

  console.log(id)

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gisDetails, setGisDetails] = useState(null);
  const [geoItems, setGeoItems] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        console.log("🔄 Solicitando theme del item...");
        const themeData = await itemsService.getThemeByItemId(itemId);
  
        console.log("✅ Theme actualizado desde el servicio:", themeData);
        setSelectedTheme(themeData);
        localStorage.setItem("selectedTheme", JSON.stringify(themeData));
      } catch (error) {
        console.error("❌ Error al obtener el theme del item:", error);
      }
    };
  
    const storedTheme = localStorage.getItem("selectedTheme");
    const storedSection = localStorage.getItem("selectedSection");
  
    if (storedTheme) {
      console.log("ℹ️ Cargando theme desde localStorage...");
      setSelectedTheme(JSON.parse(storedTheme));
    }
  
    if (storedSection) {
      console.log("ℹ️ Cargando sección desde localStorage...");
      setSelectedSection(JSON.parse(storedSection));
    }
  
    // Siempre actualiza la información del tema con la API
    fetchTheme();
  }, [itemId]);
  

  const item = selectedTheme?.items?.find((item) => item.id === itemId);
  const itemExtension = item ? removeExtension(item.url_or_ftp_path) : "";

  useEffect(() => {
    if (item && (item.type === "XLSX" || item.type === "CSV")) {
      itemsService
        .getItemData(itemId)
        .then((data) => {
          setFileData(data);
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

  useEffect(() => {
    if (item?.have_gis_detail === true || item?.have_gis_detail === 1) {
      gisDetailsService
        .getGisDetailsById(item.id)
        .then((data) => {
          setGisDetails(data);
        })
        .catch((error) => {
          console.error("❌ Error al obtener los detalles GIS:", error);
        });
    }
  }, [item]);

  useEffect(() => {
    const fetchGeoItems = async () => {
      if (
        item &&
        item.name === "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS" &&
        item.type === "GIS"
      ) {
        try {
          const geoData = await itemsService.getItemsByThemeId(6);
          const filteredGeoData = geoData.filter((geoItem) => geoItem.type !== "GIS");
  
          // Agrupar ítems por nombre
          const groups = {};
          filteredGeoData.forEach((geoItem) => {
            const name = geoItem.name;
            if (!groups[name]) groups[name] = [];
            groups[name].push(geoItem);
          });
  
          const aggregatedGeoItems = [];
          Object.values(groups).forEach((group) => {
            const mergeable = group.filter((geoItem) => {
              const t = geoItem.type.trim().toUpperCase();
              return t === "CSV" || t === "XLSX";
            });
            const nonMergeable = group.filter((geoItem) => {
              const t = geoItem.type.trim().toUpperCase();
              return !(t === "CSV" || t === "XLSX");
            });
  
            const hasCSV = mergeable.some((geoItem) => geoItem.type.trim().toUpperCase() === "CSV");
            const hasXLSX = mergeable.some((geoItem) => geoItem.type.trim().toUpperCase() === "XLSX");
  
            if (hasCSV && hasXLSX) {
              aggregatedGeoItems.push({
                ...mergeable[0],
                merged: true,
                files: mergeable,
              });
            } else {
              mergeable.forEach((geoItem) => aggregatedGeoItems.push(geoItem));
            }
            nonMergeable.forEach((geoItem) => aggregatedGeoItems.push(geoItem));
          });
  
          setGeoItems(aggregatedGeoItems);
        } catch (error) {
          console.error("❌ Error al obtener geo items:", error);
        }
      }
    };
    fetchGeoItems();
  }, [item]);
  
  

  if (!item) {
    console.error("❌ El item no fue encontrado. Verifica el estado.");
    return (
      <div className="w-full h-screen flex items-center justify-center"></div>
    );
  } 

  if (!item.type) {
    console.error("❌ El tipo de archivo no está definido en item.");
  }

  const handleLoad = () => {
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

  const handleDownload = () => {
    Swal.fire({
      title: "Elige el archivo que deseas descargar",
      html: `
        <button id="download-csv" style="margin: 10px; width: 60px; height: 35px; background-color: #bbf7d0; color: #065f46; padding: 0.25rem 0.75rem; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; border: none; cursor: pointer;">CSV</button>
        <button id="download-xlsx" style="margin: 10px; width: 60px; height: 35px; background-color: #fecaca; color: #7f1d1d; padding: 0.25rem 0.75rem; font-size: 0.875rem; font-weight: 500; border-radius: 0.375rem; border: none; cursor: pointer;">XLSX</button>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      didOpen: () => {
        const popup = Swal.getPopup();
        const cancelButton = popup.querySelector(".swal2-cancel");
        if (cancelButton) {
          cancelButton.style.backgroundColor = "#0477AD";
        }
        const btnCSV = popup.querySelector("#download-csv");
        const btnXLSX = popup.querySelector("#download-xlsx");
        btnCSV.addEventListener("click", () => {
          Swal.close();
          window.location.href = `${
            import.meta.env.VITE_FTP_SERVER_URL
          }csv/${itemExtension}.csv`;
        });
        btnXLSX.addEventListener("click", () => {
          Swal.close();
          window.location.href = `${
            import.meta.env.VITE_FTP_SERVER_URL
          }xlsx/${itemExtension}.xlsx`;
        });
      },
    });
  };

  return (
    <div className="w-full h-auto mt-24 font-grotesk">
      <Breadcrumb
        category={selectedSection}
        theme={selectedTheme}
        item={item}
        showTitle={false}
      />
      <div className="w-full h-auto flex flex-col items-center mt-5 md:mt-10 font-grotesk">
        <div className="w-[93%] max-w-[1600px]">
          {item.type === "GIS" || item.type === "PBIX" ? (
            <>
              <div className="w-full h-[100vh] flex flex-col">
                <h1 className="text-4xl font-bold text-[#3e4345]">
                  {item?.name}
                </h1>
                <p className="mt-4 text-lg text-gray-600">{item?.description}</p>
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
                    {item?.type.toUpperCase()}
                  </span>
                  <span className="w-auto text-sm text-[#677073] bg-[#f2f7ff] rounded px-2 py-1">
                    Fecha de publicación: {item?.publication_date}
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
                  onLoad={handleLoad}
                ></iframe>
              </div>
              <div className="w-full h-auto">
                <div className="w-[100%] pt-10 pb-10 flex flex-wrap h-auto">
                  <div className="lg:w-[50%]">
                    {geoItems?.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <XlsxCsvItemCard {...item} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              {item?.have_gis_detail === 1 ? (
                <div className="w-full">
                  <div className="w-full mt-5 flex items-center">
                    <h4 className="text-xl ml-2 font-bold text-[#3e4345]">
                      INFORMACIÓN DE LUGARES
                    </h4>
                  </div>
                  <div className="flex ml-2 flex-col md:flex-row md:items-center md:gap-x-4 gap-y-3 mt-3">
                    <div className="flex items-center">
                      <div className="rounded-full h-[15px] w-[15px] bg-[#0378ad]"></div>
                      <span className="ml-2 text-[#3e4345]">
                        Gestión Municipal
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full h-[15px] w-[15px] bg-[#34a354]"></div>
                      <span className="ml-2 text-[#3e4345]">
                        Gestión Provincial
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="rounded-full h-[15px] w-[15px] bg-[#c77b0a]"></div>
                      <span className="ml-2 text-[#3e4345]">
                        Gestión Privada
                      </span>
                    </div>
                  </div>
                  <div className="w-full pt-5 pb-5 h-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gisDetails?.map((detail, index) => (
                        <div
                          key={index}
                          className="w-full h-[300px] rounded-md bg-[#f2f7ff] pl-5 pt-5 pb-5 shadow-md"
                        >
                          <div className="w-full h-full">
                            <div className="w-full h-auto flex">
                              <div className="w-[85%] h-full">
                                <h5 className="text-xl text-[#3e4345] font-semibold">
                                  {detail.name}
                                </h5>
                              </div>
                              <div className="w-[15%] flex justify-center items-center">
                                <div
                                  className={`rounded-full h-[20px] w-[20px] ${
                                    detail.management === "Gestión Privada"
                                      ? "bg-[#c77b0a]"
                                      : detail.management ===
                                        "Gestión Provincial"
                                      ? "bg-[#34a354]"
                                      : detail.management ===
                                        "Gestión Municipal"
                                      ? "bg-[#0378ad]"
                                      : "bg-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="w-full h-auto flex mt-3">
                              <div className="w-[50%]">
                                <span className="font-semibold">Horario</span>
                                <br />
                                <span className="text-[#677073]">
                                  {detail.opening_hours}
                                </span>
                              </div>
                              <div className="w-[50%]">
                                <span className="font-semibold">Teléfono</span>
                                <br />
                                <span className="text-[#677073]">
                                  {detail.tel}
                                </span>
                              </div>
                            </div>
                            <div className="w-full h-auto pt-3">
                              <span className="font-semibold">Dirección</span>
                              <br />
                              <span className="text-[#677073]">
                                {detail.location}
                              </span>
                            </div>
                            {detail.smm === true || detail.smm === 1 ? (
                              <div className="w-full h-[60px] flex items-center mt-4">
                                <div className="w-auto h-[30px] bg-[#c4e0ff] rounded-md pl-2 flex items-center">
                                  <span className="text-[14px] text-[#0378ad] font-semibold">
                                    Seguro Médico Municipal Aplicable
                                  </span>
                                  <div className="w-[30px] flex justify-center items-center h-full">
                                    <img
                                      src={checkCircle}
                                      className="object-contain w-[60%] h-[60%]"
                                      alt="checkcircle"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="w-full h-20 flex items-center">
                <h4 className="text-2xl font-semibold text-[#3e4345] mt-2">
                  Información adicional
                </h4>
              </div>
              <div className="mt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Responsable</h3>
                  <p className="text-gray-700">{item?.responsible}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Mantenimiento
                  </h3>
                  <p className="text-gray-700">
                    {item?.maintenance?.split(",").map((name, index) => (
                      <span key={index}>
                        {name.trim()}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Proceso de creación
                  </h3>
                  <p className="text-gray-700">Recolección de datos</p>
                  <p className="text-gray-700">Validación y Limpieza</p>
                  <p className="text-gray-700">Análisis Preliminar</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Etiquetas</h3>
                  <p className="text-gray-700">
                    {selectedSection?.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                  <p className="text-gray-700">
                    {selectedTheme?.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Fecha de publicación
                  </h3>
                  <p className="text-gray-700">{item?.publication_date}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Formato</h3>
                  <p className="text-gray-700">{item?.type}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-[#3e4345]">{item?.name}</h1>
              <p className="mt-4 text-lg text-gray-600">{item?.description}</p>
              <div className="flex md:flex-row md:items-center gap-2 mt-3">
                <span className="w-auto text-sm text-[#677073] bg-[#f2f7ff] rounded px-2 py-1">
                  Fecha de publicación: {item?.publication_date}
                </span>
              </div>
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
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-[#3e4345] mb-4">
                  Últimos 10 registros
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
              <div className="w-full h-20 flex items-center">
                <h4 className="text-2xl font-semibold text-[#3e4345] mt-2">
                  Información adicional
                </h4>
              </div>
              <div className="mt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Responsable</h3>
                  <p className="text-gray-700">{item?.responsible}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Mantenimiento
                  </h3>
                  <p className="text-gray-700">
                    {item?.maintenance?.split(",").map((name, index) => (
                      <span key={index}>
                        {name.trim()}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Proceso de creación
                  </h3>
                  <p className="text-gray-700">Recolección de datos</p>
                  <p className="text-gray-700">Validación y Limpieza</p>
                  <p className="text-gray-700">Análisis Preliminar</p>
                </div>
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
                <div>
                  <h3 className="font-semibold text-[#3e4345]">
                    Fecha de publicación
                  </h3>
                  <p className="text-gray-700">{item?.publication_date}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3e4345]">Formato</h3>
                  <p className="text-gray-700">{item?.type}</p>
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
