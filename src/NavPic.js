import { React } from "react";
import Carousel from "react-bootstrap/Carousel";
import gymNavPic_1 from "./pic/gymNavPic_1.jpg";
import gymNavPic_2 from "./pic/gymNavPic_2.jpg";
import gymNavPic_3 from "./pic/gymNavPic_3.jpg";
function NavPic() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={gymNavPic_1}
          height={750}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Professional Coach</h3>
          <p>
            We have a professional coach team can let you train peace of mind.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={gymNavPic_2}
          height={750}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Complete Training Supplies</h3>
          <p>Our equipment and training supplies are complete and latest.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={gymNavPic_3}
          height={750}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Diverse Facilities</h3>
          <p>
            The Luzhougym provides many venues so that members can try various
            sports classes.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default NavPic;
