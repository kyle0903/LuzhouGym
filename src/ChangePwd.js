import { React, useRef, useState } from "react";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import Axios from "axios";
function ChangePwd({ id, setToken }) {
  const [newPwd, setNewPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  //通知
  const toastTC = useRef(null);
  //清除所有欄位
  function ClearAll() {
    setNewPwd("");
    setPwdCheck("");
    setOldPwd("");
  }
  //送出修改密碼資料
  function CommitData() {
    if (oldPwd === "" || newPwd === "" || pwdCheck === "") {
      toastTC.current.show({
        severity: "error",
        summary: "警告",
        detail: "有空值未填寫",
        life: 3000,
      });
    } else if (newPwd !== pwdCheck) {
      toastTC.current.show({
        severity: "error",
        summary: "警告",
        detail: "密碼不同步",
        life: 3000,
      });
    } else {
      Axios.post("http://localhost:8081/api/changepwd", {
        id: id,
        oldPwd: oldPwd,
        newPwd: newPwd,
      }).then((res) => {
        if (res.data.status === "success") {
          toastTC.current.show({
            severity: "success",
            summary: "通知",
            detail: res.data.message,
            life: 3000,
          });
          setTimeout(() => {
            localStorage.clear();
            setToken(null);
            window.location.replace("/login");
          }, 3000);
        } else {
          toastTC.current.show({
            severity: "error",
            summary: "警告",
            detail: res.data.message,
            life: 3000,
          });
        }
      });
    }
  }
  //顯示Card的最尾端按鈕的部分
  const footer = (
    <div
      className="flex flex-wrap justify-content-end gap-2"
      style={{ marginTop: "30px", textAlign: "center" }}
    >
      <Button
        label="確認修改"
        icon="pi pi-check"
        style={{ marginRight: "20px" }}
        onClick={() => {
          CommitData();
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
  return (
    <div>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-unlock"></i>
        </span>
        <Password
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
          placeholder="輸入舊密碼"
          toggleMask
          keyfilter={/[^ ]/}
        />
      </div>
      <div className="p-inputgroup flex-1" style={{ marginTop: "25px" }}>
        <span className="p-inputgroup-addon">
          <i className="pi pi-lock"></i>
        </span>
        <Password
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          placeholder="輸入新密碼"
          toggleMask
          keyfilter={/[^ ]/}
        />
      </div>
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

        {footer}
      </div>
    </div>
  );
}

export default ChangePwd;
