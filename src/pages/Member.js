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
import { useAuth, useMember, useNotification, useOrder } from '../hooks';

function Member() {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { verifyToken } = useAuth();
  const { getMemberInfo, updateMemberInfo, loading } = useMember();
  const { getPurchaseHistory } = useOrder();
  const { toastRef } = useNotification();
  const isTwiceRef = useRef(false);

  // 狀態
  const [activeIndex, setActiveIndex] = useState(0);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(20);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [blocked, setBlocked] = useState(true);
  const [disabledEdit, setdisabledEdit] = useState(false);
  const [disabledSave, setdisabledSave] = useState(true);
  const [shopNum, setShopNum] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const items = [{ label: "基本資料" }, { label: "變更密碼" }, { label: "購買記錄" }];

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
                setPhone(res.result.phone || "");
                setAddress(res.result.address || "");
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
      updateMemberInfo(id, { gender, age, phone, address });
    }
  }

  // 載入購買記錄
  const loadPurchaseHistory = async () => {
    const data = await getPurchaseHistory(id);
    setPurchaseHistory(data);
  };

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
          onTabChange={(e) => {
            setActiveIndex(e.index);
            if (e.index === 2) {
              loadPurchaseHistory();
            }
          }}
          style={{ textAlign: "center" }}
        />
        <Card>
          {activeIndex === 0 ? (
            // 基本資料
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
                {/* 手機 */}
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
                    手機號碼：
                  </label>
                  <InputText
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="請輸入手機號碼"
                    style={{
                      fontWeight: "bold",
                      width: "300px",
                    }}
                  />
                </div>
                {/* 地址 */}
                <div
                  style={{
                    marginBottom: "25px",
                    width: "80%",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                      fontSize: "18px",
                    }}
                  >
                    聯絡地址：
                  </label>
                  <InputText
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="請輸入聯絡地址"
                    style={{
                      fontWeight: "bold",
                      width: "500px",
                    }}
                  />
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
          ) : activeIndex === 1 ? (
            // 變更密碼
            <ChangePwd id={id} setToken={setToken} />
          ) : (
            // 購買記錄
            <div>
              {purchaseHistory.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "gray" }}>
                  <p>目前沒有購買記錄</p>
                </div>
              ) : (
                <div>
                  {purchaseHistory.map((item) => (
                    <Card
                      key={item.cart_id}
                      style={{
                        marginBottom: "15px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={item.product_pic}
                          alt={item.product_name}
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "20px",
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: "0 0 10px 0" }}>
                            {item.product_name}
                          </h3>
                          <p style={{ margin: "5px 0", color: "#666" }}>
                            訂單編號：{item.cart_id}
                          </p>
                          <p style={{ margin: "5px 0", color: "#666" }}>
                            單價：NT$ {item.product_price}
                          </p>
                          <p style={{ margin: "5px 0", color: "#666" }}>
                            數量：{item.quantity} 件
                          </p>
                          <p style={{ margin: "10px 0 0 0", fontWeight: "bold" }}>
                            總金額：
                            <span style={{ color: "#e74c3c", fontSize: "1.2em" }}>
                              NT$ {item.total}
                            </span>
                          </p>
                        </div>
                        <div
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#27ae60",
                            color: "white",
                            borderRadius: "4px",
                            fontWeight: "bold",
                          }}
                        >
                          已付款
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Member;
