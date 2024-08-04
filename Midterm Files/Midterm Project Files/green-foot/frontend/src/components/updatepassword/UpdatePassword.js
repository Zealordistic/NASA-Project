import React from "react";
import  { Navigate, useNavigate, redirect} from 'react-router-dom'

// import '../css/updatepw.css';


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
    // const navigate = useNavigate();
    // navigate('../profile');
    event.preventDefault();
  }

  backtrace(){
    return redirect('../profile');
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
        {/* <input className = "pbuttons" id = "psubmit" type="submit" value = "Submit" /> */}
        <a href="/profile" class="btn btn-primary">Submit</a>
        <a href="/profile" class="btn btn-primary">Back</a>
        {/* <button className = "pbuttons" id = "pback" onClick={this.backtrace}>Back</button> */}
      </form>
    );
  }
}
// export default Updatepassword;
export default Updatepassword;