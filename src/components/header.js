import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes} from "react-router-dom"
import StdFunctions from "../services/standard.functions";
import ChatWidget from "./chatWidget";
import $ from 'jquery';


// import $ from 'jquery';
const Header=()=>{

  // loader setting
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState({});

  const[theLocation,setTheLocation]=useState([])

  // loged in parent details
  const parentId=localStorage.getItem("parentId")
  const parentEmail= localStorage.getItem("parentEmail")
  const parentUserName= localStorage.getItem("parentUserName")
  const parentFName=localStorage.getItem("parentUserFName")
  const parentLName=localStorage.getItem("parentUserLName")
  // console.log(localStorage)
  const[onlineWeb,setOnlineWeb]=useState("")
  const[offlineWeb,setOfflineWeb]=useState("")
  const[areWeOffline,setAreWeOffline]=useState(false)
  const[isBlinkerDetails,setIsBlinkerDetails]=useState(false)


  

  useEffect(()=>{
   
  },[onlineWeb,offlineWeb])


  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  function updateOnlineStatus(event) {
    let condition = navigator.onLine ? "online" : "offline";
    if(condition==="offline"){
      //alert("We are offline")
      setAreWeOffline(true)
    }
    else{
      window.location.reload();
      setAreWeOffline(false)
    }
  }

  console.log("fghfh")

  const logout=()=>{
    setLoading(true);
    localStorage.clear();
    window.location.reload();
  }
  const location = useLocation();
  let currentWindow=location.pathname;
  //alert(currentWindow)

  //let currentWindow = location.pathname;
  let ourBaseURL = "/Login";
  console.log(currentWindow)

  useEffect(()=>{
    setTheLocation(currentWindow)
  },[theLocation])

  let viewport_width = window.innerWidth;
  //alert(viewport_width)

  if(StdFunctions.includes(currentWindow,"/BlinkerDetails/")===true){
    $('#page-topbar').addClass('d-sm-none').addClass('d-md-inline')
   
    if(viewport_width<=576){
      $('.page-content').addClass('pt-sm-1')
    }
  }
  else{
    $('#page-topbar').removeClass('d-sm-none')
    $('.page-content').removeClass('pt-sm-1')
  }


  

 

  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  } else {
    //console.log(location.pathname)
  return (
    <>
    {loading ? (
            <div className="content-loader-container bg-black bg-opacity-50">
                <div className="bg-white p-3 ">
                    <div className="p-3">
                        <div className="spinner-chase">
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                        </div>
                    </div>
                    <p className="m-0 p-0 text-u">Logging Out</p>
                </div>
            </div>
            ):(
                <h1 className="d-none">Found</h1>
            )
        }
      <header id="page-topbar" className="">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img
                    src="assets/images/logo-files/favicon.png"
                    alt=""
                    height="22"
                  />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/logo-dark.png" alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    src="assets/images/logo-files/blink-icon.svg"
                    alt=""
                    height="40"
                  />
                </span>
                <span className="logo-lg">
                  <img
                    src="assets/images/logo-files/blink-orange.svg"
                    alt=""
                    height="50"
                  />
                </span>
              </Link>
            </div>
            

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item waves-effect d-sm-none d-md-inline"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>

            <span className="fw-medium text-black d-sm-flex d-md-none">
              {currentWindow==="/Transactions" &&
                <h5 className="ms-3 mb-0 pb-0 text-black">Transactions</h5>
                
              }
              

              { StdFunctions.equalTo(currentWindow,"/") &&
              <h5 className="ms-3 mb-0 pb-0 text-black">Hi,  {parentFName}</h5>
                
              }

              { StdFunctions.includes(currentWindow,"/BlinkerDetails/") &&
              <h5 className="ms-3 mb-0 pb-0 text-black">Account Details</h5>
                
              }

              {currentWindow==="/BlinkerDetails/" &&
              <h5 className="ms-3 mb-0 pb-0 text-black">Account Details for</h5>
                
              }

             
           
            </span>
           
           

            <Link to="/" className="px-3 d-flex justify-content-center align-items-center d-md-none">
                <img
                  src="assets/images/logo-files/blink-color.svg"
                  alt=""
                  height="40"
                  className="d-sm-none d-md-flex"
                />
              </Link>
              


             

            <form className="app-search d-none">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="bx bx-search-alt"></span>
              </div>
            </form>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2 d-none">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-magnify"></i>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                data-bs-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen"></i>
              </button>
            </div>

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect d-none"
                id="page-header-notifications-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-bell bx-tada"></i>
                <span className="badge bg-danger rounded-pill d-none">3</span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-notifications-dropdown"
              >
                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h6 className="m-0" key="t-notifications">
                        {" "}
                        Notifications{" "}
                      </h6>
                    </div>
                    <div className="col-auto">
                      <a href="#!" className="small" key="t-view-all">
                        {" "}
                        View All
                      </a>
                    </div>
                  </div>
                </div>
                <div data-simplebar style={{ maxheight: "230px" }}>
                  <a
                    href="javascript: void(0);"
                    className="text-reset notification-item"
                  >
                    <div className="d-flex">
                      <div className="avatar-xs me-3">
                        <span className="avatar-title bg-warning rounded-circle font-size-16">
                          <i className="mdi mdi-file-document-edit-outline  "></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1" key="t-shipped">
                          Tenancy Agreement Renewal
                        </h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1" key="t-grammer">
                            Aex Wanjala's agreement due in days
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span key="t-min-ago">3 min ago</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="javascript: void(0);"
                    className="text-reset notification-item"
                  >
                    <div className="d-flex">
                      <div className="avatar-xs me-3">
                        <span className="avatar-title bg-warning rounded-circle font-size-16">
                          <i className="mdi mdi-file-document-edit-outline  "></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1" key="t-shipped">
                          Tenancy Agreement Renewal
                        </h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1" key="t-grammer">
                            Aex Wanjala's agreement due in days
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span key="t-min-ago">3 min ago</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a
                    href="javascript: void(0);"
                    className="text-reset notification-item"
                  >
                    <div className="d-flex">
                      <div className="avatar-xs me-3">
                        <span className="avatar-title bg-danger rounded-circle font-size-16">
                          <i className="mdi mdi-home-export-outline  "></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1" key="t-shipped">
                          Tenant on Notice
                        </h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1" key="t-grammer">
                            Kibor will be moving out in the next 7 Days
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            <span key="t-min-ago">3 min ago</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-2 border-top d-grid">
                  <a
                    className="btn btn-sm btn-link font-size-14 text-center"
                    href="javascript:void(0)"
                  >
                    <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                    <span key="t-view-more">View More..</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect d-flex justify-content-center align-items-center"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle header-profile-user d-none"
                  src="assets/images/users/avatar-1.jpg"
                  alt="Header Avatar"
                />
                <div className="avatar-sm mx-auto ">
                    <span className="avatar-title rounded-circle bg-primary-blink font-size-16 profile-abriv">
                        {parentFName.charAt(0)+parentLName.charAt(0)}
                    </span>
                </div>
                <span className="d-none d-xl-inline-block ms-1 prof-name" key="t-henry">
                  {parentFName+" "+parentLName}
                </span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                {/* <!-- item--> */}
                <a className="dropdown-item" href="#">
                  <i className="bx bx-user font-size-16 align-middle me-1"></i>{" "}
                  <span key="t-profile">My Profile</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-time font-size-16 align-middle me-1"></i>{" "}
                  <span key="t-profile">My Logs</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>{" "}
                  <span key="t-lock-screen">Lock screen</span>
                </a>
                <div className="dropdown-divider"></div>
                <a
                href="#"
                onClick={logout}
                  className="dropdown-item text-danger"
                  
                >
                  <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>{" "}
                  <span key="t-logout">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* mobile navigation starts here */}
    <header id="bottom-nav" className="px-3 d-none d-md-none d-sm-flex">
        <div className="navbar-header d-flex w-100">
          <div className="d-flex justify-content-between d-flex w-100 align-items-center">
            <div className="dropdown d-inline-block ms-2">
            <Link to="/" className={`btn header-item noti-icon waves-effect d-flex align-content-center justify-items-center align-items-center d-flex justify-content-center ${ StdFunctions.equalTo(currentWindow,"/")? "active" : ""}`}>
                <i className='bx bx-home-circle font-size-24' className={`bx font-size-24 ${ StdFunctions.equalTo(currentWindow,"/")? "bxs-home-circle" : "bx-home-circle"}`}></i>
              </Link>
              
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
               
              </div>
            </div>

            

            <div className="dropdown d-inline-block ms-2">
              <Link to="/Transactions"
                className={`btn header-item noti-icon waves-effect d-flex align-content-center justify-items-center align-items-center d-flex justify-content-center ${ StdFunctions.strIncludes(currentWindow,"/Transactions")? "active" : ""}`}                
              >
                <i className={`mdi font-size-24 ${ StdFunctions.equalTo(currentWindow,"/Transactions")? "mdi-clock" : "mdi-clock-time-four-outline"}`}></i>
              </Link>
              
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
               
              </div>
            </div>

            <div class="avatar-sm  send-money-mobile">
              <span data-bs-toggle="offcanvas" data-bs-target="#offcanvas-send-money" class="avatar-title rounded-circle bg-primary-blink font-size-16 profile-abriv">
                <img src="assets/images/plus-white.svg" alt=""/>
              </span>
            </div>

            <div className="dropdown d-inline-block ms-2">
              <Link to="/"
                className="btn header-item noti-icon waves-effect d-flex align-content-center justify-items-center align-items-center d-flex justify-content-center "
              >
                <i className="bx bx-heart font-size-24"></i>
              </Link>
              
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
               
              </div>
            </div>

           

            <div className="dropdown d-inline-block ms-2">
              <Link to="/Transactions"
                className="btn header-item noti-icon waves-effect d-flex align-content-center justify-items-center align-items-center d-flex justify-content-center "
                
              >
                <i className="bx bx-user font-size-24"></i>
              </Link>
              
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
               
              </div>
            </div>

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                data-bs-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    {/* mobile navigation end */}

    <div className={`h-100 offline-page p-5 ${areWeOffline? "top-0 scale-1" : ""}`} className="h-100 offline-page p-5">
      <div className="card-body d-flex flex-column justify-items-center align-items-center text-center">
          <div className="p-5 py-0 pt-3">
              <img src="assets/images/illustration-images/no-internet.svg" className="img mb-4" alt="No search results" height="207px" />
          </div>
          <h4 className="text-black">No Internet !</h4>
          <p>Please check your internet connection.  We will try to connect once the internet is back.</p>
          
      </div>
    </div>

    {/* toasts go here */}
    <div aria-live="polite position-relative" className="d-flex align-items-center justify-content-center pb-0"  aria-atomic="true">
      <div className="toast bg-success position-fixed the-toast animate__animated   animate__bounceInUp bounceIn" id="the-toast">
       
        <div className="toast-body  text-white  w-auto d-flex align-items-center justify-content-center text-center">
          Details Updated
        </div>
      </div>
    </div>
    {/* toasts end here */}
    <div className="chat-widget-cont">
      <div><ChatWidget/></div>
    </div>
    {/* chat widget appears here */}
  
    
    </>
  );
  }

  if(currentWindow==="/"){
    console.log("we are at the home page")
  }

  
}

export default Header;
