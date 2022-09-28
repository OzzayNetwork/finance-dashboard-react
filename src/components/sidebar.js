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

                        <div className="px-3 pt-3 side-card">
                            <div className="card bg-primary bg-primary-blink blink-card-bg blink-card-bg2 mx-0 mx-sm-3 rad-sm-8px overflow-hidden">
                                <div className="card-body blink-car rad-sm-8px">
                                    <div className="d-flex align-content-center align-items-center">
                                        <div className="flex-grow-1">
                                            <p className="m-0 p-0 text-white-50 text-uppercase">Current Balance</p>
                                            <h3 className="mb-0 text-white text-uppercase pb-3">KES 547,569.00</h3>
                                            <small className="text-white">+23,000 Today</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <li className="side-bar-button d-none" >
                              <a href="#" className="waves-effect btn btn-light btn-rounded text-left write-msg-btn" data-bs-toggle="modal" data-bs-target="#walletTopUp">
                                  <i className=""><img src="assets/images/plus-icon.svg" alt=""/></i>
                                  <span className="text-capitalize">Top up account</span>
                              </a>
                          </li>
                          
                          
  
                          <li className={`${ StdFunctions.equalTo(currentWindow,"/")? "mm-active" : ""}`}>
                              <Link to="/" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/")? "active" : ""}`}>
                                  <i className="mdi mdi-view-grid-outline"></i><span>Home</span>
                              </Link>
                          </li>

                          <li>
                              <a to="/" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Applications")? "active" : ""}`}>
                                  <i className="mdi mdi-paperclip"></i><span>Applications</span>
                              </a>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-transfer"></i>
                                  <span>Payment Transfer</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">Edit a Transaction</a></li>
                                  <li><a href="donation-closed.html">Transfer Reports</a></li>
                              </ul>
                          </li>
                        

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                              <span class="badge rounded-pill bg-primary float-end">10</span>
                                  <i className="mdi mdi-school-outline"></i>
                                  
                                  <span>Schools</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">All Schools</a></li>
                                  <li><a href="donation-closed.html">Rockfilelds</a></li>
                                  <li><a href="donations-mine.html">Another School</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-account-group"></i>
                                  <span>Blink Users</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">Blinkers</a></li>
                                  <li><a href="donation-closed.html">Guardians</a></li>
                                  <li><a href="donations-mine.html">Merchants</a></li>
                                  <li><a href="donations-mine.html">Bursers</a></li>
                                  <li><a href="donations-mine.html">School Admins</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="dripicons-to-do"></i>
                                  <span>Reports</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">Transactions</a></li>
                                  <li><a href="donation-closed.html">Transaction Edits</a></li>
                                  <li><a href="donations-mine.html">Collections</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-shield-account-outline"></i>
                                  <span>My Account</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">My Logs</a></li>
                                  <li><a href="donation-closed.html">Account Details</a></li>
                                  <li><a href="donations-mine.html">Update account</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-cog-outline"></i>
                                  <span>Administration Options</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="donation-active.html">Deactivate school</a></li>
                                  <li><a href="donation-closed.html">Add Admin</a></li>
                                  <li><a href="donations-mine.html">Edit an admin's account</a></li>
                                  <li><a href="donations-mine.html">All Admins</a></li>
                              </ul>
                          </li>


                          

                          

                         
                         

                          <li className={`d-none ${ StdFunctions.equalTo(currentWindow,"/MyBlinkers")? "mm-active" : ""}`}>
                              <Link to="/MyBlinkers" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/MyBlinkers")? "active" : ""}`}>
                              <i className="mdi mdi-account-child"></i><span>My blinkers</span>
                              </Link>
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
  
                          <li className={`d-none  ${ StdFunctions.strIncludes(currentWindow,"/Transactions")? "mm-active" : ""}`}>
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
