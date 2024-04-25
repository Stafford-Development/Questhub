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
import ConfirmationLoading from './pages/ConfirmationLoading';
import Settings from './pages/Settings';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const {checkLogin, logout, sendConfirmationEmail, checkConfirmed} = useLogin({setLoggedIn: setLoggedIn});
  useEffect(() => { checkLogin().finally(() => setLoading(false)) }, []);
  useEffect(() => { 
    if (loggedIn) {
      checkConfirmed(setConfirmed, setLoading).finally(() => setLoading(false));
    }
  }, [loggedIn]);
  if (loading) return <Spinner animation="border" role="status"/>;

  return (
    <Router>
      {loggedIn ? <Header logout={logout}/> : null}
      <Routes>
        <Route path="/confirmation-loading" element={loggedIn ? (!confirmed ? <ConfirmationLoading sendConfirmationEmail={sendConfirmationEmail}/> : <Navigate to="/"/>) : <Navigate to="/login"/>}/>
        <Route path="/" element={loggedIn ? (confirmed ? <Campaigns/> : <Navigate to="/confirmation-loading" />) : <Navigate to="/login" />} />
        <Route path="/settings" element={loggedIn ?  <Settings/> : <Navigate to="/login" />} />
        <Route path="/login" element={ !loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Navigate to="/" />}/>
        <Route path="/Game/:campaignId" element= {loggedIn ? <Game/> : <Navigate to="/login" />}/>
        <Route path="/ConfirmationSuccess" element= {<ConfirmationSuccess />} />
      </Routes>
    </Router>
  )
}

export default App
