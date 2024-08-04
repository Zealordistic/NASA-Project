import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './general-css/Navbar.css';
import {Button} from './Button'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  };

  useEffect(() => {
    showButton()
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
       <nav class="navbar bg-dark navbar-expand-lg" data-bs-theme="dark" id="gen-navbar">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Green Foot</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                <a class="nav-link" href="/search">Search</a>
                <a class="nav-link" href="/results">Results</a>
              </div>
              <div class="container-fluid" id="signup-button">
              <a class="btn btn-outline-light" href="/login" role="button">Login</a>
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}
export default Navbar

