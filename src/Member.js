import React, { useEffect, useState, useRef } from "react";
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
import { Toast } from "primereact/toast";
import ChangePwd from "./ChangePwd";
import Navbarr from "./Navbarr";
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
  //鎖屏
  const [blocked, setBlocked] = useState(true);
  //編輯顯示
  const [disabledEdit, setdisabledEdit] = useState(false);
  //儲存顯示
  const [disabledSave, setdisabledSave] = useState(true);
  //通知
  const toastTC = useRef(null);
  //上傳圖片
  const [file, setFile] = useState();
  //儲存圖片
  const [dataImg, setDataImg] = useState("user.svg.png");
  const [shopNum, setShopNum] = useState(0);
  useEffect(() => {
    if (!isTwice) {
      if (token) {
        Axios.post("http://localhost:8081/api/token", { token: token }).then(
          (data) => {
            if (data.data == false) {
              navigate("/login");
            } else {
              setUser(data.data.user);
              console.log(id);
              Axios.get(`http://localhost:8081/api/basicmember/${id}`).then(
                (res) => {
                  if (res.data.status === "failed") {
                    toastTC.current.show({
                      severity: "error",
                      summary: "警告",
                      detail: res.data.message,
                      life: 3000,
                    });
                  } else {
                    setDataImg(res.data.result[0].image);
                    setAge(res.data.result[0].age);
                    setGender(res.data.result[0].gender);
                    setHeight(res.data.result[0].height);
                    setWeight(res.data.result[0].weight);
                  }
                }
              );
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

  function handleFile(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    var fileData = e.target.files[0]; // 檔案資訊
    var fileName = fileData.name; // 檔案名稱
    var fileType = fileData.type; // 檔案類型
    var fileSize = Math.floor(fileData.size * 0.001); // 檔案大小轉成kb
    var fileTime = fileData.lastModifiedDate;

    document.getElementById("file_name").innerText = fileName;
    document.getElementById("file_type").innerText = fileType;
    document.getElementById("file_size").innerText = fileSize + "kb";
    document.getElementById("file_time").innerText = fileTime;
    document.getElementById("file_thumbnail").src =
      URL.createObjectURL(fileData);
  }
  function handleUpload() {
    const formData = new FormData();
    formData.append("image", file);
    Axios.post(`http://localhost:8081/api/upload/${id}`, formData).then(
      (res) => {
        if (res.data.status === "success") {
          toastTC.current.show({
            severity: "success",
            summary: "通知",
            detail: res.data.message,
            life: 3000,
          });
          document.getElementById("file_name").innerText = "";
          document.getElementById("file_type").innerText = "";
          document.getElementById("file_size").innerText = "";
          document.getElementById("file_time").innerText = "";
          document.getElementById("file_thumbnail").src = "";
        } else {
          toastTC.current.show({
            severity: "error",
            summary: "警告",
            detail: res.data.message,
            life: 3000,
          });
        }
      }
    );
  }
  function EditSave(n) {
    if (n == 0) {
      setBlocked(false);
      setdisabledEdit(true);
      setdisabledSave(false);
    } else {
      setBlocked(true);
      setdisabledEdit(false);
      setdisabledSave(true);
      Axios.post(`http://localhost:8081/api/update/${id}`, {
        gender: gender,
        age: age,
        height: height,
        weight: weight,
      }).then((res) => {
        if (res.data.status === "success") {
          toastTC.current.show({
            severity: "success",
            summary: "通知",
            detail: res.data.message,
            life: 3000,
          });
        }
      });
    }
  }
  return (
    <div>
      <Navbarr shopNum={shopNum} setShopNum={setShopNum} />
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
                    image={require("./server/public/image/" + dataImg)}
                    className="mr-2"
                    size="xlarge"
                    shape="circle"
                  />
                </div>
                <Toast ref={toastTC} position="top-center" />
                {/* 大頭貼照 */}
                <div
                  style={{ position: "absolute", right: "50px", top: "0px" }}
                >
                  <div>
                    {/* <div>
                    <input type="file" name="file" onChange={handleFile} />
                    <button onClick={handleUpload}>Upload</button>
                  </div> */}
                    <div>
                      <input
                        id="customFileInput"
                        type="file"
                        accept="image/*"
                        className="upload_input"
                        onChange={handleFile}
                      />
                      <label htmlFor="customFileInput" className="upload_label">
                        <span>➕選擇檔案...</span>
                      </label>
                      <button onClick={handleUpload} className="upload_label">
                        <span>上傳檔案</span>
                      </button>
                    </div>
                    <div className="info-box">
                      <p>
                        檔名：<span id="file_name"></span>
                      </p>
                      <p>
                        類型：<span id="file_type"></span>
                      </p>
                      <p>
                        大小：<span id="file_size"></span>
                      </p>
                      <p>
                        最後更新時間：<span id="file_time"></span>
                      </p>
                      <p>縮圖：</p>
                      <figure style={{ display: "block", margin: 0 }}>
                        <img id="file_thumbnail" style={{ width: "20%" }} />
                      </figure>
                    </div>
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
                        keyfilter="num"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
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
                        onChange={(e) => setWeight(e.target.value)}
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
                    onClick={() => EditSave(0)}
                    style={{ marginRight: "5px" }}
                    disabled={disabledEdit}
                  ></Button>
                  <Button
                    label="儲存"
                    onClick={() => EditSave(1)}
                    disabled={disabledSave}
                  ></Button>
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
