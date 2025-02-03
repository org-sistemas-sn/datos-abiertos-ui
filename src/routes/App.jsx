import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "../pages/CategoryPage";
import { Layout } from "@Components";
import { Home } from "@Pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categoria/:id" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
