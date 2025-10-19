import Carousel from "react-bootstrap/Carousel";
import coursePic1 from "../../assets/images/pic/coursePic1.jpeg";
import coursePic2 from "../../assets/images/pic/coursePic2.jpeg";
import coursePic3 from "../../assets/images/pic/coursePic3.jpeg";

function CourseCarousel() {
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

export default CourseCarousel;
