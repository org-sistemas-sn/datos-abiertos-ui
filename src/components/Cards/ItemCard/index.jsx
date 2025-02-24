// ItemCard.jsx
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../../styles/itemCard.css";

export default function ItemCard(props) {
  const navigate = useNavigate();

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

  const handleDownload = (file) => {
    let ftpUrl = import.meta.env.VITE_FTP_SERVER_URL;
    const fileType = file.type.trim().toUpperCase();
    if (fileType === "XLSX") {
      ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}xlsx/${
        file.url_or_ftp_path
      }`;
    } else if (fileType === "CSV") {
      ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}csv/${
        file.url_or_ftp_path
      }`;
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a descargar el archivo: ${file.url_or_ftp_path}`,
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

  if (props.merged && props.files) {
    const uniqueTypes = Array.from(
      new Set(props.files.map((file) => file.type.trim().toUpperCase()))
    );
    return (
      <div className="w-full flex border hover:shadow-lg hover:scale-105 border-gray-300 rounded-lg shadow-sm p-4 transition-transform duration-500 ease-in-out justify-between">
        <div className="w-[60%] h-auto">
          <div className="w-full h-auto">
            <h3
              className="font-grotesk cursor-pointer hover:underline inline text-lg font-bold text-[#3e4345]"
              onClick={() => navigate(`/item/${props.id}`)}
            >
              {props.name.toUpperCase()}
            </h3>
          </div>
          <div className="w-full h-auto">
            <p className="text-sm text-[#677073] mt-2">{props.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-[113px] h-auto pt-2 flex justify-between">
              {uniqueTypes.map((type) => {
                const file = props.files.find(
                  (f) => f.type.trim().toUpperCase() === type
                );
                return (
                  <span
                    key={type}
                    onClick={() => handleDownload(file)}
                    className={`cursor-pointer px-3 py-1 rounded text-sm font-medium ${getBadgeColor(
                      type
                    )}`}
                  >
                    {type}
                  </span>
                );
              })}
            </div>
            <div className="pt-2 ml-2">
              <span className="text-sm text-[#677073] bg-[#f2f7ff] rounded p-1">
                Fecha de publicación: {props.publication_date}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex justify-center items-center">
          <button
            className="flex items-center ml-2 gap-2 border border-[#0477AD] text-[#0477AD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6f7ff] transition"
            onClick={() => navigate(`/item/${props.id}`)}
          >
            Consultar
          </button>
        </div>
      </div>
    );
  }

  const cleanType = props.type.trim().toUpperCase();
  let ftpUrl = import.meta.env.VITE_FTP_SERVER_URL;
  if (cleanType === "XLSX") {
    ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}xlsx/${
      props.url_or_ftp_path
    }`;
  } else if (cleanType === "CSV") {
    ftpUrl = `${import.meta.env.VITE_FTP_SERVER_URL}csv/${
      props.url_or_ftp_path
    }`;
  }

  const handleDownloadSingle = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a descargar el archivo: ${props.url_or_ftp_path}`,
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
    <div className="w-full border hover:shadow-lg hover:scale-105 border-gray-300 rounded-lg shadow-sm p-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 items-center transition-transform duration-500 ease-in-out">
      <div className="w-auto">
        <h3
          className="font-grotesk cursor-pointer text-lg font-bold text-[#3e4345] hover:underline"
          onClick={() => {
            if (cleanType !== "PDF") {
              navigate(`/item/${props.id}`);
            }
          }}
        >
          {props.name.toUpperCase()}
        </h3>
        <p className="text-sm text-[#677073] mt-2">{props.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <span
            onClick={
              ["CSV", "XLSX"].includes(cleanType)
                ? () => handleDownloadSingle()
                : undefined
            }
            className={`${
              ["CSV", "XLSX"].includes(cleanType) ? "cursor-pointer" : ""
            } px-3 py-1 rounded text-sm font-medium ${getBadgeColor(
              cleanType
            )}`}
          >
            {props.type}
          </span>
          <span className="text-sm text-[#677073] bg-[#f2f7ff] rounded p-1">
            Fecha de publicación: {props.publication_date}
          </span>
        </div>
      </div>
      <div className="w-full flex lg:flex-col items-center gap-2 mt-4 lg:mt-0">
        {(cleanType === "GIS" || cleanType === "PBIX") && (
          <button
            className="flex items-center gap-2 border border-[#0477AD] text-[#0477AD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6f7ff] transition"
            onClick={() => navigate(`/item/${props.id}`)}
          >
            Consultar
          </button>
        )}
        {(cleanType === "CSV" || cleanType === "XLSX") && (
          <button
            className="flex items-center gap-2 border border-[#0477AD] text-[#0477AD] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6f7ff] transition"
            onClick={() => navigate(`/item/${props.id}`)}
          >
            Consultar
          </button>
        )}
      </div>
    </div>
  );
}
