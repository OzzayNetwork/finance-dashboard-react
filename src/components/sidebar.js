import React from "react";
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes} from "react-router-dom";
import StdFunctions from "../services/standard.functions";

// import $ from 'jquery';

const Sidebar=()=>{

    const location = useLocation();
    let currentWindow=location.pathname;



  //let currentWindow = location.pathname;
  let ourBaseURL = "/Login";
  console.log(currentWindow)

  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  }
  else{
    return (
        <>
         <div className="vertical-menu">
  
              <div data-simplebar className="h-100">
  
                  {/* <!--- Sidemenu --> */}
                  <div id="sidebar-menu">
                      {/* <!-- Left Menu Start --> */}
                      <ul className="metismenu list-unstyled" id="side-menu">
                          <li className="side-bar-button" >
                              <a href="#" className="waves-effect btn btn-light btn-rounded text-left write-msg-btn" data-bs-toggle="modal" data-bs-target="#walletTopUp">
                                  <i className=""><img src="assets/images/plus-icon.svg" alt=""/></i>
                                  <span className="text-capitalize">Top up account</span>
                              </a>
                          </li>
                          
                          
  
                          <li className={`${ StdFunctions.equalTo(currentWindow,"/")? "mm-active" : ""}`}>
                              <Link to="/" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/")? "active" : ""}`}>
                                  <i className="bx bx-home-circle"></i><span>Home</span>
                              </Link>
                          </li>

                          <li className={`${ StdFunctions.equalTo(currentWindow,"/MyBlinkers")? "mm-active" : ""}`}>
                              <Link to="/MyBlinkers" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/MyBlinkers")? "active" : ""}`}>
                              <i className="mdi mdi-account-child"></i><span>My blinkers</span>
                              </Link>
                          </li>
                          
  
  
                          <li className="d-none">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi dripicons-heart"></i>
                                  <span>Donation Programs</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">Active Programmes</a></li>
                                  <li><a href="donation-closed.html">Closed Programmes</a></li>
                                  <li><a href="donations-mine.html">My Contributions</a></li>
                              </ul>
                          </li>
  
                          <li className="d-none">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-clipboard-text-outline"></i>
                                  <span>Tasks</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="tasks-all.html">All Tasks</a></li>
                                  <li><a href="tasks-completed.html">Completed Tasks</a></li>
                                  <li><a href="tasks-unfinished.html">Unfinished Tasks</a></li>
                                  <li><a href="tasks-closed.html">Closed Tasks</a></li>
                              </ul>
                          </li>
  
                          <li className={`${ StdFunctions.strIncludes(currentWindow,"/Transactions")? "mm-active" : ""}`}>
                              <Link to="/Transactions" className={`waves-effect ${ StdFunctions.strIncludes(currentWindow,"/Transactions")? "active" : ""}`}>
                                  <i className="mdi-progress-clock mdi"></i>
                                  <span>Transactions</span>
                              </Link>
                          </li>
  
                      </ul>
                  </div>
                  {/* <!-- Sidebar --> */}
              </div>
          </div>
        </>
      );

  }
    
}

export default Sidebar;
