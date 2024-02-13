import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import {Row, Col} from "react-bootstrap";

import {Card} from "react-bootstrap";

function CampaignCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="slider-container carousel-height">
        <Row>
            <Col md={3}>
                <Card className="me-3">
                    <Card.Body>
                        <Card.Title>Create Campaign</Card.Title>
                        
                    </Card.Body>
                </Card>
            </Col>
            <Col md={9}>
                <Slider  {...settings} >
                    <Card>meow</Card>
                    <Card>meow2</Card>
                    <Card>meow4</Card>
                    <Card>meow5</Card>
                    <Card>meow6</Card>
                    <Card>meow7</Card>
                </Slider>
            </Col>
        </Row>
    </div>
  );
}

export default CampaignCarousel;