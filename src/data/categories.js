import aguas from "../assets/icons/agua.png";
import general from "../assets/icons/general.png";
import licencia from "../assets/icons/licencia.png";
import seguridad from "../assets/icons/seguridad.png";
import salud from "../assets/icons/salud.png";

export const categories = [
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