const ThemeCard = ({ name, description }) => {
  return (
    <div className="bg-[#0079C2] cursor-pointer hover:shadow-lg w-full h-[150px] sm:h-[160px] p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 flex flex-col justify-center">
      <h3 className="font-bold text-lg text-white uppercase tracking-wide">
        {name}
      </h3>
      <div className="w-full h-auto">
        <p className="text-white mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ThemeCard;
