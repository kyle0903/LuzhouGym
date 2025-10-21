import { React, useState } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useAuth, useNotification } from '../hooks';

function ChangePwd({ id, setToken }) {
  // Hooks
  const { changePassword, loading } = useAuth();
  const { toastRef, showError } = useNotification();

  // 狀態
  const [newPwd, setNewPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  // 清除所有欄位
  function ClearAll() {
    setNewPwd("");
    setPwdCheck("");
    setOldPwd("");
  }

  // 送出修改密碼資料
  function CommitData() {
    if (oldPwd === "" || newPwd === "" || pwdCheck === "") {
      showError("警告", "有空值未填寫");
      return;
    }

    if (newPwd !== pwdCheck) {
      showError("警告", "密碼不一致");
      return;
    }

    changePassword(
      { id, oldPwd, newPwd },
      () => {
        setTimeout(() => {
          localStorage.clear();
          setToken(null);
          window.location.replace("/login");
        }, 3000);
      }
    );
  }

  // 顯示Card的最尾端按鈕的部分
  const footer = (
    <div
      className="flex flex-wrap justify-content-end gap-2"
      style={{ marginTop: "30px", textAlign: "center" }}
    >
      <Button
        label="確認修改"
        icon="pi pi-check"
        style={{ marginRight: "20px" }}
        onClick={CommitData}
        disabled={loading}
        loading={loading}
      />
      <Button
        label="清除所有欄位"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={ClearAll}
        disabled={loading}
      />
    </div>
  );

  return (
    <div>
      <Toast ref={toastRef} position="top-center" />
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
