import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Slider } from "primereact/slider";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ChangePwd from "./ChangePwd";
import Navbar from "../components/Navbar";
import { useAuth, useMember, useNotification } from '../hooks';

function Member() {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { verifyToken } = useAuth();
  const { getMemberInfo, updateMemberInfo, loading } = useMember();
  const { toastRef } = useNotification();
  const isTwiceRef = useRef(false);

  // 狀態
  const [activeIndex, setActiveIndex] = useState(0);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(20);
  const [blocked, setBlocked] = useState(true);
  const [disabledEdit, setdisabledEdit] = useState(false);
  const [disabledSave, setdisabledSave] = useState(true);
  const [shopNum, setShopNum] = useState(0);

  const items = [{ label: "基本資料" }, { label: "變更密碼" }];

  useEffect(() => {
    if (!isTwiceRef.current) {
      if (token) {
        verifyToken(token).then((data) => {
          if (data === false) {
            navigate("/login");
          } else {
            setUser(data.user);
            getMemberInfo(id).then((res) => {
              if (res && res.result) {
                setAge(res.result.age);
                setGender(res.result.gender);
              }
            });
          }
        });
      } else {
        setToken(null);
        navigate("/login");
      }
      isTwiceRef.current = true;
    }
  }, [token, id, navigate, verifyToken, getMemberInfo]);

  function EditSave(n) {
    if (n === 0) {
      setBlocked(false);
      setdisabledEdit(true);
      setdisabledSave(false);
    } else {
      setBlocked(true);
      setdisabledEdit(false);
      setdisabledSave(true);
      updateMemberInfo(id, { gender, age });
    }
  }

  return (
    <div>
      <Toast ref={toastRef} position="top-center" />
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />
      <div className="memberBasicCard">
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
        <Card>
          {activeIndex === 0 ? (
            <div style={{ position: "relative" }}>
              <BlockUI blocked={blocked}>
                {/* 會員名稱 */}
                <div
                  style={{
                    marginBottom: "25px",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                      fontSize: "18px",
                    }}
                  >
                    會員名稱：
                  </label>

                  <InputText
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      background: "rgba(0, 0, 0, 0.1)",
                    }}
                    disabled
                  />
                </div>
                {/* 性別 */}
                <div
                  style={{
                    marginBottom: "25px",
                    width: "50%",
                    paddingRight: "70px",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "50px",
                      fontSize: "18px",
                    }}
                  >
                    性別：
                  </label>
                  <RadioButton
                    name="gender"
                    value="man"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "man"}
                    style={{ marginRight: "5px" }}
                    required
                  />
                  <label className="ml-2" style={{ marginRight: "15px" }}>
                    男
                  </label>
                  <RadioButton
                    name="gender"
                    value="woman"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === "woman"}
                    required
                  />
                  <label className="ml-2">女</label>
                </div>
                {/* 年齡 */}
                <div
                  style={{
                    marginBottom: "25px",
                    width: "50%",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginRight: "50px",
                    }}
                  >
                    年齡：
                  </label>
                  <div style={{ display: "inline-block" }}>
                    <InputText
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full"
                    />
                    <Slider
                      value={age}
                      onChange={(e) => setAge(e.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "60px" }}>
                  <Button
                    label="編輯"
                    onClick={() => EditSave(0)}
                    style={{ marginRight: "5px" }}
                    disabled={disabledEdit || loading}
                  />
                  <Button
                    label="儲存"
                    onClick={() => EditSave(1)}
                    disabled={disabledSave || loading}
                    loading={loading}
                  />
                </div>
              </BlockUI>
            </div>
          ) : (
            <ChangePwd id={id} setToken={setToken} />
          )}
        </Card>
      </div>
    </div>
  );
}

export default Member;
