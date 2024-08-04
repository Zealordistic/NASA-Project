import React, {useState} from 'react'
import './Card.css'
import  { Navigate, useNavigate} from 'react-router-dom'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

function Card() {
   let navigate = useNavigate();
   const [firstname, setFirst] = useState("");
   const [lastname, setLast] = useState("");
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [confirmed_pass, setConfirmed] = useState("");


   function changeMarginSignUp() {
      const loginForm = document.querySelector("form.login");
      const loginText = document.querySelector(".title-text .login");
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
   }
   
   function changeMarginLogin() {
      const loginForm = document.querySelector("form.login");
      const loginText = document.querySelector(".title-text .login");
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
   }

   function handleSignupLink() {
      const signupBtn = document.querySelector("label.signup");
      signupBtn.click();
      return false;
   }

   function authUser(event) {
      event.preventDefault();
      var bodyobj = {'username': username, 'password': password};
      fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/normalLogin`, {
         method: "PUT",
         body: JSON.stringify(bodyobj),
         headers: {
            'Content-Type': 'application/json'
         }
       }).then(response => response.json())
       .then(result => {
         if(result.code === "200"){
            bake_cookie("isLoggedIn", "1");
            bake_cookie("username", result.data);
            navigate('/home');
            window.location.reload();
         }
         else{
            alert("Error: "+result.message);
         }
       });
   }

   function createUser(event){
      event.preventDefault();
      /**
       * create account: 
       * user put in username and password
       * create JSON object => {username: <name>, password <password>}
       * fetch(url,JSON) --> server --> {200, OK, Successful} --> take user to profile page
       *                          +---> {40X, not OK, not successful} -->(not redirect user) and display the message
       */
      if(password !== confirmed_pass){
         alert("Error: Password Mismatch.");
      }
      else{
         var bodyobj = {'Firstname': firstname, 'Lastname': lastname, 'Email': email, 'username': username,
         'password': password};
         fetch(`https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/createAccount`, {
            method: "POST",
            body: JSON.stringify(bodyobj),
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(response => response.json())
         .then(result => {
            if(result.code === "200"){
               bake_cookie("isLoggedIn", "1");
               bake_cookie("username", result.data);
               navigate('/home');
               window.location.reload();
            }
            else
               alert("Error: "+result.message);
         });
      }
   }
         
    return (
      <div class="projectHolder">
        <div class="project">
         <div class="title-text">
            <div class="title login">
               Login Form
            </div>
            <div class="title signup">
               Sign Up Form
            </div>
         </div>
         <div class="form-container">
            <div class="slide-controls">
               <input type="radio" name="slide" id="login" checked></input>
               <input type="radio" name="slide" id="signup"></input>
               <label for="login" class="slide login" onClick={changeMarginLogin}>Login</label>
               <label for="signup" class="slide signup" onClick={changeMarginSignUp}>Sign Up</label>
               <div class="slider-tab"></div>
            </div>
            <div class="form-inner">
               <form onSubmit={authUser} action="#" class="login" id="loginForm">
                  <div class="field">
                     <input type="text" placeholder="Username" id="inputUsername" onChange={(e) => setUsername(e.target.value)} required></input>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Password" id="inputPassword" onChange={(e) => setPassword(e.target.value)} required></input>
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Login"></input>
                  </div>
               </form>
               <form onSubmit={createUser} action="#" class="signup" id="signup">
                  <div class="field">
                     <input type="text" placeholder="First Name" id="inputFirstName" onChange={(e) => setFirst(e.target.value)} required></input>
                  </div>
                  <div class="field">
                     <input type="text" placeholder="Last Name" id="inputLastName" onChange={(e) => setLast(e.target.value)} required></input>
                  </div>
                  <div class="field">
                     <input type="text" placeholder="Email Address" id="inputEmail" onChange={(e) => setEmail(e.target.value)} required></input>
                  </div>
                  <div class="field">
                     <input type="text" placeholder="Username" id="inputUsername2" onChange={(e) => setUsername(e.target.value)} required></input>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Password" id="inputPassword2" onChange={(e) => setPassword(e.target.value)} required></input>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Confirm password" id="inputConfirmed" onChange={(e) => setConfirmed(e.target.value)} required></input>
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Sign Up"></input>
                  </div>
               </form>
            </div>
         </div>
      </div>
      </div>
    );
}

export default Card;

