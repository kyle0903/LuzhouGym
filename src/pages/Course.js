import { React, useState } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import course1 from "../assets/images/pic/course1.jpeg";
import course1_2 from "../assets/images/pic/course1_2.jpeg";
import course2 from "../assets/images/pic/course2.jpeg";
import course2_1 from "../assets/images/pic/course2_1.jpeg";
import course3 from "../assets/images/pic/course3.jpeg";
import course3_1 from "../assets/images/pic/course3_1.jpeg";
import Navbar from "../components/Navbar";

function Course() {
  const [shopNum, setShopNum] = useState(0);

  const CourseSection = ({ title, subtitle, description, image, reverse = false }) => (
    <Card
      style={{
        boxShadow: "0 4px 20px rgba(30, 60, 114, 0.12)",
        border: "1px solid rgba(30, 60, 114, 0.1)",
        borderRadius: "15px",
        marginBottom: "30px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: reverse ? "1fr 1.2fr" : "1.2fr 1fr",
          gap: "0",
          alignItems: "center",
        }}
      >
        {!reverse && (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
        )}
        <div style={{ padding: "40px" }}>
          <h3
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#2a5298",
              marginBottom: "10px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#5a7ba8",
              marginBottom: "20px",
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "#555",
              lineHeight: "1.8",
              textAlign: "justify",
            }}
          >
            {description}
          </p>
        </div>
        {reverse && (
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </Card>
  );

  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7faddb 100%)",
          color: "white",
          padding: "60px 20px",
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
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "15px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            課程介紹
          </h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.95 }}>
            提供多樣化的訓練課程，滿足不同健身需求
          </p>
        </div>
      </div>

      {/* 飛輪課程 */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1e3c72",
              marginBottom: "10px",
            }}
          >
            <i className="pi pi-bolt" style={{ marginRight: "15px", color: "#2a5298" }}></i>
            飛輪課程
          </h2>
          <Divider />
        </div>

        <CourseSection
          title="飛輪基礎課程"
          subtitle="適合初學者與中級學員"
          description="這個課程將帶領您挑戰自己的耐力、速度和力量，提高心肺功能，同時增強下半身肌肉。我們的飛輪課程由經驗豐富的教練帶領，提供個性化的指導和動力，讓您在愉快的氛圍中達到健身目標。"
          image={course1}
        />

        <CourseSection
          title="飛輪進階課程"
          subtitle="為尋求更高挑戰的學員設計"
          description="飛輪進階課程是為那些尋求更高挑戰和更進一步的健身者而設計的。通過更高強度的訓練和復雜的動作組合，這個課程將幫助您提升耐力、速度和力量，進一步挑戰自己的身體極限。"
          image={course1_2}
          reverse={true}
        />
      </div>

      {/* 拳擊課程 */}
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "60px 20px", backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#1e3c72",
                marginBottom: "10px",
              }}
            >
              <i className="pi pi-shield" style={{ marginRight: "15px", color: "#2a5298" }}></i>
              拳擊課程
            </h2>
            <Divider />
          </div>

          <CourseSection
            title="拳擊基礎課程"
            subtitle="學習基本技巧與自衛能力"
            description="拳擊是一項高強度的運動，能夠幫助你燃燒卡路里，減脂塑形，並改善身體的體態。透過定期參加拳擊基礎課程，你可以增加身體的肌肉量，改善身體比例和體態，且拳擊基礎課程可以教授基本的拳擊技巧和自衛技能，讓你在不良情況下能夠保護自己，可以提高你的自信心和安全感，並在需要時提供實際的保護。"
            image={course2}
          />

          <CourseSection
            title="拳擊進階課程"
            subtitle="提升技術水平與戰術應用"
            description="拳擊進階課程專注於進一步提升你的技術水平。無論你是初學者還是已經有基礎的拳擊者，進階課程都會教授更高級的技巧、組合和戰術，幫助你提升拳擊技能，同時，進階課程提供更高強度和更具挑戰性的訓練，可以激發你的潛力並超越自我。通過不斷地克服新的技術和身體上的挑戰，你將體驗到成長和進步的喜悅。"
            image={course2_1}
            reverse={true}
          />
        </div>
      </div>

      {/* 瑜珈課程 */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1e3c72",
              marginBottom: "10px",
            }}
          >
            <i className="pi pi-sun" style={{ marginRight: "15px", color: "#2a5298" }}></i>
            瑜珈課程
          </h2>
          <Divider />
        </div>

        <CourseSection
          title="基礎瑜珈課程"
          subtitle="改善靈活性與身心健康"
          description="參加瑜珈課程可以幫助你改善身體的靈活性、平衡力和力量，同時還有助於減壓、放鬆心情，提升身心健康，且瑜珈強調正確的姿勢和對身體的意識。通過瑜珈課程，你可以學習如何改善站姿、坐姿和行走姿勢，進一步增強核心肌肉，使你的身體保持優雅的姿態。"
          image={course3}
        />

        <CourseSection
          title="空中瑜伽課程"
          subtitle="創新有趣的運動體驗"
          description="空中瑜珈是一種創新而有趣的運動方式，結合了瑜珈的伸展和強化動作，以及在懸掛的絲帶或吊索上進行的動作。這種獨特的運動方式可以讓你在挑戰自己的同時，享受新奇和樂趣，而且因為空中瑜珈的動作需要你在懸掛狀態下保持平衡和控制身體。這可以幫助你加強核心肌肉，包括腹部、背部和臀部肌肉，提高身體的穩定性和平衡能力。"
          image={course3_1}
          reverse={true}
        />
      </div>

      {/* Footer */}
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
        </div>
      </div>
    </div>
  );
}

export default Course;
