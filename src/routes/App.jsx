import { BrowserRouter, Routes, Route } from "react-router-dom";
import Themes from "../pages/Themes";
import ThemeItems from "../pages/ThemeItems";
import About from "../pages/About/About";
import Categories from "../pages/Categories";
import ItemsSearch from "../pages/ItemsSearch/ItemsSearch";
import ItemDetail from "../pages/ItemDetail";
import EventDetail from "../pages/EventDetail/EventDetail";
import { Layout } from "@Components";
import { Home } from "@Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="itemssearch" element={<ItemsSearch />} />
          <Route path="acerca" element={<About />} />
          <Route path="/themes/:id" element={<Themes />} />
          <Route path="/themes/:categoryId/:themeId" element={<ThemeItems />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
