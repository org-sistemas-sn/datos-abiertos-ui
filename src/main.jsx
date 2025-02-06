import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import { SectionProvider } from "./context/sectionContext/sectionContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SectionProvider>
      <App />
    </SectionProvider>
  </React.StrictMode>
);
