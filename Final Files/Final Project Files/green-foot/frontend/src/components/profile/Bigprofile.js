import React, {useEffect} from 'react';
import {read_cookie} from 'sfcookies'

const Bigprofile = () => {
  useEffect(() => {
    console.log(read_cookie("username"));
    fetch("https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/"+read_cookie("username")+"/fetchData")
      .then(response => response.json())
      .then(result => {
        if(result.code === "200"){
          document.getElementById("name").innerHTML = result.data.Firstname + ' ' + result.data.Lastname;
          document.getElementById("email").innerHTML = result.data.Email;
          document.getElementById("bigmiddle").innerHTML = result.data.Bio;
        }
      });
  }, [])
  

  return (
    <div id = "biginfo">
      <span className = "icon" id = "bigmiddle"></span>
      <p id = "name"></p>
      <p id = "email"></p>
    </div>
  );
}

export default Bigprofile;