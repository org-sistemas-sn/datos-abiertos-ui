import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

export default function EventDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  console.log("Event:", event)

  const imageUrl = `${import.meta.env.VITE_FTP_SERVER_URL}statics/events-img/${event?.img_path}`;

  console.log("Image url:", imageUrl)

  if (!event) {
    return (
      <div className="w-full mt-24 h-[100vh] flex flex-col justify-center items-center text-gray-600">
        <p>No se encontró el evento</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mt-24 h-auto font-grotesk">
      <Breadcrumb showTitle={false} />
      <div className="w-full h-auto flex flex-col items-center">
        <div className="w-[90%] h-auto pt-5">
          <h3 className="text-2xl font-semibold text-[#3e4345]">
            {event.title}
          </h3>
        </div>
        <div className="w-[90%] mt-1">
          <span className="p-1 rounded bg-[#f2f7ff] font-semibold text-[#677073]">
            Fecha de evento: {event.date}
          </span>
        </div>
        <div className="w-full mt-2 h-[60vh] lg:h-[100vh] flex justify-center">
          <div className="w-[90%]">
            <img src={imageUrl} alt={event.title} className="w-full h-full object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div className="w-full h-auto flex justify-center">
          <div className="w-[90%] mt-10">
            <p className="text-[#3e4345] pl-1">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
