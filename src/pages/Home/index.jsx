import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sectionsService } from "../../services/sections/sectionService.js";
import { useNavigate } from "react-router-dom";
import { itemsService } from "../../services/items/itemsService.js";
import { dateService } from "../../services/date/dateService.js";
import "../../styles/customCalendar.css";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CardEventCalendary from "../../components/Cards/CardEventCalendary";
import Swal from "sweetalert2";
import MoonLoader from "react-spinners/MoonLoader";
import CategoryHomeCard from "../../components/Cards/CategoryHomeCard";
import { useSectionContext } from "../../context/sectionContext/sectionContext";

export const Home = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [loading, setLoading] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const { setHasOneTheme, searchItem, setSearchItem } = useSectionContext();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [counts, setCounts] = useState({
    nicoleños: 0,
    becas: 0,
    horas: 0,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sectionsData = await sectionsService.getAllSections();
        setSections(sectionsData);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };

    fetchSections();
  }, []);

  const fetchEvents = async (selectedDate) => {
    try {
      const data = await dateService.getDatesByMonthYear(selectedDate);
      setEvents(data);

      const formattedDates = data.map((event) => {
        // Descomponer la fecha manualmente para evitar desfases de zona horaria
        const [year, month, day] = event.date.split("-").map(Number);
        const dateObj = new Date(year, month - 1, day); // Meses en JS son 0-indexed

        const dayName = dateObj.toLocaleDateString("es-ES", {
          weekday: "long",
        });
        const monthName = dateObj.toLocaleDateString("es-ES", {
          month: "long",
        });

        const dayFormatted = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        const monthFormatted =
          monthName.charAt(0).toUpperCase() + monthName.slice(1);

        return {
          fullDate: dateObj.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          day: dayFormatted,
          month: monthFormatted,
          monthNumber: dateObj.getMonth() + 1,
          number: day.toString(),
          year: year.toString(),
          title: event.title,
          id: event.id,
          date: event.date,
          description: event.description,
          img_path: event.img_path,
        };
      });

      setHighlightedDates(formattedDates);
      console.log("Highlighted Dates:", formattedDates);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  useEffect(() => {
    localStorage.clear();
    setHasOneTheme(false); // Resetea el estado cada vez que Home se monta
  }, []);

  useEffect(() => {
    fetchEvents(date);
  }, [date]);

  const handleMonthChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    const animateCount = (key, end) => {
      let start = 0;
      const duration = 2500;
      const stepTime = duration / end;
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => ({ ...prev, [key]: start }));
      }, stepTime);
    };

    animateCount("nicoleños", 167824);
    animateCount("becas", 1500);
    animateCount("horas", 42000);
  }, []);

  const bgColors = [
    "bg-blue-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-green-100",
  ];

  const handleSearch = async () => {
    if (searchItem.trim() !== "") {
        // Guardamos el término de búsqueda en el localStorage
        localStorage.setItem("lastSearchItem", searchItem);

        try {
            const results = await itemsService.getItemsByName(searchItem);

            if (Array.isArray(results) && results.length > 0) {
                setSearchResults(results);
                Swal.close();
                navigate("/itemssearch", {
                    state: { searchTerm: searchItem, results },
                });
            } else {
                setSearchResults([]);
                Swal.fire({
                    title: "Sin resultados",
                    text: `No se encontró ningún dataset con el nombre "${searchItem}".`,
                    icon: "warning",
                    confirmButtonText: "Aceptar",
                    customClass: { confirmButton: "custom-confirm-button" },
                });
            }
        } catch (error) {
            console.error("Error en la búsqueda de items:", error);
            const errorMessage = error?.response?.data?.error || error?.message || "";
            if (errorMessage.includes("No se encontraron items con ese nombre")) {
                setSearchResults([]);
                Swal.fire({
                    title: "Sin resultados",
                    text: `No se encontró ningún dataset con el nombre "${searchItem}".`,
                    icon: "warning",
                    confirmButtonText: "Aceptar",
                    customClass: { confirmButton: "custom-confirm-button" },
                });
            } else {
                setSearchResults([]);
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al buscar los items.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    customClass: { confirmButton: "custom-confirm-button" },
                });
            }
        }
    }
};


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDateClick = (value) => {
    const formattedDate = value.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    setSelectedDate(formattedDate);
  };

  return (
    <div className="w-full h-full">
      {/* Desktop */}
      <div className="hidden w-full h-auto mt-24 lg:flex flex-col items-center ipad-max:hidden">
        <div className="w-[95%] flex max-w-[1600px] h-auto relative">
          <div className="w-[50%] pl-8 h-full pt-28">
            <div className="h-auto w-[600px]">
              <h1 className="font-grotesk text-[5rem] select-none leading-titleDesktop font-bold text-[#3e4345]">
                Datos Abiertos <br /> de
                <span className="text-sn"> San Nicolás </span>
              </h1>
            </div>
            <div className="w-[620px] pl-1 h-24 pt-3">
              <p className="font-grotesk text-[#677073] leading-tight text-[1.25rem] select-none">
                Ponemos a tu disposición datos públicos en formatos abiertos
                para que los uses, modifiques y compartas libremente.
              </p>
            </div>
            <div className="w-full h-24 flex justify-center items-center">
              <div className="pl-1 w-[100%] flex">
                <div className="relative w-full max-w-[500px]">
                  <input
                    type="text"
                    placeholder="Qué dataset buscas?"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}  // Corregido para actualizar correctamente
                    onKeyDown={handleKeyPress}
                    className="w-full py-5 pl-4 pr-10 text-lg rounded-md shadow-lg focus:outline-none"
                  />
                  <span className="absolute inset-y-0 right-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      onClick={handleSearch}
                      className="w-7 h-7 text-gray-400 mr-3 mb-1 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m1.55-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] pl-10 h-auto pt-20 relative">
            <div className="w-[600px] h-[400px] relative">
              {/* Primera Card */}
              <motion.div
                className="w-[300px] h-[150px] bg-blue-50 flex flex-col justify-center items-center rounded-lg shadow-lg absolute select-none"
                style={{ top: "0", right: "20px" }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                whileHover={{
                  scaleX: 1.08,
                  scaleY: 1.08,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
              >
                <span className="text-[4rem] font-grotesk font-bold text-[#3e4345]">
                  {/* 167824 */}
                  {counts.nicoleños.toLocaleString("es-ES")}
                </span>
                <p className="text-gray-500 text-[0.9rem] font-grotesk">
                  Habitantes según censo 2022
                </p>
              </motion.div>

              {/* Segunda Card */}
              <motion.div
                className="w-[300px] h-[150px] bg-green-50 flex flex-col justify-center items-center rounded-lg shadow-lg absolute select-none"
                style={{ top: "120px", left: "calc(50% - 280px)" }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                whileHover={{
                  scaleX: 1.08,
                  scaleY: 1.08,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
              >
                <span className="text-[4rem] font-grotesk font-bold text-[#3e4345]">
                  {`${counts.becas.toLocaleString("es-ES")}+`}
                </span>
                <p className="text-gray-500 text-[0.9rem] font-grotesk">
                  Becas deportivas entregadas
                </p>
              </motion.div>

              {/* Tercera Card */}
              <motion.div
                className="w-[300px] h-[150px] bg-pink-50 flex flex-col justify-center items-center rounded-lg shadow-lg absolute select-none"
                style={{ top: "240px", right: "5px" }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                whileHover={{
                  scaleX: 1.08,
                  scaleY: 1.08,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
              >
                <span className="text-[4rem] font-grotesk font-bold text-[#3e4345]">
                  {`${counts.horas.toLocaleString("es-ES")}+`}
                </span>
                <p className="text-gray-500 text-[0.9rem] font-grotesk">
                  Personas con seguro médico municipal
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-center items-center pb-24">
          <div className="w-[90%] h-full max-w-[1500px] pt-5">
            <div className="w-full h-auto">
              <div className="w-full flex justify-center mt-3">
                <div className="w-[100%]">
                  <h3 className="font-grotesk select-none text-[#3e4345] text-xl font-semibold mb-4">
                    Categorías
                  </h3>

                  {/* Si no hay categorías, mostrar MoonLoader */}
                  {sections.length === 0 ? (
                    <div className="flex justify-center items-center h-40">
                      <MoonLoader color="#0477AD" size={50} />
                    </div>
                  ) : (
                    /* Contenedor animado con las categorías */
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {sections.map((category, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          {category.name === "GIS" ? (
                            <Link
                              to="/item/10"
                              onClick={() => {
                                // Guarda la sección y el tema correspondientes en el localStorage
                                localStorage.setItem(
                                  "selectedSection",
                                  JSON.stringify({
                                    id: 4,
                                    name: "GIS",
                                    icon_path: "gis.png",
                                    enabled: 1,
                                    createdAt: "2025-02-07T10:45:56.000Z",
                                    updatedAt: "2025-02-07T10:45:56.000Z",
                                    deletedAt: null,
                                  })
                                );
                                localStorage.setItem(
                                  "selectedTheme",
                                  JSON.stringify({
                                    id: 7,
                                    name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                                    description:
                                      "plataforma de aplicaciones geográficas para la gestión municipal ",
                                    id_section: 4,
                                    items: [
                                      {
                                        id: 10,
                                        name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                                        description:
                                          "plataforma de aplicaciones geográficas para la gestión municipal",
                                        url_or_ftp_path:
                                          "https://experience.arcgis.com/experience/b877e6b58fb6478d81b93da2cdea7774/?draft=true",
                                        id_theme: 7,
                                        type: "GIS",
                                        publication_date: "12/01/2025",
                                        responsible:
                                          "Secretaría de Innovación y ciudad inteligente",
                                        maintenance:
                                          "Departamento de Datos & GIS",
                                        have_gis_detail: 0,
                                        enabled: 1,
                                        createdAt: "2025-02-07T11:37:06.000Z",
                                        updatedAt: "2025-02-07T11:37:06.000Z",
                                        deletedAt: null,
                                      },
                                    ],
                                  })
                                );
                              }}
                            >
                              <CategoryHomeCard
                                icon={category.icon_path}
                                name={category.name}
                              />
                            </Link>
                          ) : (
                            <Link to={`/themes/${category.id}`}>
                              <CategoryHomeCard
                                icon={category.icon_path}
                                name={category.name}
                              />
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col items-center max-w-[1650px]">
          <div className="w-[90%]">
            <div className="w-full pb-6 h-12 flex items-center">
              <h6 className="font-semibold text-xl font-grotesk text-[#3e4345] select-none">
                Calendario de eventos
              </h6>
            </div>
          </div>
          <div className="w-[90%] h-auto flex">
            <div className="w-[360px] h-auto">
              <div className="bg-white border-none rounded-lg flex pb-5">
                <Calendar
                  className="react-calendar font-grotesk"
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const dayNumber = date.getDate();
                      const monthNumber = date.getMonth() + 1;
                      const yearNumber = date.getFullYear();

                      const isHighlighted = highlightedDates.some(
                        (event) =>
                          parseInt(event.number, 10) === dayNumber &&
                          parseInt(event.monthNumber, 10) === monthNumber &&
                          parseInt(event.year, 10) === yearNumber
                      );

                      return isHighlighted ? "highlighted-date" : null;
                    }
                    return null;
                  }}
                  navigationLabel={({ date }) => {
                    const monthName = date.toLocaleDateString("es-ES", {
                      month: "long",
                    });
                    const formattedMonth =
                      monthName.charAt(0).toUpperCase() + monthName.slice(1);
                    return `${formattedMonth} de ${date.getFullYear()}`;
                  }}
                  prevLabel="‹"
                  nextLabel="›"
                  prev2Label={null}
                  next2Label={null}
                  minDetail="month"
                  maxDetail="month"
                  minDate={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() - 1,
                      1
                    )
                  }
                  maxDate={
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 2,
                      0
                    )
                  }
                  value={date}
                  locale="es-ES"
                  onActiveStartDateChange={({ activeStartDate }) =>
                    handleMonthChange(activeStartDate)
                  }
                  onClickDay={handleDateClick}
                />
              </div>
            </div>
            <div className="w-full h-full">
              <div className="w-full flex flex-wrap justify-center pb-16">
                <div className="w-[90%] flex-wrap">
                  {/* Contenedor animado */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {highlightedDates.map((event, index) => {
                      const isSelected =
                        `${event.year}-${event.monthNumber
                          .toString()
                          .padStart(2, "0")}-${event.number.padStart(
                          2,
                          "0"
                        )}` === selectedDate;

                      return (
                        <motion.div key={index} variants={itemVariants}>
                          <CardEventCalendary
                            day={`${event.day} ${event.number}`} // Ejemplo: "Martes 25"
                            month={event.month} // Ejemplo: "Febrero"
                            title={event.title} // Mantiene el título del evento
                            bgColor={bgColors[index % bgColors.length]} // Asigna el color según el índice
                            isSelected={isSelected}
                            event={event} // Pasa todo el objeto evento
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ipad */}

      <div className="hidden w-full h-auto mt-24 md:flex lg:hidden flex-col items-center ipad-max:flex">
        <div className="w-[90%] h-auto">
          <div className="w-[70%] h-auto pt-8 flex flex-col">
            <div className="w-full h-full max-w-[550px]">
              <h1 className="font-grotesk text-[4.3rem] leading-titleIpad font-bold text-[#3e4345]">
                Datos Abiertos de <span className="text-sn"> San Nicolás </span>
              </h1>
            </div>
            <div className="w-full h-[50%] pt-4 pl-2 max-w-[550px]">
              <p className="font-grotesk text-[#677073] leading-tight text-[1rem]">
                Ponemos a tu disposición datos públicos en formatos abiertos
                para que los uses, modifiques y compartas libremente.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <div className="w-[100%] flex">
              <div className="relative w-full max-w-[500px]">
                <input
                  type="text"
                  placeholder="Qué dataset buscas?"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full py-5 pl-4 pr-10 text-lg font-grotesk text-gray-500 rounded-lg shadow focus:outline-none focus:ring-2"
                />
                <span className="absolute inset-y-0 right-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-7 h-7 text-gray-400 mr-3 mb-1 cursor-pointer"
                    onClick={handleSearch}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.55-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-8">
            <div className="w-[100%]">
              <h3 className="font-grotesk text-[#3e4345] font-semibold mb-4">
                Categorías
              </h3>

              {sections.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                  <MoonLoader color="#0477AD" size={50} />
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {sections.map((category, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      {category.name === "GIS" ? (
                        <Link
                          to="/item/10"
                          onClick={() => {
                            // Guarda la sección y el tema correspondientes en el localStorage
                            localStorage.setItem(
                              "selectedSection",
                              JSON.stringify({
                                id: 4,
                                name: "GIS",
                                icon_path: "gis.png",
                                enabled: 1,
                                createdAt: "2025-02-07T10:45:56.000Z",
                                updatedAt: "2025-02-07T10:45:56.000Z",
                                deletedAt: null,
                              })
                            );
                            localStorage.setItem(
                              "selectedTheme",
                              JSON.stringify({
                                id: 7,
                                name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                                description:
                                  "plataforma de aplicaciones geográficas para la gestión municipal ",
                                id_section: 4,
                                items: [
                                  {
                                    id: 10,
                                    name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                                    description:
                                      "plataforma de aplicaciones geográficas para la gestión municipal",
                                    url_or_ftp_path:
                                      "https://experience.arcgis.com/experience/b877e6b58fb6478d81b93da2cdea7774/?draft=true",
                                    id_theme: 7,
                                    type: "GIS",
                                    publication_date: "12/01/2025",
                                    responsible:
                                      "Secretaría de Innovación y ciudad inteligente",
                                    maintenance: "Departamento de Datos & GIS",
                                    have_gis_detail: 0,
                                    enabled: 1,
                                    createdAt: "2025-02-07T11:37:06.000Z",
                                    updatedAt: "2025-02-07T11:37:06.000Z",
                                    deletedAt: null,
                                  },
                                ],
                              })
                            );
                          }}
                        >
                          <CategoryHomeCard
                            icon={category.icon_path}
                            name={category.name}
                          />
                        </Link>
                      ) : (
                        <Link to={`/themes/${category.id}`}>
                          <CategoryHomeCard
                            icon={category.icon_path}
                            name={category.name}
                          />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="w-full h-auto flex">
            <div className="w-[50%] h-full">
              <div className="w-full flex justify-center mt-10 pb-5">
                <div className="w-[89%]">
                  <h3 className="font-grotesk text-[#3e4345] font-semibold mb-4">
                    Calendario de eventos
                  </h3>
                  <div className="bg-white border-none rounded-lg">
                    <Calendar
                      className="react-calendar font-grotesk"
                      tileClassName={({ date, view }) => {
                        if (view === "month") {
                          const dayNumber = date.getDate();
                          const monthNumber = date.getMonth() + 1;
                          const yearNumber = date.getFullYear();

                          const isHighlighted = highlightedDates.some(
                            (event) =>
                              parseInt(event.number, 10) === dayNumber &&
                              parseInt(event.monthNumber, 10) === monthNumber &&
                              parseInt(event.year, 10) === yearNumber
                          );

                          return isHighlighted ? "highlighted-date" : null;
                        }
                        return null;
                      }}
                      navigationLabel={({ date }) => {
                        const monthName = date.toLocaleDateString("es-ES", {
                          month: "long",
                        });
                        const formattedMonth =
                          monthName.charAt(0).toUpperCase() +
                          monthName.slice(1);
                        return `${formattedMonth} de ${date.getFullYear()}`;
                      }}
                      prevLabel="‹"
                      nextLabel="›"
                      prev2Label={null}
                      next2Label={null}
                      minDetail="month"
                      maxDetail="month"
                      minDate={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 1,
                          1
                        )
                      }
                      maxDate={
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() + 2,
                          0
                        )
                      }
                      value={date}
                      locale="es-ES"
                      onClickDay={handleDateClick}
                      onActiveStartDateChange={({ activeStartDate }) =>
                        handleMonthChange(activeStartDate)
                      } // 🔹 Agregado para detectar cambio de mes
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[50%] h-full">
              <div className="w-full flex justify-center pb-16">
                <div className="w-[89%] mt-10">
                  {/* Contenedor animado */}
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {highlightedDates.map((event, index) => {
                      const isSelected =
                        `${event.year}-${event.monthNumber
                          .toString()
                          .padStart(2, "0")}-${event.number.padStart(
                          2,
                          "0"
                        )}` === selectedDate;

                      return (
                        <motion.div key={index} variants={itemVariants}>
                          <CardEventCalendary
                            day={`${event.day} ${event.number}`} // Ejemplo: "Martes 25"
                            month={event.month} // Ejemplo: "Febrero"
                            title={event.title} // Mantiene el título del evento
                            bgColor={bgColors[index % bgColors.length]} // Asigna el color según el índice
                            isSelected={isSelected}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}

      <div className=" w-full h-auto mt-24 flex flex-col items-center md:hidden">
        {/* Título principal */}
        <div className="w-[89%] flex pt-6">
          <div className="w-full h-full max-w-[390px]">
            <h1 className="font-grotesk text-[2.6rem] leading-titleMobile font-bold text-[#3e4345]">
              Datos Abiertos <br /> de{" "}
              <span className="text-sn"> San Nicolás </span>
            </h1>
          </div>
        </div>
        {/* Descripción */}
        <div className="w-full h-auto flex justify-center">
          <div className="w-[89%] flex pt-2">
            <div className="w-full h-full max-w-[390px]">
              <p className="font-grotesk text-[#677073] leading-tight text-[0.96rem]">
                Ponemos a tu disposición datos públicos en formatos abiertos
                para que los uses, modifiques y compartas libremente.
              </p>
            </div>
          </div>
        </div>
        {/* Buscador */}
        <div className="w-full flex justify-center mt-4">
          <div className="w-[89%] flex">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Qué dataset buscas?"
                className="w-full py-5 pl-4 pr-10 text-lg font-grotesk text-gray-500 rounded-lg shadow focus:outline-none"
              />
              <span className="absolute inset-y-0 right-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 text-gray-400 mr-3 mb-1 cursor-pointer"
                  onClick={handleSearch}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.55-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        {/* Categorías */}
        <div className="w-full flex justify-center mt-8">
          <div className="w-[89%] flex flex-col justify-center items-center">
            <h3 className="font-grotesk text-[#3e4345] self-start font-semibold mb-4">
              Categorías
            </h3>
            <div className="w-full h-full self-start">
              {/* Si no hay categorías, mostrar MoonLoader */}
              {sections.length === 0 ? (
                <div className="flex justify-center h-32">
                  <MoonLoader color="#0477AD" size={32} />
                </div>
              ) : (
                /* Contenedor con animación */
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {sections.map((category, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      {category.name === "GIS" ? (
                        <Link
                          to="/item/10"
                          onClick={() => {
                            // Guarda la sección y el tema correspondientes en el localStorage
                            localStorage.setItem(
                              "selectedSection",
                              JSON.stringify({
                                id: 4,
                                name: "GIS",
                                icon_path: "gis.png",
                                enabled: 1,
                                createdAt: "2025-02-07T10:45:56.000Z",
                                updatedAt: "2025-02-07T10:45:56.000Z",
                                deletedAt: null,
                              })
                            );
                            localStorage.setItem(
                              "selectedTheme",
                              JSON.stringify({
                                id: 7,
                                name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                                description:
                                  "plataforma de aplicaciones geográficas para la gestión municipal ",
                                id_section: 4,
                                items: [
                                  {
                                    id: 10,
                                    name: "GEOPORTAL MUNICIPALIDAD DE SAN NICOLÁS",
                                    description:
                                      "plataforma de aplicaciones geográficas para la gestión municipal",
                                    url_or_ftp_path:
                                      "https://experience.arcgis.com/experience/b877e6b58fb6478d81b93da2cdea7774/?draft=true",
                                    id_theme: 7,
                                    type: "GIS",
                                    publication_date: "12/01/2025",
                                    responsible:
                                      "Secretaría de Innovación y ciudad inteligente",
                                    maintenance: "Departamento de Datos & GIS",
                                    have_gis_detail: 0,
                                    enabled: 1,
                                    createdAt: "2025-02-07T11:37:06.000Z",
                                    updatedAt: "2025-02-07T11:37:06.000Z",
                                    deletedAt: null,
                                  },
                                ],
                              })
                            );
                          }}
                        >
                          <CategoryHomeCard
                            icon={category.icon_path}
                            name={category.name}
                          />
                        </Link>
                      ) : (
                        <Link to={`/themes/${category.id}`}>
                          <CategoryHomeCard
                            icon={category.icon_path}
                            name={category.name}
                          />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Calendario */}
        <div className="w-full flex justify-center mt-10 pb-5">
          <div className="w-[89%] mt-5">
            <h3 className="font-grotesk text-[#3e4345] font-semibold mb-4">
              Calendario de eventos
            </h3>
            <div className="bg-white border-none rounded-lg flex">
              <Calendar
                className="react-calendar font-grotesk"
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const dayNumber = date.getDate();
                    const monthNumber = date.getMonth() + 1;
                    const yearNumber = date.getFullYear();

                    const isHighlighted = highlightedDates.some(
                      (event) =>
                        parseInt(event.number, 10) === dayNumber &&
                        parseInt(event.monthNumber, 10) === monthNumber &&
                        parseInt(event.year, 10) === yearNumber
                    );

                    return isHighlighted ? "highlighted-date" : null;
                  }
                  return null;
                }}
                navigationLabel={({ date }) => {
                  const monthName = date.toLocaleDateString("es-ES", {
                    month: "long",
                  });
                  const formattedMonth =
                    monthName.charAt(0).toUpperCase() + monthName.slice(1);
                  return `${formattedMonth} de ${date.getFullYear()}`;
                }}
                prevLabel="‹"
                nextLabel="›"
                prev2Label={null}
                next2Label={null}
                minDetail="month"
                maxDetail="month"
                minDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() - 1,
                    1
                  )
                }
                maxDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 2,
                    0
                  )
                }
                value={date}
                locale="es-ES"
                onClickDay={handleDateClick}
                onActiveStartDateChange={({ activeStartDate }) =>
                  handleMonthChange(activeStartDate)
                } // 🔹 Agregado para detectar cambio de mes
              />
            </div>
          </div>
        </div>
        {/* Eventos */}
        <div className="w-full flex justify-center mt-10 pb-16">
          <div className="w-[89%]">
            {/* Contenedor animado */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {highlightedDates.map((event, index) => {
                const isSelected =
                  `${event.year}-${event.monthNumber
                    .toString()
                    .padStart(2, "0")}-${event.number.padStart(2, "0")}` ===
                  selectedDate;

                return (
                  <motion.div key={index} variants={itemVariants}>
                    <CardEventCalendary
                      day={`${event.day} ${event.number}`} // Ejemplo: "Martes 25"
                      month={event.month} // Ejemplo: "Febrero"
                      title={event.title} // Mantiene el título del evento
                      bgColor={bgColors[index % bgColors.length]} // Asigna el color según el índice
                      isSelected={isSelected}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
