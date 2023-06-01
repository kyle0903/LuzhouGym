import React from "react";
import coursePic1 from "./pic/coursePic1.jpeg";
import coursePic2 from "./pic/coursePic2.jpeg";
import coursePic3 from "./pic/coursePic3.jpeg";
import Carousel from "react-bootstrap/Carousel";
function CoursePic() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={coursePic1}
          height={750}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={coursePic2}
          height={750}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={coursePic3}
          height={750}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CoursePic;
