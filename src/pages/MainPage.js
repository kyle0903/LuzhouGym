import { React, useEffect, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import { Button } from "primereact/button";
import company from "../assets/images/company.jpeg";
import coach1 from "../assets/images/coach1.png";
import coach2 from "../assets/images/coach2.png";
import coach3 from "../assets/images/coach3.png";
import Navbar from "../components/Navbar";

function MainPage() {
  const legendTemplate_comp = (
    <div className="flex align-items-center">
      <span className="pi pi-building" style={{ fontSize: "1.5rem" }}></span>
      <span className="font-bold text-lg"> 公司介紹</span>
    </div>
  );
  const legendTemplate_coca = (
    <div className="flex align-items-center">
      <span className="pi pi-users" style={{ fontSize: "1.5rem" }}></span>
      <span className="font-bold text-lg"> 教練介紹</span>
    </div>
  );
  const coach1_pic = <img alt="Card" src={coach1} />;
  const coach2_pic = <img alt="Card" src={coach2} />;
  const coach3_pic = <img alt="Card" src={coach3} />;
  const company_pic = (
    <img src={company} style={{ margin: "10px", textAlign: "center" }} />
  );
  //購物車數量
  const [shopNum, setShopNum] = useState(0);
  return (
    <div>
      <Navbar shopNum={shopNum} setShopNum={setShopNum} />
      <HomeCarousel />
      <Fieldset legend={legendTemplate_comp}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231263.0357214885!2d121.27439860452445!3d25.085440927363337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac6b61dbbd8b%3A0xbcd1baad5c06a482!2z5Y-w5YyX5biC!5e0!3m2!1szh-TW!2stw!4v1672121439418!5m2!1szh-TW!2stw"
              width={850}
              height={500}
              style={{ border: "0px", borderRadius: "3%", margin: "10px" }}
            ></iframe>
          </div>
          <Card
            header={company_pic}
            title="蘆洲健身房 LuzhouGym"
            subTitle="地址：蘆洲區復興路258巷2弄3號1樓"
            style={{ margin: "10px" }}
          >
            LuzhouGym健身房的場地設計非常現代化，採用了高端的設計理念，並且環境舒適，提供給顧客良好的健身體驗。健身房內的設備齊全，有最新型號的跑步機、器械訓練設備以及自由重量區，適合各種不同的健身愛好者使用。另外，健身房還提供了一系列不同的訓練課程，例如有氧運動、肌力訓練、瑜伽、有氧搏擊等，每個人都可以找到自己喜歡的課程進行鍛鍊。
          </Card>
          {/* <div>
            <p className="text_comp">
              LuzhouGym健身房的場地設計非常現代化，採用了高端的設計理念，並且環境舒適，提供給顧客良好的健身體驗。健身房內的設備齊全，有最新型號的跑步機、器械訓練設備以及自由重量區，適合各種不同的健身愛好者使用。另外，健身房還提供了一系列不同的訓練課程，例如有氧運動、肌力訓練、瑜伽、有氧搏擊等，每個人都可以找到自己喜歡的課程進行鍛鍊。
              其次，健身房的服務非常周到，顧客可以得到專業的指導和建議。健身房配備了一支專業的教練團隊，他們有豐富的健身經驗，能夠根據顧客的需求制定個性化的健身計劃和建議，以協助顧客實現健身目標。此外，健身房的服務人員也非常熱情，會提供周到的服務，為顧客解決任何問題。
              最後，健身房還提供了一個社交平台，讓顧客可以在健身的同時認識更多志同道合的朋友。健身房提供了一個充滿活力的社區環境，讓顧客能夠一起參加各種活動和比賽，互相激勵和鼓勵，從而實現更好的健身效果。
              總的來說，這家新開的健身房提供了一個現代化、舒適的環境，配備了豐富的設備和課程，還有專業的指導和周到的服務。這是一個非常適合各種健身愛好者的場所
            </p>
          </div> */}
        </div>
      </Fieldset>
      <Fieldset legend={legendTemplate_coca}>
        <div style={{ display: "flex" }}>
          <Card title="Jax" subTitle="健身教練" header={coach1_pic}>
            <p className="m-0">
              Jax教練具備豐富的健身知識，包括運動科學、解剖學、運動生理學、營養學等，能夠幫助您設定合理的目標，制定個性化的鍛鍊計劃，並提供專業的指導和建議。
            </p>
          </Card>
          <Card title="Taisan" subTitle="拳擊教練" header={coach2_pic}>
            <p className="m-0">
              Taison教練能夠幫助拳手制定合理的訓練計劃，並且會在訓練中示範各種技巧和動作，幫助拳手熟練掌握技術，同時也能夠指導拳手進行適當的體能訓練。
            </p>
          </Card>
          <Card title="Jackson" subTitle="健身教練" header={coach3_pic}>
            <p className="m-0">
              Jackson教練擁有熱情和友好的態度，能夠營造出一個輕鬆、愉快的學習氛圍，讓您在鍛鍊中享受運動的樂趣，並且感受到他的關心和支持。
            </p>
          </Card>
        </div>
      </Fieldset>
      <div className="scrollTop">
        <Button
          icon="pi pi-arrow-up"
          aria-label="Filter"
          onClick={() => window.scrollTo(0, 0)}
          rounded
        />
      </div>
    </div>
  );
}

export default MainPage;
