import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Card } from "primereact/card";
import NavPic from "./NavPic";
import company from "./pic/company.png";
import coach1 from "./pic/coach1.png";
import coach2 from "./pic/coach2.png";
import coach3 from "./pic/coach3.png";

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
  return (
    <div>
      <NavPic />
      <Fieldset legend={legendTemplate_comp}>
        <div style={{ display: "flex" }}>
          <img src={company} height={500} />
          <div className="div_comp">
            <p className="text_comp">
              LuzhouGym健身房的場地設計非常現代化，採用了高端的設計理念，並且環境舒適，提供給顧客良好的健身體驗。健身房內的設備齊全，有最新型號的跑步機、器械訓練設備以及自由重量區，適合各種不同的健身愛好者使用。另外，健身房還提供了一系列不同的訓練課程，例如有氧運動、肌力訓練、瑜伽、有氧搏擊等，每個人都可以找到自己喜歡的課程進行鍛鍊。
              其次，健身房的服務非常周到，顧客可以得到專業的指導和建議。健身房配備了一支專業的教練團隊，他們有豐富的健身經驗，能夠根據顧客的需求制定個性化的健身計劃和建議，以協助顧客實現健身目標。此外，健身房的服務人員也非常熱情，會提供周到的服務，為顧客解決任何問題。
              最後，健身房還提供了一個社交平台，讓顧客可以在健身的同時認識更多志同道合的朋友。健身房提供了一個充滿活力的社區環境，讓顧客能夠一起參加各種活動和比賽，互相激勵和鼓勵，從而實現更好的健身效果。
              總的來說，這家新開的健身房提供了一個現代化、舒適的環境，配備了豐富的設備和課程，還有專業的指導和周到的服務。這是一個非常適合各種健身愛好者的場所
            </p>
          </div>
        </div>
      </Fieldset>
      <Fieldset legend={legendTemplate_coca}>
        <div style={{ display: "flex" }}>
          <Card title="Title" subTitle="Subtitle" header={coach1_pic}>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
          <Card title="Title" subTitle="Subtitle" header={coach2_pic}>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
          <Card title="Title" subTitle="Subtitle" header={coach3_pic}>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </Card>
        </div>
      </Fieldset>
    </div>
  );
}

export default MainPage;
