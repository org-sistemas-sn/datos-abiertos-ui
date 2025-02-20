export default function CategoryHomeCard({ icon, name }) {
  // Obtener la URL base desde las variables de entorno
  const baseUrl = import.meta.env.VITE_FTP_SERVER_URL;
  
  // Construir la URL completa de la imagen
  const imageUrl = `${baseUrl}/statics/icons/${icon}`;

  // Función para formatear el nombre
  const formatName = (text) => {
    if (!text) return "";

    return text
      .split(" ")
      .map((word) => 
        word.toUpperCase() === "GIS"
          ? "GIS" // Mantener "GIS" en mayúsculas
          : word === "y"
          ? "y" // Mantener "y" en minúscula
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Primera letra en mayúscula
      )
      .join(" ");
  };

  return (
    <div className="max-w-[450px] lg:max-w-[350px] flex items-center cursor-pointer select-none p-4 md:p-0 md:h-20 md:w-full bg-white border rounded-lg shadow transition-transform duration-500 ease-in-out hover:shadow-lg hover:scale-105 lg:h-[100px]">
      {/* Contenedor del ícono */}
      <div className="flex w-full h-full md:justify-center md:items-center">
        <div className="w-[45%] md:w-auto h-full flex items-center">
          <img src={imageUrl} alt={name} className="object-contain flex justify-center items-center w-8 h-8 md:w-12 md:h-12" />
        </div>
        {/* Contenedor del texto */}
        <div className="w-[65%] md:w-auto h-full flex items-center">
          <p className="text-sn md:ml-4 md:text-[1.5rem] font-semibold text-base text-center truncate font-grotesk">
            {formatName(name)}
          </p>
        </div>
      </div>
    </div>
  );
}
