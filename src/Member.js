import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
import Axios from "axios";

function Member() {
  //id
  const { id } = useParams();
  //判斷有無登入的畫面顯示
  const display = id;
  //token
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  //判斷useEffect是否執行兩次
  var isTwice = false;
  useEffect(() => {
    if (!isTwice) {
      if (token) {
        Axios.post("http://localhost:8081/api/token", { token: token }).then(
          (data) => {
            console.log(data.data);
          }
        );
      } else {
        setToken(null);
        display = <Login />;
      }
      isTwice = true;
    }
  }, []);

  return <div>{display}</div>;
}

export default Member;
