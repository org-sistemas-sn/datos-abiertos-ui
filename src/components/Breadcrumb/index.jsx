import { IoArrowBack } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSectionContext } from "../../context/sectionContext/sectionContext";


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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { hasOneTheme } = useSectionContext();

  console.log(hasOneTheme)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoBack = () => {
    if(hasOneTheme){
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={`bg-[#f2f7ff] ${
        showTitle && !isMobile ? "h-32" : "h-16"
      } w-full flex flex-col justify-center items-center`}
    >
      {/* Breadcrumb con flecha y trazado */}
      <div className="w-[93%] max-w-[1600px] h-auto flex items-center pt-5 relative z-10">
        {/* Botón de regreso */}
        <button
          onClick={handleGoBack}
          className="flex items-center cursor-pointer p-2"
        >
          <IoArrowBack
            className="mb-5 mr-2 ml-3 md:ml-0"
            size={32}
            color="#0477AD"
          />
        </button>

        {/* Mostrar breadcrumb solo si no es móvil */}
        {!isMobile && (
          <>
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
          </>
        )}
      </div>

      {/* Contenido adicional solo si `showTitle` es true y no es móvil */}
      {showTitle && !isMobile && (
        <div className="w-full h-24 flex justify-center">
          <div className="w-[93%] max-w-[1600px] flex items-center">
            {category && (
              <span className="font-grotesk text-[#677073] text-3xl font-semibold text-sn ml-3 lg:text-4xl lg:ml-10 lg:mb-3">
                {formatName(category.name)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
