import React from 'react'
import './Card.css'
import  { Navigate, useNavigate} from 'react-router-dom'

function Card() {
   let navigate = useNavigate();
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

   function authUser() {
      //validate login information here
      console.log("here");
      navigate('/profile');
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
               <form action="#" class="login">
                  <div class="field">
                     <input type="text" placeholder="Email Address" required></input>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Password" required></input>
                  </div>
                  <div class="pass-link">
                     <a href="#">Forgot password? Click to reset!</a>
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Login" onClick={authUser}></input>
                  </div>
                  <div class="signup-link">
                     Not a member? <a href={changeMarginSignUp}>Sign Up now!</a>
                  </div>
               </form>
               <form action="#" class="signup">
                  <div class="field">
                     <input type="text" placeholder="First Name" required></input>
                  </div>
                  <div class="field">
                     <input type="text" placeholder="Last Name" required></input>
                  </div>
                  <div class="field">
                     <input type="text" placeholder="Email Address" required></input>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Password" required></input>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Confirm password" required></input>
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Sign Up" onClick={authUser}></input>
                  </div>
               </form>
            </div>
         </div>
      </div>
      </div>
    );
}

export default Card;

