import { React, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import company from "../assets/images/pic/company.jpeg";
import coach1 from "../assets/images/pic/coach1.png";
import coach2 from "../assets/images/pic/coach2.png";
import coach3 from "../assets/images/pic/coach3.png";
import Navbar from "../components/Navbar";

function MainPage() {
  const [shopNum, setShopNum] = useState(0);

  const coach1_pic = <img alt="Jax教練" src={coach1} style={{ width: "100%", height: "300px", objectFit: "cover" }} />;
  const coach2_pic = <img alt="Taisan教練" src={coach2} style={{ width: "100%", height: "300px", objectFit: "cover" }} />;
  const coach3_pic = <img alt="Jackson教練" src={coach3} style={{ width: "100%", height: "300px", objectFit: "cover" }} />;

  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7faddb 100%)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(2px)",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            歡迎來到蘆洲健身房 LuzhouGym
          </h1>
          <p style={{ fontSize: "1.3rem", marginBottom: "30px", opacity: 0.95 }}>
            專業教練團隊 • 完善訓練設備 • 多元化課程
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              padding: "25px 35px",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              <i className="pi pi-users" style={{ fontSize: "2.5rem", marginBottom: "10px" }}></i>
              <h3 style={{ margin: "10px 0 5px 0" }}>專業教練</h3>
              <p style={{ margin: 0, opacity: 0.95 }}>經驗豐富的指導團隊</p>
            </div>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              padding: "25px 35px",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              <i className="pi pi-star" style={{ fontSize: "2.5rem", marginBottom: "10px" }}></i>
              <h3 style={{ margin: "10px 0 5px 0" }}>頂級設備</h3>
              <p style={{ margin: 0, opacity: 0.95 }}>最新訓練器材</p>
            </div>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              padding: "25px 35px",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
            }}>
              <i className="pi pi-calendar" style={{ fontSize: "2.5rem", marginBottom: "10px" }}></i>
              <h3 style={{ margin: "10px 0 5px 0" }}>多元課程</h3>
              <p style={{ margin: 0, opacity: 0.95 }}>滿足各種訓練需求</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Introduction */}
      <div style={{ maxWidth: "1400px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e3c72", marginBottom: "10px" }}>
            <i className="pi pi-building" style={{ marginRight: "15px", color: "#2a5298" }}></i>
            關於我們
          </h2>
          <Divider />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "center" }}>
          <div>
            <Card
              style={{
                boxShadow: "0 4px 20px rgba(30, 60, 114, 0.15)",
                border: "1px solid rgba(30, 60, 114, 0.1)",
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src={company}
                alt="蘆洲健身房"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
              <h3 style={{ color: "#2a5298", marginBottom: "10px", fontSize: "1.5rem" }}>蘆洲健身房 LuzhouGym</h3>
              <p style={{ color: "#666", fontSize: "1rem", marginBottom: "15px" }}>
                <i className="pi pi-map-marker" style={{ marginRight: "8px", color: "#2a5298" }}></i>
                蘆洲區復興路258巷2弄3號1樓
              </p>
              <p style={{ color: "#555", lineHeight: "1.8", textAlign: "justify" }}>
                LuzhouGym健身房的場地設計非常現代化，採用了高端的設計理念，並且環境舒適，提供給顧客良好的健身體驗。健身房內的設備齊全，有最新型號的跑步機、器械訓練設備以及自由重量區，適合各種不同的健身愛好者使用。另外，健身房還提供了一系列不同的訓練課程，例如有氧運動、肌力訓練、瑜伽、有氧搏擊等，每個人都可以找到自己喜歡的課程進行鍛鍊。
              </p>
            </Card>
          </div>

          <div>
            <iframe
              title="蘆洲健身房地圖"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231263.0357214885!2d121.27439860452445!3d25.085440927363337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac6b61dbbd8b%3A0xbcd1baad5c06a482!2z5Y-w5YyX5biC!5e0!3m2!1szh-TW!2stw!4v1672121439418!5m2!1szh-TW!2stw"
              width="100%"
              height="500"
              style={{
                border: "0px",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(30, 60, 114, 0.15)",
              }}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Coach Introduction */}
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "60px 20px", backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e3c72", marginBottom: "10px" }}>
              <i className="pi pi-users" style={{ marginRight: "15px", color: "#2a5298" }}></i>
              專業教練團隊
            </h2>
            <Divider />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
            }}
          >
            <Card
              title="Jax"
              subTitle="健身教練"
              header={coach1_pic}
              style={{
                boxShadow: "0 4px 20px rgba(30, 60, 114, 0.15)",
                border: "1px solid rgba(30, 60, 114, 0.1)",
                borderRadius: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(42, 82, 152, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(30, 60, 114, 0.15)";
              }}
            >
              <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
                Jax教練具備豐富的健身知識，包括運動科學、解剖學、運動生理學、營養學等，能夠幫助您設定合理的目標，制定個性化的鍛鍊計劃，並提供專業的指導和建議。
              </p>
            </Card>

            <Card
              title="Taisan"
              subTitle="拳擊教練"
              header={coach2_pic}
              style={{
                boxShadow: "0 4px 20px rgba(30, 60, 114, 0.15)",
                border: "1px solid rgba(30, 60, 114, 0.1)",
                borderRadius: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(42, 82, 152, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(30, 60, 114, 0.15)";
              }}
            >
              <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
                Taisan教練能夠幫助拳手制定合理的訓練計劃，並且會在訓練中示範各種技巧和動作，幫助拳手熟練掌握技術，同時也能夠指導拳手進行適當的體能訓練。
              </p>
            </Card>

            <Card
              title="Jackson"
              subTitle="健身教練"
              header={coach3_pic}
              style={{
                boxShadow: "0 4px 20px rgba(30, 60, 114, 0.15)",
                border: "1px solid rgba(30, 60, 114, 0.1)",
                borderRadius: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(42, 82, 152, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(30, 60, 114, 0.15)";
              }}
            >
              <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
                Jackson教練擁有熱情和友好的態度，能夠營造出一個輕鬆、愉快的學習氛圍，讓您在鍛鍊中享受運動的樂趣，並且感受到他的關心和支持。
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
            © 2024 蘆洲健身房 LuzhouGym. All rights reserved.
          </p>
          <p style={{ opacity: 0.9, margin: "10px 0" }}>
            地址：蘆洲區復興路258巷2弄3號1樓
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="scrollTop">
        <Button
          icon="pi pi-arrow-up"
          aria-label="回到頂部"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          rounded
          style={{
            background: "linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)",
            border: "none",
            width: "50px",
            height: "50px",
            boxShadow: "0 4px 15px rgba(30, 60, 114, 0.3)",
          }}
        />
      </div>
    </div>
  );
}

export default MainPage;
