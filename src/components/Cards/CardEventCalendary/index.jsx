export default function CardEventCalendary({ day, title, bgColor, isSelected }) {
  return (
    <div
      className={`flex w-full font-grotesk cursor-pointer h-20 items-center select-none p-4 bg-white border rounded-lg shadow transition-transform duration-500 ease-in-out lg:max-w-[400px] 
        ${isSelected ? "shadow-lg scale-105" : "hover:shadow-lg hover:scale-105"}`}
    >
      <div className={`w-24 h-full flex items-center justify-center rounded-lg ${bgColor}`}>
        <p className="text-gray-800 font-semibold text-sm">{day}</p>
      </div>
      <div className="ml-4">
        <p className="text-gray-800 font-semibold text-base">{title}</p>
      </div>
    </div>
  );
}
