import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styling/App.css'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import useLogin from './hooks/useLogin';
import CreateCampaign from './pages/CreateCampaign';
import Campaigns from './pages/Campaigns';




function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const {checkLogin, logout} = useLogin({setLoggedIn: setLoggedIn});
  useEffect(() => { checkLogin().finally(() => setLoading(false)) }, []);
  if (loading) return <div>Loading...</div>
  return (
    <Router>
      {loggedIn ? <Header logout={logout}/> : null}
      <Routes>
        <Route path="/" element={loggedIn ? <Campaigns/> : <Navigate to="/login" />} />
        <Route path="/login" element={ !loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Navigate to="/" />}/>
        <Route path="/create-campaign" element= {<CreateCampaign/>}/>

        
      </Routes>
    </Router>
  )
}

export default App
