import { React } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import MainPage from "./MainPage";
import Navbarr from "./Navbarr";
import "./test.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Member from "./Member";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbarr />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:validcode" element={<Login />} />
          <Route path="/member/:id" element={<Member />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
