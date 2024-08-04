import React from "react";
import { useNavigate } from "react-router-dom";
// import '../css/updateml.css';

const UpdateEmail = () => {
  const navigate = useNavigate();
  return (
    <form id = "updatemail">
      <div className="row divform">
        <label className = "col-lg-5" htmlFor="lname" id = "nemail">Input New Email Address:</label>
        <input className = "col-lg-7" type="text" id="nEmail" placeholder="xxxxx@XXX.com"/>
      </div>
      <br />
      <br />
      {/* <input className = "pbuttons" id = "psubmit" type="submit" value = "Submit" /> */}
      {/* <a href="/profile" class="btn btn-primary">Submit</a> */}
      <button className = "pbuttons" id = "psubmit" onClick={() => navigate('../profile')}>Submit</button>
      <button className = "pbuttons" id = "pback" onClick={() => navigate('../profile')}>Back</button>
    </form>
  );
}

export default UpdateEmail; 