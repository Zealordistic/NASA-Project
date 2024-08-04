import React from 'react';
import {useNavigate} from "react-router-dom";
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies'

function logoutAccount(){
  console.log("log out is called");
  fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/`+read_cookie("username")+`/logoutAccount`, {
    method: "PUT",
    body: null,
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
    .then(result => {
      console.log(result);
      if(result.code !== "200")
        alert("Error: "+result.message);
      else{
        delete_cookie("isLoggedIn");
        delete_cookie("username");
        window.location.reload();
      }
  })
}

function deleteAccount(){
  console.log("delete account is called");
  fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/`+read_cookie("username")+`/deleteAccount`, {
    method: "DELETE",
    body: JSON.stringify({"password":document.getElementById("vpasswd").value}),
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
    .then(result => {
      console.log(result);
      if(result.code !== "200"){
        alert("Error: "+result.message);
        document.getElementById("vpasswd").value = null;
      }
      else{
        delete_cookie("isLoggedIn");
        delete_cookie("username");
        window.location.reload();
      }
  })
}

function verify(){
  document.getElementById('verifyform').style.display = "block";
}

function cancel(){
  document.getElementById('vpasswd').value = null;
  document.getElementById('verifyform').style.display = "none";
}


function clearSearches(){
  console.log("clear searches is called");
  fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/`+read_cookie("username")+`/clearSearches`, {
    method: "DELETE",
    body: null,
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
    .then(result => {
      alert("All searches have been deleted.");
      window.location.reload();
      if(result.code !== "200")
        alert("Error: "+result.message);
  })
}

const Settings = () => {
  var deletion = 0;
  const navigate = useNavigate();
  return (
    <div className="container" id="account-settings">
      <p>Account Settings</p>
      <a href="/node/updatepw" className="btn btn-primary">Change Password</a>
      <a href="/node/updatemail" className="btn btn-primary">Update Email</a>
      <a className="btn btn-primary" onClick={() => {
        logoutAccount();navigate('/home')}}>Logout</a>
      <a className="btn btn-primary" onClick={() => {clearSearches()}}>Clear Searches</a>
      <a className="btn btn-primary" onClick={() => {verify()}}>Delete Account</a>

      <div className="row divform" id ="verifyform">
        <label className = "col-lg-3" htmlFor="lname" id ="verify">Verify Password:</label>
        <input className = "col-lg-4" type="password" id="vpasswd" placeholder="input password"/>
        <a className='btn btn-primary col-lg-2' id="vsubmit" onClick={() => {deletion = deleteAccount();navigate('/home')}}>Submit</a>
        <a className='btn btn-primary col-lg-2'id="vcancel" onClick={() => {cancel()}}>Cancel</a>
      </div>
    </div>
  );
}


const Accountsettings = () => {
  return (
    <ul id = "moreleft">
        <li>
          <p>Announcements:<br />
          - Please remember your own password. if you forget it, contact an administrator.<br />
          - For Firstname and Lastname changes, please file a request to an administrator directly.<br />
          - Deletion of accounts are irreversible, so be wise about yourself and your data.
          </p>
        </li>
        <li><Settings /></li>
    </ul>
  );
}

export default Accountsettings;