import { BrowserRouter, Routes, Route } from "react-router-dom";
import Themes from "../pages/Themes";
import ThemeItems from "../pages/ThemeItems";
import Categories from "../pages/Categories";
import ItemDetail from "../pages/ItemDetail";
import { Layout } from "@Components";
import { Home } from "@Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="/themes/:id" element={<Themes />} />
          <Route path="/themes/:categoryId/:themeId" element={<ThemeItems />} />
          <Route path="/item/:id" element={<ItemDetail />} /> {/* Nueva ruta */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
