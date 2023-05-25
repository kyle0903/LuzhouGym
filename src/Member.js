import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";
import Axios from "axios";
import { TabMenu } from "primereact/tabmenu";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { RadioButton } from "primereact/radiobutton";
import { Slider } from "primereact/slider";
import { BlockUI } from "primereact/blockui";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Avatar } from "primereact/avatar";
function Member() {
  //會員id
  const { id } = useParams();
  //基本資料和變更密碼的判斷值
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [{ label: "基本資料" }, { label: "變更密碼" }];
  //token
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  //判斷useEffect是否執行兩次
  var isTwice = false;
  //跳轉頁面
  const navigate = useNavigate();
  //會員名稱
  const [user, setUser] = useState("");
  //性別
  const [gender, setGender] = useState("");
  //年齡
  const [age, setAge] = useState(20);
  //身高
  const [height, setHeight] = useState(0.0);
  //體重
  const [weight, setWeight] = useState(0.0);
  const [blocked, setBlocked] = useState(true);
  useEffect(() => {
    if (!isTwice) {
      if (token) {
        Axios.post("http://localhost:8081/api/token", { token: token }).then(
          (data) => {
            if (data.data == false) {
              navigate("/login");
            } else {
              setUser(data.data.user);
            }
          }
        );
      } else {
        setToken(null);
        navigate("/login");
      }
      isTwice = true;
    }
  }, []);

  return (
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
        {activeIndex == 0 ? (
          //基本資料畫面
          <div style={{ position: "relative" }}>
            <BlockUI blocked={blocked}>
              <div className="flex-auto">
                <Avatar
                  image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"
                  className="mr-2"
                  size="xlarge"
                  shape="circle"
                />
              </div>

              {/* 大頭貼照 */}
              <div style={{ position: "absolute", right: "0px", top: "0px" }}>
                <div>
                  <FileUpload
                    name="demo[]"
                    url={"/api/upload"}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={
                      <p className="m-0">
                        Drag and drop files to here to upload.
                      </p>
                    }
                  />
                </div>
              </div>
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
                <Inplace closable>
                  <InplaceDisplay>{user || "Click to Edit"}</InplaceDisplay>
                  <InplaceContent>
                    <InputText
                      keyfilter={/[^s]/}
                      value={user}
                      onChange={(e) => setUser(e.value)}
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        opacity: 1,
                      }}
                    />
                  </InplaceContent>
                </Inplace>
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
                  onChange={(e) => setGender(e.value)}
                  checked={gender === "man"}
                  style={{ marginRight: "5px" }}
                />
                <label className="ml-2" style={{ marginRight: "15px" }}>
                  男
                </label>
                <RadioButton
                  name="gender"
                  value="woman"
                  onChange={(e) => setGender(e.value)}
                  checked={gender === "woman"}
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
                    marginRight: "10px",
                  }}
                >
                  身高(cm)：
                </label>
                <Inplace closable>
                  <InplaceDisplay>{height || "Click to Edit"}</InplaceDisplay>
                  <InplaceContent>
                    <InputText
                      keyfilter={/[^s]/}
                      value={height}
                      onChange={(e) => setHeight(e.value)}
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        opacity: 1,
                      }}
                    />
                  </InplaceContent>
                </Inplace>
              </div>
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
                    marginRight: "15px",
                  }}
                >
                  體重(kg)：
                </label>
                <Inplace closable>
                  <InplaceDisplay>{weight || "Click to Edit"}</InplaceDisplay>
                  <InplaceContent>
                    <InputText
                      keyfilter="num"
                      value={weight}
                      onChange={(e) => setWeight(e.value)}
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        opacity: 1,
                      }}
                    />
                  </InplaceContent>
                </Inplace>
              </div>
              <div style={{ textAlign: "center", marginTop: "60px" }}>
                <Button
                  label="編輯"
                  onClick={() => setBlocked(false)}
                  style={{ marginRight: "5px" }}
                ></Button>
                <Button label="儲存" onClick={() => setBlocked(true)}></Button>
              </div>
            </BlockUI>
          </div>
        ) : (
          <div></div>
        )}
      </Card>
    </div>
  );
}

export default Member;
