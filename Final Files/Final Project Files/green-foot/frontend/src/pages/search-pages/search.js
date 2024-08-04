import React, {useEffect, useState, useRef} from 'react';
import  { Navigate, useNavigate} from 'react-router-dom'
import MainWindow from '../../components/search-page/main-window'
import Header from '../../components/general/header'
import './search.css';


const Search = () => {
   let navigate = useNavigate();
   function navigateToResults() {
        //perform API calls here
        var url = '/results?';
        let inputs = document.getElementsByClassName('form-control');
        for(let i = 0; i < inputs.length; i++)
        {
            let key = inputs[i].id.replace(/\s/g, "%20").toLowerCase();
            if(inputs[i].id === "Plant Type") {
                key = "type"
            } else if (inputs[i].id === "Plant Code") {
                key = "code"
            } else if (inputs[i].id === "Zip Code") {
                key = "zip"
            }
            url += `${key}=${inputs[i].value}&`;
        }
        url = url.substring(0, url.length-1);
        // console.log(url);
        navigate(url);
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