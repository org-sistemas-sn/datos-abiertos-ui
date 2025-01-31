export default function CategoryHomeCard({ icon, label }) {
  return (
    <div className="flex items-center cursor-pointer select-none p-4 md:p-0 md:h-20 md:w-full bg-white border rounded-lg shadow transition-transform duration-500 ease-in-out hover:shadow-lg hover:scale-105">
      {" "}
      {/* Contenedor del ícono */}
      <div className="flex w-full h-full md:justify-center md:items-center">
        <div className="w-[45%] md:w-auto h-full flex items-center">
          <img src={icon} alt={label} className="object-contain flex justify-center items-center w-8 h-8 md:w-12 md:h-12" />
        </div>
        {/* Contenedor del texto */}
        <div className="w-[65%] md:w-auto h-full flex items-center">
          <p className="text-sn md:ml-4 md:text-[1.5rem] font-semibold text-base text-center truncate">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
