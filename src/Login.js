import { React, useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { TabMenu } from "primereact/tabmenu";
import { Toast } from "primereact/toast";
import Axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import Navbarr from "./Navbarr";
function Login() {
  //密碼的值
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  //帳號的值
  const [user, setUser] = useState("");
  //e-mail的值
  const [mail, setMail] = useState("");
  //會員登入和註冊的選擇值
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const items = [{ label: "會員登入" }, { label: "會員註冊" }];
  //登入和註冊按鈕切換
  const [btn_footer, setBtnFooter] = useState("登入");
  //記錄現在時間
  const currentTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
  //驗證碼
  const { validcode } = useParams();
  //通知
  const toastTC = useRef(null);
  //因為React 18的useEffect會跑兩次，這個變數是為了判斷是否第二次執行useEffect
  var isTwice = false;
  const [shopNum, setShopNum] = useState(0);
  //每次更新會跑一次的動作
  useEffect(() => {
    if (validcode && !isTwice) {
      Axios.get(`http://localhost:8081/api/signEnable/${validcode}`).then(
        (data) => {
          if (data.data.status === "success") {
            toastTC.current.show({
              severity: "success",
              summary: "通知",
              detail: data.data.message,
              life: 3000,
            });
          } else {
            toastTC.current.show({
              severity: "error",
              summary: "警告",
              detail: data.data.message,
              life: 3000,
            });
          }
        }
      );
      isTwice = true;
      setTimeout(() => {
        window.location.replace("http://localhost:3000/login");
      }, 3000);
    }
  }, []);
  //清除所有欄位
  function ClearAll() {
    setPwd("");
    setPwdCheck("");
    setUser("");
    setMail("");
  }
  //顯示Card的最尾端按鈕的部分
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label={btn_footer}
        icon="pi pi-check"
        style={{ marginRight: "20px" }}
        onClick={() => {
          CommitData(btn_footer);
        }}
      />
      <Button
        label="清除所有欄位"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={() => {
          ClearAll();
        }}
      />
      <Toast ref={toastTC} position="top-center" />
    </div>
  );
  if (activeIndex != activeIndex2) {
    if (activeIndex == 1) {
      setBtnFooter("註冊");
    } else {
      setBtnFooter("登入");
    }
    setPwd("");
    setUser("");
    setActiveIndex2(activeIndex);
  }
  function CommitData(btn_footer) {
    //註冊會員
    if (btn_footer === "註冊") {
      if (user === "" || pwd === "" || pwdCheck === "" || mail === "") {
        //這邊可以再多加點條件，不然輸入空格也會過
        toastTC.current.show({
          severity: "error",
          summary: "警告",
          detail: "有空值未填寫",
          life: 3000,
        });
      } else if (pwd !== pwdCheck) {
        toastTC.current.show({
          severity: "error",
          summary: "警告",
          detail: "密碼不同步",
          life: 3000,
        });
      } else {
        Axios.post("http://localhost:8081/api/sign", {
          user: user,
          pwd: pwd,
          mail: mail,
          currentTime: currentTime,
        }).then((data) => {
          if (data.data.status === "success") {
            toastTC.current.show({
              severity: "success",
              summary: "通知",
              detail: data.data.message,
              life: 3000,
            });
          } else {
            toastTC.current.show({
              severity: "error",
              summary: "警告",
              detail: data.data.message,
              life: 3000,
            });
          }
        });
      }
    } else {
      //登入會員
      if (user === "" || pwd === "") {
        //這邊可以再多加點條件，不然輸入空格也會過
        toastTC.current.show({
          severity: "error",
          summary: "警告",
          detail: "有空值未填寫",
          life: 3000,
        });
      } else {
        Axios.post("http://localhost:8081/api/login", {
          user: user,
          pwd: pwd,
        }).then((data) => {
          if (data.data.status === "success") {
            toastTC.current.show({
              severity: "success",
              summary: "通知",
              detail: data.data.message,
              life: 3000,
            });
            window.localStorage.setItem("token", data.data.token);
            setTimeout(() => {
              const path = "http://localhost:3000/member/" + data.data.id;
              window.location.replace(path);
              //navigate(path, { replace: true });
            }, 3000);
          } else {
            toastTC.current.show({
              severity: "error",
              summary: "警告",
              detail: data.data.message,
              life: 3000,
            });
          }
        });
      }
    }
  }
  return (
    <div>
      <Navbarr shopNum={shopNum} setShopNum={setShopNum} />
      <div className="memberLoginCard">
        <div style={{ textAlign: "center" }}>
          <label
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              marginBottom: "50px",
            }}
          >
            會員中心
          </label>
        </div>

        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          style={{ textAlign: "center" }}
        />
        <Card footer={footer}>
          {/* 一般會員登入畫面 */}
          <div>
            <div
              className="p-inputgroup flex-1"
              style={{ marginBottom: "25px" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                value={user}
                placeholder="輸入帳號"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                keyfilter={/[^s]/}
              />
            </div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="輸入密碼"
                toggleMask
                keyfilter={/[^s]/}
              />
            </div>
          </div>
          {/* 會員註冊畫面 */}
          {activeIndex == 1 ? (
            <div style={{ marginTop: "25px" }}>
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password
                  value={pwdCheck}
                  onChange={(e) => setPwdCheck(e.target.value)}
                  placeholder="再次確認密碼"
                  toggleMask
                  keyfilter={/[^s]/}
                />
              </div>
              <div
                className="p-inputgroup flex-1"
                style={{ marginTop: "25px" }}
              >
                <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span>
                <InputText
                  placeholder="輸入電子郵件"
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  keyfilter={/[^s]/}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Login;
