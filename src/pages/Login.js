import { React, useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { TabMenu } from "primereact/tabmenu";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import moment from "moment";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth, useNotification } from "../hooks";
import { getHomeUrl } from "../services/api";

function Login() {
  // Hooks
  const {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyAccount,
    getResetCode,
    loading,
  } = useAuth();
  const { toastRef, showError } = useNotification();
  const { validcode, forgetCode } = useParams();
  const isTwiceRef = useRef(false);

  // 表單狀態
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [user, setUser] = useState("");
  const [mail, setMail] = useState("");
  const [forget_user, setForget_user] = useState("");
  const [forget_mail, setForget_mail] = useState("");
  const [forget_pwd, setForget_pwd] = useState("");
  const [forget_pwdCheck, setForgetPwdCheck] = useState("");

  // UI 狀態
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [btn_footer, setBtnFooter] = useState("登入");
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [shopNum, setShopNum] = useState(0);

  const items = [{ label: "會員登入" }, { label: "會員註冊" }];
  const currentTime = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

  // 處理驗證碼和重設密碼連結
  useEffect(() => {
    if (!isTwiceRef.current) {
      if (validcode) {
        verifyAccount(validcode, () => {
          setTimeout(() => {
            window.location.replace(`${getHomeUrl()}/login`);
          }, 3000);
        });
      } else if (forgetCode) {
        getResetCode(forgetCode, (data) => {
          setForget_user(data.user);
          setVisibleUpdate(true);
        });
      }
      isTwiceRef.current = true;
    }
  }, [validcode, forgetCode, verifyAccount, getResetCode]);

  // 清除所有欄位
  function ClearAll() {
    if (loading) return;
    setPwd("");
    setPwdCheck("");
    setUser("");
    setMail("");
    setForget_mail("");
    setForget_user("");
  }

  // 忘記密碼寄驗證碼
  function handleForgetPassword() {
    if (forget_user === "" || forget_mail === "") {
      showError("警告", "有空值未填寫");
      return;
    }

    forgotPassword({ forget_user, forget_mail }, () => {
      setVisible(false);
      ClearAll();
    });
  }

  // 忘記密碼更新
  function handleResetPassword() {
    if (forget_pwd === "" || forget_pwdCheck === "") {
      showError("警告", "有空值未填寫");
      return;
    }

    if (forget_pwd !== forget_pwdCheck) {
      showError("警告", "密碼不同步");
      return;
    }

    resetPassword({ forget_user, forget_pwd }, () => {
      setTimeout(() => {
        window.location.replace(`${getHomeUrl()}/login`);
      }, 3000);
    });
  }

  // 提交表單
  function CommitData(btn_footer) {
    if (btn_footer === "註冊") {
      // 註冊驗證
      if (user === "" || pwd === "" || pwdCheck === "" || mail === "") {
        showError("警告", "有空值未填寫");
        return;
      }

      if (pwd !== pwdCheck) {
        showError("警告", "密碼不同步");
        return;
      }

      register({ user, pwd, mail, currentTime }, () => ClearAll());
    } else {
      // 登入驗證
      if (user === "" || pwd === "") {
        showError("警告", "有空值未填寫");
        return;
      }

      login({ user, pwd }, (data) => {
        setTimeout(() => {
          const path = `${getHomeUrl()}/member/${data.id}`;
          window.location.replace(path);
        }, 3000);
      });
    }
  }

  // Tab 切換處理
  if (activeIndex !== activeIndex2) {
    if (activeIndex === 1) {
      setBtnFooter("註冊");
    } else {
      setBtnFooter("登入");
    }
    setPwd("");
    setUser("");
    setActiveIndex2(activeIndex);
  }

  // 申請忘記密碼的 footer
  const footerContent = (
    <div>
      <Button
        label="取消"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
        disabled={loading}
      />
      <Button
        label="傳送驗證碼"
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
        onClick={handleForgetPassword}
        autoFocus
        loading={loading}
        disabled={loading}
      />
    </div>
  );

  // 更新忘記密碼的 footer
  const footerUpdate = (
    <div>
      <Button
        label="取消"
        icon="pi pi-times"
        onClick={() => setVisibleUpdate(false)}
        className="p-button-text"
        disabled={loading}
      />
      <Button
        label="確認"
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
        onClick={handleResetPassword}
        autoFocus
        loading={loading}
        disabled={loading}
      />
    </div>
  );

  // Card footer
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label={btn_footer}
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
        style={{ marginRight: "20px" }}
        onClick={() => CommitData(btn_footer)}
        loading={loading}
        disabled={loading}
      />
      <Button
        label="清除所有欄位"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        style={{ marginRight: "20px" }}
        onClick={ClearAll}
        disabled={loading}
      />
      {activeIndex === 0 && (
        <Button
          label="忘記密碼"
          icon="pi pi-question"
          style={{
            background: "rgb(255,255,255)",
            color: "gray",
            border: "none",
          }}
          onClick={() => setVisible(true)}
          disabled={loading}
        />
      )}
      <Dialog
        header="忘記密碼（請輸入註冊時之帳號與信箱）"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <Card>
          <div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                value={forget_user}
                placeholder="輸入帳號"
                onChange={(e) => setForget_user(e.target.value)}
                keyfilter={/[^ ]/}
              />
            </div>
            <div className="p-inputgroup flex-1" style={{ marginTop: "25px" }}>
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText
                placeholder="輸入電子郵件"
                value={forget_mail}
                onChange={(e) => setForget_mail(e.target.value)}
                keyfilter={/[^ ]/}
              />
            </div>
          </div>
        </Card>
      </Dialog>
      <Dialog
        header={`修改新密碼(會員名稱：${forget_user})`}
        visible={visibleUpdate}
        style={{ width: "50vw" }}
        onHide={() => setVisibleUpdate(false)}
        footer={footerUpdate}
      >
        <Card>
          <div>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                value={forget_pwd}
                onChange={(e) => setForget_pwd(e.target.value)}
                placeholder="輸入新密碼"
                toggleMask
                keyfilter={/[^ ]/}
              />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <Password
                value={forget_pwdCheck}
                onChange={(e) => setForgetPwdCheck(e.target.value)}
                placeholder="再次確認密碼"
                toggleMask
                keyfilter={/[^ ]/}
              />
            </div>
          </div>
        </Card>
      </Dialog>
    </div>
  );

  return (
    <div>
      <Toast ref={toastRef} position="top-center" />
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />
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
                onChange={(e) => setUser(e.target.value)}
                keyfilter={/[^ ]/}
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
                keyfilter={/[^ ]/}
              />
            </div>
          </div>
          {activeIndex === 1 ? (
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
                  keyfilter={/[^ ]/}
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
                  onChange={(e) => setMail(e.target.value)}
                  keyfilter={/[^ ]/}
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
