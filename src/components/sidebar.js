import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes} from "react-router-dom";
import StdFunctions from "../services/standard.functions";
import AuthService from "../services/auth.service";
import NewMessage from "../pages/messages/newMessage.js";

// import $ from 'jquery';

const Sidebar=()=>{

    const location = useLocation();
    let currentWindow=location.pathname;
    const[numOfInstitutions,setNumOfInstitutions]=useState(0);
    const [theSchools,setTheschools]=useState([]);

    useEffect(()=>{
        AuthService.getInstitutions().then((res)=>{            
            setNumOfInstitutions(res.data.data.length)  
            setTheschools(res.data.data.sort((a, b) => b.totalStudents - a.totalStudents))  
            console.log(res.data.data.sort((a, b) => b.totalStudents - a.totalStudents))     
        })
    },[])



  //let currentWindow = location.pathname;
  let ourBaseURL = "/Login";
  console.log(currentWindow)

  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  }
  else{
    return (
        <>
        <NewMessage/>
         <div className="vertical-menu">
  
              <div data-simplebar className="h-100">
  
                  {/* <!--- Sidemenu --> */}
                  <div id="sidebar-menu">
                      {/* <!-- Left Menu Start --> */}
                      
                      <ul className="metismenu list-unstyled" id="side-menu">
                      <li class="menu-title" key="t-menu">Enforcement and Revenue Monitor </li>

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
                                  <i className="mdi mdi-view-grid-outline"></i><span>Dashboard</span>
                              </Link>
                          </li>

                          <li>

                                <Link to="/MapView2" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/MapView2")? "active" : ""}`}>
                                    <i className="mdi mdi-map-marker-outline"></i><span>Live Map</span>
                                </Link>
                             
                          </li>

                          <li>
                              <a to="/" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Applications")? "active" : ""}`}>
                                  <i className="mdi mdi-star-outline"></i><span>Collection Zones</span>
                              </a>
                          </li>
                         

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-account-cash-outline"></i>
                                  <span>Collectors & Enforcers</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                              <li><a href="#">Live Reports</a></li>
                                  <li><a href="#">Daily Reports</a></li>
                                  <li><a href="#">Monthly Reports</a></li>
                              </ul>
                          </li>
                         
                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-account-group"></i>
                                  <span>All Users</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="#">Active Accounts</a></li>
                                  <li><a href="#">Archived Accounts</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-comment-text-multiple"></i>
                                  <span>Messages</span>
                              </a>
                              <ul className="sub-menu text-capitalize" aria-expanded="false">

                             
                              <li><a href="#" class="btn btn-info text-center mx-4 px-3 text-white  mb-3 write-msg-btn"><i class="bx bx-edit-alt text-white m-0 p-0"></i>Write A Message</a></li>
                              <li><a href="#">Sent Messages</a></li> 
                                
                              </ul>
                          </li>
                        

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                              <span class="badge rounded-pill bg-primary float-end">{numOfInstitutions}</span>
                                  <i className="mdi mdi-school-outline"></i>
                                  
                                  <span>Schools</span>
                              </a>
                              <ul className="sub-menu text-capitalize" aria-expanded="false">

                             
                              <li><a href="#" class="btn btn-primary text-center mx-4 px-3 text-white  mb-3 "><i class="mdi mdi-plus text-white m-0 p-0"></i>Add A school</a></li>
                                {theSchools.map((school, index)=>(
                                        <li><a href="#">{school.institutionName.toLowerCase()}</a></li>
                                    ))
                                        
                                }    
                                
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-account-group"></i>
                                  <span>Blink Users</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <Link to="/Blinkers" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Blinkers")? "active" : ""}`}>
                                            <span>Blinkers</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Guardians" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Guardians")? "active" : ""}`}>
                                            <span>Guardians</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/Bursars" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Bursars")? "active" : ""}`}>
                                            <span>Bursars</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Merchants" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Merchants")? "active" : ""}`}>
                                            <span>Merchants</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/SchoolAdmin" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/SchoolAdmin")? "active" : ""}`}>
                                            <span>School Admins</span>
                                        </Link>
                                    </li>

                                  
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="dripicons-to-do"></i>
                                  <span>Reports</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li className={`${ StdFunctions.equalTo(currentWindow,"/Transactions")? "mm-active" : ""}`}>
                                        <Link to="Transactions" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/Transactions")? "active" : ""}`}>
                                            Transactions
                                        </Link>
                                    </li>

                                    <li className={`${ StdFunctions.equalTo(currentWindow,"/TransactionsEditsReport")? "mm-active" : ""}`}>
                                        <Link to="TransactionsEditsReport" className={`waves-effect ${ StdFunctions.equalTo(currentWindow,"/TransactionsEditsReport")? "active" : ""}`}>
                                            Transaction Edits
                                        </Link>
                                    </li>
                                  <li><a href="#">Collections</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-shield-account-outline"></i>
                                  <span>My Account</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="#">My Logs</a></li>
                                  <li><a href="#">Account Details</a></li>
                                  <li><a href="#">Update account</a></li>
                              </ul>
                          </li>

                          <li className="d-non">
                              <a  className="waves-effect has-arrow">
                                  <i className="mdi mdi-cog-outline"></i>
                                  <span>Administration Options</span>
                              </a>
                              <ul className="sub-menu" aria-expanded="false">
                                  <li><a href="#">Deactivate school</a></li>
                                  <li><a href="#">Add Admin</a></li>
                                  <li><a href="#">Edit an admin's account</a></li>
                                  <li><a href="#">All Admins</a></li>
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
