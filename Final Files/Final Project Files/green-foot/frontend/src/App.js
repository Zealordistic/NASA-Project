import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './fonts.css'
import Navbar from './components/general/navbar'
import Home from './pages/home-page/Home';
import Results from './pages/results-page/Results';
import Profilepage from './pages/profile-pages/Profile';
import Updatepwpage from './pages/profile-pages/Updatepw';
import Updatemailpage from './pages/profile-pages/Updatemail';
import Search from './pages/search-pages/search';
import Login from './pages/login-page/login';



function App() {
  return (
    <>
    <Router basename="/node">
      <Navbar />
      <Routes>
        <Route path='/home' exact element= {<Home />} />
        <Route path='/search' exact element= {<Search />} />
        <Route path='/results' exact element= {<Results />} />
        <Route path='/profile' exact element= {<Profilepage/>} />
        <Route path='/updatepw' exact element= {<Updatepwpage/>} />
        <Route path='/updatemail' exact element= {<Updatemailpage/>} />
        <Route path='/login' exact element= {<Login />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
