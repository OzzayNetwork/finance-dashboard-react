import $ from "jquery";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

// importing sevices
import AuthServices from "./services/auth.service";

import ErrorBoundary from './components/ErrorBoundary'

import Login from "./authentication/authComponents/login.js";
import PasswordReset from "./authentication/authComponents/passwordReset.js";
import OTPVerification from "./authentication/authComponents/otpVerification.js";
import NewPassword from "./authentication/authComponents/newPassword.js";
import Dashboard from "./pages/Dashboard.js";
import Transactions from "./pages/transactions/Transactions.js";
import Protected from "./components/protected";
import AllBlinkers from "./pages/myBlinkers/allBlinkers.js";
import BlinkerDetails from "./pages/myBlinkers/blinkerDetails.js";

import Loader from "./components/loader.js";
import Home from "./pages/home.js";
import Header from "./components/header.js";
import Footer from "./components/Footer.js";
import Sidebar from "./components/sidebar.js";
import SendMoney from "./components/sendMoney.js";
import AuthMainContainer from "./authentication/authMainContainer.js";
import { Helmet } from "react-helmet";
// import {Routes,Route} from "react-router-dom";
import {
  Route,
  Routes,
  Navigate,
  HashRouter,
  Link,
  useMatch,
  useResolvedPath,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { unmountComponentAtNode, render } from "react-dom";
import axios from "axios";

function App() {
  // return <Home / > ;
  // var location=useLocation()
  // console.log(Location)
  // const login=()=>{
  //  let data = {
  //     "email":"waweru.diliwise@gmail.com",
  //     "password":"1234",
  //     "userType":"Parent"
  //   }
  //     axios.post("http://test.blink.co.ke/api/v2/admin/auth/login-with-usertype", data).then((res) => {
  //       console.log(res);
  //       if (res.status.data===200) {
  //         console.log("ygyuguygyu");
  //       }
  //     })
  // }

  // const [parentId,setParentId]=useState("")
  // setParentId("Passed from parent");

  useEffect(() => {
    let loggedParentId = localStorage.getItem("parentId");
    //console.log(loggedParentId);
  });

  const [theParentId, setTheParentId] = useState("0K");
  const [isActive, setIsActive] = useState(false);
  
 
  //alert("main hook "+theParentId)

  // useEffect(setParentId(JSON.parse(localStorage.getItem('parentId')),parentId))

  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    event.currentTarget.classList.toggle("bg-salmon");
    alert("it will be unmounted");
    // unmountComponentAtNode(document.getElementById('layout-wrapper'))
    // const location=useLocation();
  };

  return (
    <>
      <BrowserRouter></BrowserRouter>

      <HashRouter>
        {/* <div className="d-sm-none d-md-flex"><Loader /></div> */}
        <Routes>
          {/* show this if the person is not logged in */}
          {!localStorage.getItem("parentId") ? (
           <> <Route exact path={"/Login"} element={<AuthMainContainer />}>
              <Route
                exact
                path={"PasswordReset"}
                element={<PasswordReset />}
              ></Route>

              <Route
                exact
                path={"OTPVerification"}
                element={<OTPVerification />}
              ></Route>
              
              <Route
                exact
                path={"NewPassword"}
                element={<NewPassword />}
              ></Route>
            </Route>
              <Route path="*" element={<Navigate to="/Login" />}></Route>
              </>
          ) : (
           <> 
              <Route exact path={"/"} element={<Dashboard />}>
                <Route exact path={"Transactions"} element={<Transactions />}></Route>
                <Route exact path={"MyBlinkers"} element={<AllBlinkers />}></Route>
                <Route exact path={"BlinkerDetails/:id"} element={<BlinkerDetails />}></Route>
              </Route>
              <Route path="*" element={<Navigate to="/" />}></Route>
            </>
          )}
          {/* go to the dasboard page */}
        </Routes>
      </HashRouter>
      <Helmet>
        {/* <!-- App js --> */}
        <script src="./assets/libs/parsleyjs/parsley.min.js"></script>
        <script src="./assets/js/pages/form-validation.init.js"></script>
        <script src="./assets/js/app.js "></script>
        <script src="./assets/js/custom.js "></script>
      </Helmet>
    </>
  );
}

export default App;
