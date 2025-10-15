import { React, useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import gymLogo from "./pic/gymLogo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import Axios from "axios";
import { Badge } from "primereact/badge";
import { API_ENDPOINTS } from './config/api';

function Navbarr({ shopNum, setShopNum }) {
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

  //判斷useEffect是否執行兩次
  var isTwice = false;


  const items = [
    {
      label: "首頁",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
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
      command: () => {
        navigate("/product");
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
  ];
  const start = <img alt="logo" src={gymLogo} height="45"></img>;
  const end = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ marginRight: "10px" }}>登入身份：{user}</label>
      <i
        className="pi pi-shopping-cart p-overlay-badge"
        style={{ cursor: "pointer", display: logOutBtn }}
        onClick={() => {
          navigate("/order/" + id);
        }}
      >
        <Badge value={shopNum}></Badge>
      </i>
      <Button
        label="登出"
        icon="pi pi-sign-out"
        iconPos="right"
        style={{
          display: logOutBtn,
          backgroundColor: "transparent",
          color: "red",
          border: "transparent",
          marginLeft: "20px",
          fontWeight: "bold",
        }}
        onClick={() => {
          localStorage.clear();
          setToken(null);
          window.location.replace("/login");
        }}
      />
    </div>
  );
  useEffect(() => {
    if (!isTwice) {
      if (token) {
        Axios.post(API_ENDPOINTS.TOKEN, { token: token }).then(
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
              Axios.get(`${API_ENDPOINTS.ORDER}/${data.data.id}`).then(
                (res) => {
                  setShopNum(res.data.length);
                }
              );
            }
          }
        );
      } else {
        setLogOutBtn("none");
        setUser("訪客");
      }
      isTwice = true;
    }
  }, []);
  return (
    <div>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Navbarr;
