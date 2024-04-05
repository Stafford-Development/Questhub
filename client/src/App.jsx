import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styling/App.css'
import { Navbar, Nav, NavDropdown, Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import useLogin from './hooks/useLogin';
import CreateCampaign from './pages/CreateCampaign';
import Campaigns from './pages/Campaigns';
import Game from './pages/Game';
import ConfirmationSuccess from './pages/ConfirmationSuccess';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const {checkLogin, logout} = useLogin({setLoggedIn: setLoggedIn});
  useEffect(() => { checkLogin().finally(() => setLoading(false)) }, []);
  if (loading) return <Spinner animation="border" role="status"/>;
  return (
    <Router>
      {loggedIn ? <Header logout={logout}/> : null}
      <Routes>
        <Route path="/" element={loggedIn ? <Campaigns/> : <Navigate to="/login" />} />
        <Route path="/login" element={ !loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Navigate to="/" />}/>
        <Route path="/create-campaign" element= {<CreateCampaign/>}/>
        <Route path="/Game/:campaignId" element= {loggedIn ? <Game/> : <Navigate to="/login" />}/>
        <Route path="/ConfirmationSuccess" element= {<ConfirmationSuccess/>} />
      </Routes>
    </Router>
  )
}

export default App
