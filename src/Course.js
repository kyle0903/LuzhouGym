import React from "react";
import CoursePic from "./CoursePic";
import course1 from "./pic/course1.jpeg";
import course1_2 from "./pic/course1_2.jpeg";
function Course() {
  return (
    <div>
      <CoursePic />
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
    </div>
  );
}

export default Course;
