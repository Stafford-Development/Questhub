import { useState } from 'react'
import '../styling/App.css'
import {Button, Form } from 'react-bootstrap';
import SelectCampaignCarousel from '../components/SelectCampaignCarousel';



function Home() {
  return (
    <SelectCampaignCarousel/>
  )
}

export default Home