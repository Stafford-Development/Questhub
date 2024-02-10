import React, { useState } from 'react';
import { Image, Dropdown } from 'react-bootstrap';
//import '../styling/App.css';

const ProfilePopup = ({ profilePicUrl, logout }) => {
 

  return (
    <Dropdown className='me-2' >
      <Dropdown.Toggle  id="dropdown-basic" >
        <Image src={profilePicUrl} width={55} height={55} roundedCircle />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item className='text-center' href="#/action-1">Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className='text-center' href="#/action-2" onClick={(event) => {
          event.preventDefault();
          logout();
        }}>Logout</Dropdown.Item>
      </Dropdown.Menu> 
    </Dropdown>
  );
}

export default ProfilePopup;