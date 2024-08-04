import React, {useEffect, useState} from 'react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import  { Navigate, useNavigate} from 'react-router-dom'
import * as jsonexport from "jsonexport/dist";
// import '../css/profile.css';

const Savedsearch = () => {
  const [saved_search, setSavedSearch] = useState([]);
  const username = read_cookie("username");
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/${username}/fetchData`).then(
      response => response.json()
    ).then(
      result => { console.log(result); setSavedSearch(result.data.SavedSearches)}
    )
  }, [username])

  async function createFinalObj(id) {
      var final_obj = {};
      let searches = await fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/${username}/fetchData`);
      let parse_searches = await searches.json();

      // get powerplant data and add to final object
      let query = `https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/getPowerPlantData?`
      for(const key in parse_searches.data.SavedSearches[id]) {
        query += `${key}=${parse_searches.data.SavedSearches[id][key]}&`
      }
      query = query.substring(0, query.length-1);
      let obj = await fetch(query);
      let pp_obj = await obj.json();
      final_obj.powerplants = pp_obj;

      // //get precipitation data and add to object
      let per_data = await fetch("https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/getPrecipitationPoints");
      let parse_per_data = await per_data.json();
      final_obj.precipitation = parse_per_data;

      return final_obj;
  }

  async function jsonDownload(id) {
      //create object for donwload
      let final_obj = await createFinalObj(id);
      // console.log(final_obj);
      //set up blob to prepare for download
      var jsonse = JSON.stringify(final_obj);
      var blob = new Blob([jsonse], {type: "application/json"});
      var jsonURL  = window.URL.createObjectURL(blob);
      var tempLink = document.createElement('a');
      tempLink.href = jsonURL;
      tempLink.setAttribute('download', `${username}_${id}_savedsearch.json`)
      tempLink.click();
  }

  async function csvDownload(id) {
    //create object for donwload
    let final_obj = await createFinalObj(id);
    // console.log(final_obj);
    //convert json to csv and create blob for download
    jsonexport(final_obj, function(err, csv) {
      if(err) return console.log(err);
      var blob = new Blob([csv], {type: 'text/csv'});
      var csvURL = window.URL.createObjectURL(blob);
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', `${username}_${id}_savedsearch.csv`)
      tempLink.click();
    });
  }

  function viewSearch(id) {
    fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/${username}/fetchData`).then(
      result => result.json()
    ).then (
      r => {
        let s = r.data.SavedSearches[id];
        //console.log(s);
        let query = "";
        for (const key in s) {
          query += `${key}=${s[key]}&`;
        }
        query = query.substring(0, query.length-1);
        console.log(query);
        return query;
      } 
    ).then (
      query => navigate("/results?"+query)
    )
  }

  async function deleteSearch(id) {
    var bodyobj = {index: id.toString()}
    fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/${read_cookie("username")}/removeSearch`, {
      method: "DELETE",
      body: JSON.stringify(bodyobj),
      headers: {
             'Content-Type': 'application/json'
          }
    }).then(
      result => result.json()
    ).then(
      r => {
        if(r.code === "200") {
          alert("Search has been removed!");
          window.location.reload();
        } else {
          alert(r.message);
        }
      }
    )
  }

  return (
    <div id = "moreright">
      <p>Saved Searches:</p>
      <ul id = "saved">
        {saved_search.map((search, i) => 
          <li key={i}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{"Saved Search " + (i+1)}</h5>
              {Object.keys(search).map((key, j) => 
              <p key={key}>{key}: {search[key]}</p>)}
              <a href="#" class="btn btn-primary" key={"viewSearch " + i} onClick={() => viewSearch(i)}>View Search</a>
              <a class="btn btn-primary" key={"downloadJSON " + i} onClick={async () => await jsonDownload(i)}>Download JSON</a>
              <a class="btn btn-primary" key={"downloadCSV " + i} onClick={async () => await csvDownload(i)}>Download CSV</a>
              <a href="#" class="btn btn-primary" key={"deleteSearch " + i} onClick={async () => await deleteSearch(i)}>Delete</a>
            </div>
          </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Savedsearch;