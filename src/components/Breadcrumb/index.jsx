import { IoArrowBack } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const formatName = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) =>
      word === "y"
        ? "y" // Mantener "y" en minúscula
        : word.charAt(0).toUpperCase() + word.slice(1) // Primera letra en mayúscula
    )
    .join(" ");
};

 const Breadcrumb = ({ category, theme, item, showTitle = true }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#f2f7ff] ${
        showTitle ? "h-32" : "h-16"
      } w-full flex flex-col justify-center items-center`}
    >
      {/* Breadcrumb con flecha y trazado */}
      <div className="w-[93%] max-w-[1600px] h-auto flex items-center pt-5">
        {/* Botón de regreso */}
        <button onClick={() => navigate(-1)} className="flex items-center">
          <IoArrowBack className="mb-5 mr-2" size={32} color="#0477AD" />
        </button>
        {/* Trazado del breadcrumb */}
        {category && (
          <>
            <span className="font-grotesk text-[#677073] mb-5">
              {formatName(category.name)}
            </span>
            <MdOutlineKeyboardDoubleArrowRight
              color="#677073"
              className="ml-1 mb-5"
            />
            <span className="font-grotesk text-[#677073] mb-5">Temas</span>
          </>
        )}
        {theme && (
          <>
            <span className="ml-1 font-semibold text-sn mb-5">/</span>
            <span className="ml-1 font-grotesk text-[#677073] font-semibold text-sn mb-5">
              {theme.name.toUpperCase()}
            </span>
          </>
        )}
        {item && (
          <>
            <span className="ml-1 font-semibold text-sn mb-5">/</span>
            <span className="ml-1 font-grotesk text-[#677073] font-semibold text-sn mb-5">
              {item.name.toUpperCase()}
            </span>
          </>
        )}
      </div>

      {/* Contenido adicional solo si `showTitle` es true */}
      {showTitle && (
        <div className="w-full h-24 flex justify-center">
          <div className="w-[93%] max-w-[1600px] flex items-center">
            {category && (
              <span className="font-grotesk text-[#677073] text-3xl font-semibold text-sn ml-3 lg:text-4xl">
                {formatName(category.name)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Breadcrumb