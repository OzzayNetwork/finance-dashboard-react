import React from "react";
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes} from "react-router-dom"

// import $ from 'jquery';
const Footer=()=>{
  const location = useLocation();
  let currentWindow=location.pathname;

  //let currentWindow = location.pathname;
  let ourBaseURL = "/Login";
  console.log(currentWindow)

  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  } else {
    //console.log(location.pathname)
  return (
    <>

    
      <footer className="footer mt-5">
                <div className="container-fluid ">
                  <div className="row ">
                    <div className="col-sm-6 col-6">
                      <span className="this-year"></span> © Blink!
                      {/* <span>{this.props.params.id}</span> */}
                    </div>
                    <div className="col-sm-6 col-6">
                      <div className="text-sm-end d-sm-block ">
                        Digital Wallet for Students
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
    </>
  );
  }

  if(currentWindow==="/"){
    console.log("we are at the home page")
  }

  
}

export default Footer;
