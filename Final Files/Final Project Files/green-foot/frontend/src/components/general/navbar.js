import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './general-css/Navbar.css';
import {Button} from './Button';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

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
    console.log(read_cookie("username"))
    console.log(read_cookie("isLoggedIn"))
    showButton()
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
       <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark" id="gen-navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="/node/home">Green Foot</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/node/home">Home</a>
                <a class="nav-link" href="/node/search">Search</a>
              </div>
              <div className="container-fluid" id="signup-button">
                {read_cookie("isLoggedIn") === "1" ? 
                 <a className="btn btn-outline-light" href="/node/profile" role="button">Profile</a>
                 : <a className="btn btn-outline-light" href="/node/login" role="button">Login</a>
                }
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}
export default Navbar

