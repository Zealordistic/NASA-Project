import React, {useEffect, useState, useRef} from 'react';
import  { Navigate, useNavigate} from 'react-router-dom'
import MainWindow from '../../components/search-page/main-window'
import Header from '../../components/general/header'
import Navbar from '../../components/general/navbar'
import './search.css';


const Search = () => {
   let navigate = useNavigate();
   function navigateToResults() {
        navigate('/results');
   }
    return (
        <>
            <Header header_name="Search for Data"/>
            <div className="container" id="introduction">
                <h1>Search Parameters</h1>
            </div>

            <MainWindow />
            <div className="container" id="search-button">
                <button type="button" class="btn btn-primary" onClick={navigateToResults}>Search</button>
            </div>
        </>

    )
}

export default Search;