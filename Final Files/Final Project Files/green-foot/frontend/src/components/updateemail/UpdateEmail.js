import React from "react";
import {useNavigate, redirect} from "react-router-dom";
import {read_cookie} from 'sfcookies'

function updateemail(){
  if(document.getElementById("oEmail").value.trim() == "" || 
     document.getElementById("nEmail").value.trim() == "" ||
     document.getElementById("vpasswd").value.trim() == ""){
    document.getElementById("oEmail").value = null;
    document.getElementById("nEmail").value = null;
    document.getElementById("vpasswd").value = null;
    alert("Error: All fields are required")
    return;
  }
  fetch("https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/"+read_cookie("username")+"/changeEmail", {
    method: "PUT",
    body: JSON.stringify({
      "oldemail": document.getElementById("oEmail").value,
      "newemail": document.getElementById("nEmail").value,
      "password": document.getElementById("vpasswd").value
    }),
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
    .then(result2 => {
      if(result2.code !== "200")
        alert("Error: "+result2.message);
      else{
        alert("Success! Your email has been updated to: "
              +document.getElementById("nEmail").value+"!");
        document.getElementById("oEmail").value = null;
        document.getElementById("nEmail").value = null;
        document.getElementById("vpasswd").value = null;
        redirect("../profile");
      }
    });
}

const UpdateEmail = () => {
  const navigate = useNavigate();
  return (
    <form id = "updatemail">
      <div className="row divform">
        <label className = "col-lg-5" htmlFor="lname" id = "oemail">Input Old Email Address:</label>
        <input className = "col-lg-7" type="text" id="oEmail" placeholder="enter current email address"/>
      </div>
      <div className="row divform">
        <label className = "col-lg-5" htmlFor="lname" id = "nemail">Input New Email Address:</label>
        <input className = "col-lg-7" type="text" id="nEmail" placeholder="enter new email address"/>
      </div>
      <div className="row divform">
        <label className = "col-lg-5" htmlFor="lname" id = "verify">Verify Password:</label>
        <input className = "col-lg-7" type="password" id="vpasswd" placeholder="enter password"/>
      </div>
      <br />
      <br />
      <button type="button" className = "pbuttons" id = "psubmit" onClick={() => {updateemail()}}>Submit</button>
      <button className = "pbuttons" id = "pback" onClick={() => navigate('/profile')}>Back</button>
    </form>
  );
}

export default UpdateEmail; 