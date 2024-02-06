import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styling/App.css'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';




function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Router>
      {loggedIn ? <Header loggedIn={loggedIn}/> : null}
      <Routes>
        <Route path="/" element={loggedIn ? <Home/> : <Navigate to="/login" />} />
        <Route path="/login" element={ !loggedIn ? <Login loggedIn={loggedIn} /> : <Navigate to="/" />}/>
        
      </Routes>
    </Router>
  )
}

export default App
