import React, {useEffect, useState, useRef} from 'react';
import '../../App.css';
import { Button } from '../general/Button';
import './HeroSection.css';

function HeroSection() {


  return (
    <>
    
    <div className='container-fluid hero-container' id="hero-section">
      <video src="/videos/video-1.mp4" autoPlay loop muted id="video"/>
      <div className="container" id="caption">
      <h1>Bringing Data to Life </h1>
          <p>Exploring. Discovering. Defining. </p>
          <div className='hero-btns'>
            <Button
              className='btns'
              buttonStyle='btn--outline'
              buttonSize='btn--large'
            >
              GET STARTED
            </Button>
          </div>
      </div>
        
    </div>
    </>
  );
}

export default HeroSection;
