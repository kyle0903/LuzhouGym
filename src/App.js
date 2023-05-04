import { React } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import MainPage from "./MainPage";
import Navbarr from "./Navbarr";
import TTest from "./TTest";
import "./test.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbarr />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
