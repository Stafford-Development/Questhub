import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styling/App.css'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Header from './components/header';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';




function App() {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <Router>
      {loggedIn ? <Header loggedIn={loggedIn}/> : null}
      <Routes>
        <Route path="/" element={loggedIn ? <Home/> : <Navigate to="/login" />} />
        <Route path="/login" element={ !loggedIn ? <Login loggedIn={loggedIn} /> : <Navigate to="/home" />}/>
        <Route path="/create-campaign" element= {<CreateCampaign/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
