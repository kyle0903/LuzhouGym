import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import gymLogo from "./pic/gymLogo.png";
import "./test.css";
import { useNavigate } from "react-router-dom";

function Navbarr() {
  const navigate = useNavigate();
  const items = [
    {
      label: "首頁",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/test");
      },
    },
    {
      label: "會員中心",
      icon: "pi pi-fw pi-user",
    },
    {
      label: "健身論壇",
      icon: "pi pi-fw pi-comment",
    },
    {
      label: "公司產品",
      icon: "pi pi-fw pi-truck",
    },
    {
      label: "課程專區",
      icon: "pi pi-fw pi-book",
    },
  ];
  const start = <img alt="logo" src={gymLogo} height="45"></img>;
  const end = <InputText placeholder="Search" type="text" className="w-full" />;

  return (
    <div>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Navbarr;
