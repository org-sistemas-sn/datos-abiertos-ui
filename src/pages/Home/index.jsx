import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import "../../styles/customCalendar.css";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CardEventCalendary from "../../components/Cards/CardEventCalendary";
import CategoryHomeCard from "../../components/Cards/CategoryHomeCard";
import aguas from "../../assets/icons/agua.png";
import general from "../../assets/icons/general.png";
import licencia from "../../assets/icons/licencia.png";
import seguridad from "../../assets/icons/seguridad.png";
import salud from "../../assets/icons/salud.png";

export const Home = () => {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 1, icon: aguas, label: "Aguas" },
    { id: 2, icon: seguridad, label: "Seguridad" },
    {
      id: 3,
      icon: salud,
      label: "Salud y Familia",
      themes: [
        {
          id: 1,
          label: "Same",
          description: "Salidas y respuestas  del same",
          items: [
            {
              id: 1,
              label: "SAME (SISTEMA VIEJO)",
              type: "CSV",
              description: "Monitoreo de pozos, efluentes y plantas potabilizadoras",
              upload_date: "22/11/2024"
            },
            {
              id: 2,
              label: "MONITOREO SAME",
              type: "TXT",
              description: "Monitoreo de pozos, efluentes y plantas potabilizadoras",
              upload_date: "22/11/2023"
            },
            {
              id: 3,
              label: "SAME (SISTEMA NUEVO)",
              type: "PDF",
              description: "Monitoreo de pozos, efluentes y plantas potabilizadoras",
              upload_date: "3/8/2022"
            }
          ]
        },
        {
          id: 2,
          label: "Ausentismo",
          description:
            "Monitoreo de pozos, efluentes y plantas potabilizadoras",
        },
        {
          id: 3,
          label: "Credencial municipal",
          description: "Consumo y tiempo entre mediciones",
        },
        {
          id: 4,
          label: "Plataforma Alepho",
          description: "Consumo y tiempo entre mediciones",
        },
        {
          id: 5,
          label: "Plataforma Alepho",
          description: "Consumo y tiempo entre mediciones",
        },
      ],
    },
    { id: 4, icon: general, label: "General" },
    { id: 5, icon: licencia, label: "Licencia" },
    { id: 6, icon: aguas, label: "Aguas" },
    { id: 7, icon: seguridad, label: "Seguridad" },
    { id: 8, icon: salud, label: "Salud" },
    { id: 9, icon: general, label: "General" },
    { id: 10, icon: licencia, label: "Licencia" },
    
  ];

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
        staggerChildren: 0.2, // Hace que cada tarjeta entre con un retraso de 0.2s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Inicia con opacidad 0 y 20px abajo
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  useEffect(() => {
    const animateCount = (key, end) => {
      let start = 0;
      const duration = 2500;
      const stepTime = duration / end;
      const timer = setInterval(() => {
        start += Math.ceil(end / 45);
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => ({ ...prev, [key]: start }));
      }, stepTime);
    };

    animateCount("nicoleños", 167824);
    animateCount("becas", 12000);
    animateCount("horas", 22000);
  }, []);

  const events = [
    { day: "LUNES 2", title: "Caravana navideña" },
    { day: "LUNES 14", title: "Inscripción Becas Deportivas" },
    { day: "JUEVES 17", title: "Festival Rico" },
    { day: "MARTES 22", title: "Boca vs Juventude" },
    { day: "LUNES 2", title: "Caravana navideña" },
    { day: "LUNES 14", title: "Inscripción Becas Deportivas" },
    { day: "JUEVES 17", title: "Festival Rico" },
    { day: "MARTES 22", title: "Boca vs Juventude" },
    
  ];

  // Colores predefinidos
  const bgColors = [
    "bg-blue-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-green-100",
  ];

  // Fechas a resaltar
  const highlightedDates = [
    new Date(2025, 1, 2).toDateString(),
    new Date(2025, 1, 14).toDateString(),
    new Date(2025, 1, 17).toDateString(),
    new Date(2025, 1, 22).toDateString(),
  ];

  const filteredCategories = categories.filter((category) =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full">
      {/* Desktop */}
      <div className="hidden w-full h-auto mt-24 lg:flex flex-col items-center ipad-max:hidden">
        <div className="w-[92%] flex max-w-[1400px] h-auto relative">
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-5 pl-4 pr-10 text-lg rounded-md shadow-lg focus:outline-none"
                  />
                  <span className="absolute inset-y-0 right-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-7 h-7 text-gray-400 mr-3 mb-1"
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
                  {counts.nicoleños.toLocaleString("es-ES")}
                </span>
                <p className="text-gray-500 text-[0.9rem] font-grotesk">
                  Nicoleños
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
                  {counts.becas.toLocaleString("es-ES")}
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
                  {counts.horas.toLocaleString("es-ES")}
                </span>
                <p className="text-gray-500 text-[0.9rem] font-grotesk">
                  Horas ahorradas en trámites digitales
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-center items-center pb-24">
          <div className="w-[88%] h-full max-w-[1320px] pt-5">
            <div className="w-full h-auto">
              <div className="w-full flex justify-center mt-3">
                <div className="w-[100%]">
                  <h3 className="font-grotesk select-none text-[#3e4345] text-xl font-semibold mb-4">
                    Categorías
                  </h3>
                  {/* Contenedor animado */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredCategories.map((category, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Link to={`/themes/${category.id}`}>
                          <CategoryHomeCard
                            icon={category.icon}
                            label={category.label}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col items-center max-w-[1500px]">
          <div className="w-[87%]">
            <div className="w-full pb-6 h-12 flex items-center">
              <h6 className="font-semibold text-xl font-grotesk text-[#3e4345] select-none">
                Calendario de eventos
              </h6>
            </div>
          </div>
          <div className="w-[87%] h-full flex">
            <div className="w-[360px] h-auto">
              <div className="bg-white border-none rounded-lg flex">
                <Calendar
                  className="react-calendar"
                  tileClassName={({ date, view }) =>
                    view === "month" &&
                    highlightedDates.includes(date.toDateString())
                      ? "highlighted-date"
                      : null
                  }
                  navigationLabel={({ date }) =>
                    `${date.toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}`
                  }
                  onChange={setDate}
                  value={date}
                  locale="es-ES"
                />
              </div>
            </div>
            <div className="w-full h-full">
              <div className="w-full flex flex-wrap justify-center pb-16">
                <div className="w-[89%] flex-wrap">
                  {/* Contenedor animado */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {events.map((event, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <CardEventCalendary
                          day={event.day}
                          title={event.title}
                          bgColor={bgColors[index % bgColors.length]} // Asigna el color según el índice
                        />
                      </motion.div>
                    ))}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-5 pl-4 pr-10 text-lg font-grotesk text-gray-500 rounded-lg shadow focus:outline-none focus:ring-2"
                />
                <span className="absolute inset-y-0 right-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-7 h-7 text-gray-400 mr-3 mb-1"
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
              {/* Contenedor con animación */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredCategories.map((category, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link to={`/themes/${category.id}`}>
                      <CategoryHomeCard
                        icon={category.icon}
                        label={category.label}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
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
                      className="react-calendar"
                      tileClassName={({ date, view }) =>
                        view === "month" &&
                        highlightedDates.includes(date.toDateString())
                          ? "highlighted-date"
                          : null
                      }
                      navigationLabel={({ date }) =>
                        `${date.toLocaleDateString("es-ES", {
                          month: "long",
                          year: "numeric",
                        })}`
                      }
                      onChange={setDate}
                      value={date}
                      locale="es-ES"
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
                    {events.map((event, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <CardEventCalendary
                          day={event.day}
                          title={event.title}
                          bgColor={bgColors[index % bgColors.length]} // Asigna el color según el índice
                        />
                      </motion.div>
                    ))}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  className="w-7 h-7 text-gray-400 mr-3 mb-1"
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
              {/* Contenedor con animación */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredCategories.map((category, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Link to={`/themes/${category.id}`}>
                      <CategoryHomeCard
                        icon={category.icon}
                        label={category.label}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
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
                className="react-calendar"
                tileClassName={({ date, view }) =>
                  view === "month" &&
                  highlightedDates.includes(date.toDateString())
                    ? "highlighted-date"
                    : null
                }
                navigationLabel={({ date }) =>
                  `${date.toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric",
                  })}`
                }
                onChange={setDate}
                value={date}
                locale="es-ES"
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
              {events.map((event, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <CardEventCalendary
                    day={event.day}
                    title={event.title}
                    bgColor={bgColors[index % bgColors.length]} // Asigna el color según el índice
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
