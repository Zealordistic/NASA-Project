import React from 'react';
import './general-css/header.css';

const Header = ({header_name}) =>{
  return (
      // <nav className = "row-col-auto navbar navbar-expand-sm container-fluid">
      //   <div className = "col-lg-2" id = "logo"><a href="../"></a>Green Foot</div>
      //   <div className = "col-lg-1">Search</div>
      //   <div className = "col-lg-8"></div>
      //   <span className = "col-lg-1 icon" id = "smalltop" >G</span>
      // </nav> 
      <div class="container-fluid" id="header">
        <h1>{header_name}</h1>
      </div>
  );
}

export default Header;