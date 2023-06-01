import { React, useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import gymLogo from "./pic/gymLogo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import Axios from "axios";

function Navbarr() {
  //跳轉頁面
  const navigate = useNavigate();
  //token
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  //判斷是否出現登出鈕
  const [logOutBtn, setLogOutBtn] = useState("none");
  //會員id
  const [id, setId] = useState("");
  //會員名稱
  const [user, setUser] = useState("訪客");
  //檢查token是否有過期
  const [tokenCheck, setTokenCheck] = useState(true);
  const items = [
    {
      label: "首頁",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "會員中心",
      icon: "pi pi-fw pi-user",
      command: () => {
        if (token && !tokenCheck) {
          navigate("/member/" + id);
        } else {
          navigate("/login");
        }
      },
    },

    {
      label: "課程專區",
      icon: "pi pi-fw pi-book",
      command: () => {
        navigate("/course");
      },
    },
    {
      label: "公司產品",
      icon: "pi pi-fw pi-truck",
    },
  ];
  const start = <img alt="logo" src={gymLogo} height="45"></img>;
  const end = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ marginRight: "10px" }}>登入身份：{user}</label>
      <Button
        label="登出"
        icon="pi pi-sign-out"
        iconPos="right"
        style={{ display: logOutBtn }}
        onClick={() => {
          localStorage.clear();
          setToken(null);
          window.location.replace("/login");
        }}
      />
    </div>
  );
  useEffect(() => {
    if (token) {
      Axios.post("http://localhost:8081/api/token", { token: token }).then(
        (data) => {
          if (data.data == false) {
            setLogOutBtn("none");
            setUser("訪客");
            setTokenCheck(true);
          } else {
            setTokenCheck(false);
            setLogOutBtn("inline-flex");
            setId(data.data.id);
            setUser("會員" + data.data.user);
          }
        }
      );
    } else {
      setLogOutBtn("none");
      setUser("訪客");
    }
  }, []);
  return (
    <div>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Navbarr;
