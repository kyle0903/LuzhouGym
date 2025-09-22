import React from "react";
import Axios from "axios";
import { API_ENDPOINTS } from './config/api';

function Sign() {
  //註冊會員
  if (btn_footer === "註冊") {
    if (user === "" || pwd === "" || mail === "") {
      console.log("有空值未填寫");
    } else if (pwd !== pwdCheck) {
      console.log("密碼不同步");
    } else {
      Axios.post(API_ENDPOINTS.SIGN, {
        user: user,
        pwd: pwd,
        mail: mail,
        currentTime: currentTime,
      }).then((data) => {
        console.log(data.data);
      });
    }
  } else {
    //登入會員
    console.log("登入中");
  }
  return <div></div>;
}

export default Sign;
