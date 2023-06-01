import React from "react";
import CoursePic from "./CoursePic";
import course1 from "./pic/course1.jpeg";
import course1_2 from "./pic/course1_2.jpeg";
import course2 from "./pic/course2.jpeg";
import course2_1 from "./pic/course2_1.jpeg";
import course3 from "./pic/course3.jpeg";
import course3_1 from "./pic/course3_1.jpeg";
function Course() {
  return (
    <div>
      <CoursePic />
      {/* 飛輪課程 */}
      <div className="title">飛輪課程</div>
      <div style={{ display: "flex" }}>
        <div>
          <img src={course1} style={{ width: "850px" }} />
        </div>

        <div className="textarea">
          <div className="text_title">飛輪基礎課程</div>
          <div className="text_context">
            這個課程將帶領您挑戰自己的耐力、速度和力量，提高心肺功能，同時增強下半身肌肉。我們的飛輪課程由經驗豐富的教練帶領，提供個性化的指導和動力，讓您在愉快的氛圍中達到健身目標
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="textarea2">
          <div className="text_title">飛輪進階課程</div>
          <div className="text_context">
            飛輪進階課程是為那些尋求更高挑戰和更進一步的健身者而設計的。通過更高強度的訓練和復雜的動作組合，這個課程將幫助您提升耐力、速度和力量，進一步挑戰自己的身體極限
          </div>
        </div>
        <img src={course1_2} style={{ width: "850px", height: "550px" }} />
      </div>
      {/* 拳擊課程 */}
      <div className="title">拳擊課程</div>
      <div style={{ display: "flex" }}>
        <div>
          <img src={course2} style={{ width: "850px" }} />
        </div>

        <div className="textarea">
          <div className="text_title">拳擊基礎課程</div>
          <div className="text_context">
            拳擊是一項高強度的運動，能夠幫助你燃燒卡路里，減脂塑形，並改善身體的體態。透過定期參加拳擊基礎課程，你可以增加身體的肌肉量，改善身體比例和體態，且拳擊基礎課程可以教授基本的拳擊技巧和自衛技能，讓你在不良情況下能夠保護自己，可以提高你的自信心和安全感，並在需要時提供實際的保護
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="textarea2">
          <div className="text_title">拳擊進階課程</div>
          <div className="text_context">
            拳擊進階課程專注於進一步提升你的技術水平。無論你是初學者還是已經有基礎的拳擊者，進階課程都會教授更高級的技巧、組合和戰術，幫助你提升拳擊技能，同時，進階課程提供更高強度和更具挑戰性的訓練，可以激發你的潛力並超越自我。通過不斷地克服新的技術和身體上的挑戰，你將體驗到成長和進步的喜悅
          </div>
        </div>
        <img src={course2_1} style={{ width: "850px", height: "550px" }} />
      </div>
      {/* 瑜珈課程 */}
      <div className="title">瑜珈課程</div>
      <div style={{ display: "flex" }}>
        <div>
          <img src={course3} style={{ width: "850px" }} />
        </div>

        <div className="textarea">
          <div className="text_title">基礎瑜珈課程</div>
          <div className="text_context">
            參加瑜珈課程可以幫助你改善身體的靈活性、平衡力和力量，同時還有助於減壓、放鬆心情，提升身心健康，且瑜珈強調正確的姿勢和對身體的意識。通過瑜珈課程，你可以學習如何改善站姿、坐姿和行走姿勢，進一步增強核心肌肉，使你的身體保持優雅的姿態
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className="textarea2">
          <div className="text_title">空中瑜伽課程</div>
          <div className="text_context">
            空中瑜珈是一種創新而有趣的運動方式，結合了瑜珈的伸展和強化動作，以及在懸掛的絲帶或吊索上進行的動作。這種獨特的運動方式可以讓你在挑戰自己的同時，享受新奇和樂趣，而且因為空中瑜珈的動作需要你在懸掛狀態下保持平衡和控制身體。這可以幫助你加強核心肌肉，包括腹部、背部和臀部肌肉，提高身體的穩定性和平衡能力
          </div>
        </div>
        <img src={course3_1} style={{ width: "850px", height: "550px" }} />
      </div>
    </div>
  );
}

export default Course;
