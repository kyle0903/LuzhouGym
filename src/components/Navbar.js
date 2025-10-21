import { React, useEffect, useState, useRef } from "react";
import { Menubar } from "primereact/menubar";
import gymLogo from "../assets/images/pic/gymLogo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { useAuth, useProduct } from '../hooks';

function Navbarr({ shopNum, setShopNum }) {
  // Hooks
  const navigate = useNavigate();
  const { verifyToken } = useAuth();
  const { getCartCount } = useProduct();
  const isTwiceRef = useRef(false);

  // 狀態
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [logOutBtn, setLogOutBtn] = useState("none");
  const [id, setId] = useState("");
  const [user, setUser] = useState("訪客");
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
    if (!isTwiceRef.current) {
      if (token) {
        verifyToken(token).then(async (data) => {
          if (data === false) {
            setLogOutBtn("none");
            setUser("訪客");
            setTokenCheck(true);
          } else {
            setTokenCheck(false);
            setLogOutBtn("inline-flex");
            setId(data.id);
            setUser("會員" + data.user);
            const count = await getCartCount(data.id);
            setShopNum(count);
          }
        });
      } else {
        setLogOutBtn("none");
        setUser("訪客");
      }
      isTwiceRef.current = true;
    }
  }, [token, setShopNum, verifyToken, getCartCount]);

  return (
    <div>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Navbarr;
