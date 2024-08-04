import React, {useEffect} from 'react';
import Header from '../../components/general/header';
import USMap from '../../components/results/map';
import '../../App.css';
import './Results.css';
import Footer from '../../components/general/Footer';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

export default function Results() {

    async function saveSearchButton() {

        var username = read_cookie("username");
        var lat;
        var lon;
        var address;
        var city;
        var state;
        var zip;
        var code;
        var type;

        // console.log("HELLO WORLD");
        const queryString = window.location.search;
        // console.log(queryString);
        const urlParams = new URLSearchParams(queryString);

        for(const key of urlParams.keys()) {
            //console.log(key + " " + urlParams.get(key));
            if (key === "longitude") {
                lon = urlParams.get(key);
            } 
            else if (key === "latitude") {
                lat = urlParams.get(key);
            }
            else if (key === "address") {
                address = urlParams.get(key);
            }
            else if (key === "city") {
                city = urlParams.get(key);
            }
            else if (key === "state") {
                state = urlParams.get(key);
            }
            else if (key === "zip") {
                zip = urlParams.get(key);
            }
            else if (key === "code") {
                code = urlParams.get(key);
            }
            else if (key === "type") {
                type = urlParams.get(key);
            }
        }

        console.log("About to enter routes side of things")
        await fetch("https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/addSaveSearch", {
            method: "POST",
            body: JSON.stringify({lon: lon, lat: lat, address: address, city: city, state: state, zip: zip, plant_code: code, type: type, username: username}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json()).then (
            r => {
                console.log(r);
                if(r.status === "Success!") {
                    alert("Search has been saved!");
                } else {
                    alert("You already have this search saved!");
                }
            }
        );

       
        // uri = uri.substring(0, uri.length-1);
        //console.log(uri);
    }
    
    return ( 
        <>
        <Header header_name="View your results"/>
        <div className="results">
            <div className="filterHolder">
                <div className="dropdown">
                    {read_cookie("isLoggedIn") === "1" && <button className="downbtn" onClick={saveSearchButton}>Save Search</button>}
                </div>
            </div>
            <div className="visualResult">
                    <USMap/>
            </div>
            <div className="writtenResult">
                <div className="resultBoxWritten">
                </div>
            </div>
        </div>
        </>
    );
}