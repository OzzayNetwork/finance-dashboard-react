import $ from "jquery";
import logo from "../logo.svg";
import "../App.css";
import React, {useState, useEffect} from 'react';
import StdFunctions from "../services/standard.functions";

import Loader from "../components/loader.js";
import Home from "../pages/home.js";
import Header from "../components/header.js";
import Footer from "../components/Footer.js";
import Sidebar from "../components/sidebar.js";
import SendMoney from "../components/sendMoney.js";
import ErrorBoundary from "../components/ErrorBoundary.js";
import Transactions from "./transactions/Transactions.js";
import AllBlinkers from "./myBlinkers/allBlinkers.js";
import BlinkerDetails from "./myBlinkers/blinkerDetails.js";


import AuthMainContainer from "../authentication/authMainContainer.js";
import { Helmet } from "react-helmet";
import { Route, Routes, HashRouter,BrowserRouter } from "react-router-dom";
// import $ from 'jquery';
const Dashboard=()=>{
  // loader setting
  const [loading, setLoading] = useState(false);
  const [parentId,setParentId]=useState()
  //parentId=localStorage.getItem("parentId")
 // alert(StdFunctions.parentId)
  useEffect(()=>{
    setParentId(StdFunctions.parentId)
    const checkIfEmpty=()=>{
      if(parentId=""){
        alert("empty")
      }

      checkIfEmpty()
    }
    
  },[parentId])
  
    //console.log(location.pathname)
  return (
   <>
  
    <main  className="d-non">        
          <div id="layout-wrapper" className="d-n">
            
              <ErrorBoundary><Header /></ErrorBoundary>
              <ErrorBoundary><Sidebar /></ErrorBoundary>
              <ErrorBoundary><SendMoney /></ErrorBoundary>
            <div className="main-content">
              <div className="page-content padding-sm-94">
                <Routes>
                  <Route exact path={"/"} element={<ErrorBoundary><Home/></ErrorBoundary>}></Route>
                  <Route exact path={"/Transactions"} element={<ErrorBoundary><Transactions/></ErrorBoundary>}></Route>
                  <Route exact path={"/MyBlinkers"} element={<ErrorBoundary><AllBlinkers/></ErrorBoundary>}></Route>
                  <Route exact path={"/BlinkerDetails/:id"} element={<ErrorBoundary><BlinkerDetails/></ErrorBoundary>}></Route>
                </Routes>

                <div className="mx-5 px-5 d-none">
                  <button  className="btn btn-danger pull-right mx-5">Click me to hide Navigation</button>
                </div>
              </div>
              <Footer/>
            </div>
          </div>
          {/* <Home /> */}

        <Helmet>
            {/* <!-- App js --> */}
            <script src="./assets/js/app.js "></script>
            <script src="./assets/js/custom.js "></script>
        </Helmet>

          
        </main>
   </>
  );
  

  
}

export default Dashboard;
