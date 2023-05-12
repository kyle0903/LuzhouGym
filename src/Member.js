import React, { useState } from "react";
import Login from "./Login";
function Member() {
  const [isLogin, setIsLogin] = useState(false);
  //在這判斷有無登入，如果有就顯示下面畫面，沒有就顯示Login.js
  return <div>{isLogin ? <Login /> : <div>Member</div>}</div>;
}

export default Member;
