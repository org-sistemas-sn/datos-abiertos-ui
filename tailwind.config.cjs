/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        grotesk: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'ipad-max': { min: '768px', max: '1300px' }, // Entre 768px y 1300px
      },
      colors: {
        primary: "#0477AD",
        gris: "#687073",
        verde: "#219653",
        negro: "#3E4345",
        celeste: "#E3EEFB",
        azul: "#2589FF"
      },
      lineHeight: {
        'titleMobile': '2.8rem', 
        'titleIpad': '4rem', 
        'titleDesktop': '5rem', 
      },
      backgroundColor: {
        sn: "#0477AD !important",
        gris: "#FBFBFB",
        inputDetail: "#C5E0FF !important"
      },
      textColor: {
        sn: "#0477AD !important",
      },
      borderColor: {
        sn: "#0477AD !important",
        inputDetail: "#687073 !important"
      },
      height: {
        outlet: "calc(100% - 80px)",
      },
      width: {
        sidebar: "160px",
        menu: "140px",
        menuHidden: "50px",
        menuText: "80px",
        button: "205px"
      },
      minWidth: {
        120: "120px"
      },
      minHeight: {
        outlet: "calc(100% - 80px)",
      },
      maxWidth: {
        info: "655px",
        button: "360px"
      },
      borderWidth: {
        1: "1px"
      },
      scale: {
        '102': '1.01',  // Clase personalizada para escala del 2%
      }
    },
  },
  darkMode: "class",
}
