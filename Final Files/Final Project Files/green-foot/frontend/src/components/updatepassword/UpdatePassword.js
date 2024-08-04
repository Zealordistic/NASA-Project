import React from "react";
import  {Navigate} from 'react-router-dom'
import {read_cookie} from 'sfcookies'

class Updatepassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', newpasswd: '', newagainpasswd: ''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({value: event.target.value});
    return <Navigate to={'/profile'} 
      state={this.state.value}/>
  }

  handleChange2(event) {
    this.setState({newpasswd: event.target.value});
  }

  handleChange3(event) {
    this.setState({newagainpasswd: event.target.value});
  }

  handleSubmit(event) {
    if(document.getElementById("opasswd").value.trim() == "" ||
       document.getElementById("npasswd").value.trim() == "" ||
       document.getElementById("npassword").value.trim() == ""){
      document.getElementById("opasswd").value = null;
      document.getElementById("npasswd").value = null;
      document.getElementById("npassword").value = null;
    }
    else{
      if(this.state.newpasswd !== this.state.newagainpasswd) {alert("Your new passwords do not match!"); window.location.reload();} 
      else {
        fetch('https://powerpuffs-group-project.eastus.cloudapp.azure.com/node/api/db/'+read_cookie("username")+'/changePassword', {
        method: "PUT",
        body: JSON.stringify({
         "oldpassword": document.getElementById('opasswd').value,
         "newpassword": this.state.newpasswd 
        }),
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
      .then(result => {
        (result.code !== "200")
        ? alert("Error: "+result.message)
        : alert("Success: Your password has been updated!")
        document.getElementById("opasswd").value = null;
        document.getElementById("npasswd").value = null;
        document.getElementById("npassword").value = null;
        }
        )
      }
      
    }
    event.preventDefault();
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <form id = "updatepasswd">
        <div className="row divform">
          <label className = "col-lg-3" htmlFor="fname">Old Password:</label>
          <input className = "col-lg-8"type="password" id="opasswd" name="fname" onChange={this.handleChange1}/>
        </div>
        <br />
        <div className="row divform">
          <label className = "col-lg-3" htmlFor="lname">New Password:</label>
          <input className = "col-lg-8" type="password" id="npasswd" name="lname" onChange={this.handleChange2}/>
        </div>
        <br />
        <div className="row divform">
          <label className = "col-lg-3" htmlFor="lname" id = "npasswordlbl">Retype New Password:</label>
          <input className = "col-lg-8" type="password" id="npassword" name="lname" onChange={this.handleChange3}/>
        </div>
        <br />
        <br />
        <a href="/node/profile" className="btn btn-primary" onClick={this.handleSubmit}>Submit</a>
        <a href="/node/profile" className="btn btn-primary">Back</a>
      </form>
    );
  }
}
export default Updatepassword;