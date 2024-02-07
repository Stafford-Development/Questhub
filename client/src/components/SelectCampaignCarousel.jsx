import {Carousel, Nav} from 'react-bootstrap';
import '../styling/App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


function SelectCampaignCarousel() {

const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }; 

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval ={null} variant='dark'>
        <Carousel.Item>
            <Nav.Link href="create-campaign">
                <img
                    className="d-block w-100"
                    src= '../public/Sword-Coast-Map_LowRes.png'
                    alt="First slide"
                />
                <Carousel.Caption className = 'carousel-text-wrap'>
                    <h1 className = 'carousel-text-title'>The Sword Coast</h1>
                    <h3 className = 'carousel-text'>Create a campaign set in the sword coast!</h3>
                </Carousel.Caption>
            </Nav.Link>
        </Carousel.Item>
        <Carousel.Item>
            <Nav.Link href="create-campaign">
                <img
                    className="d-block w-100"
                    src= '../public/KrynnMap.png'
                    alt="Second slide"
                />
                <Carousel.Caption className = 'carousel-text-wrap'>
                    <h1 className = 'carousel-text-title'>Krynn</h1>
                    <h3 className = 'carousel-text'>Create a campaign set in the world of Krynn!</h3>
                </Carousel.Caption>
            </Nav.Link>
        </Carousel.Item>
    </Carousel>
  )
}

export default SelectCampaignCarousel