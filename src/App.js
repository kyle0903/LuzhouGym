import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";
import "./styles/custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Member from "./pages/Member";
import Course from "./pages/Course";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Pay from "./pages/Pay";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:validcode" element={<Login />} />
          <Route path="/login/forgetPwd/:forgetCode" element={<Login />} />
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
