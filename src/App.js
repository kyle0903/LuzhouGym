import { React } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import MainPage from "./MainPage";
import "./test.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Member from "./Member";
import Course from "./Course";
import Product from "./Product";
import Order from "./Order";
import Pay from "./Pay";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:validcode" element={<Login />} />
          <Route path="/member/:id" element={<Member />} />
          <Route path="/course" element={<Course />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/linepay/confirm" element={<Pay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
