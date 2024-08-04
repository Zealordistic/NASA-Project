import React from 'react';
import { useNavigate } from "react-router-dom";
// import '../css/profile.css';

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="container" id="account-settings">
      <p>Account Settings</p>
      <a href="../updatepw" class="btn btn-primary">Change Password</a>
      <a href="../updatemail" class="btn btn-primary">Update Email</a>
    </div>
  );
}


const Accountsettings = () => {
  return (
    <ul id = "moreleft">
        <li>
          <p>About Me<br></br>I'm Fuzzy and I'm not a pumpkin'\0'</p>
        </li>
        <li><Settings /></li>
    </ul>
  );
}

export default Accountsettings;