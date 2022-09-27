import $ from "jquery";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home.js";
import Header from "./components/header.js";
import Sidebar from "./components/sidebar.js";
import SendMoney from "./components/sendMoney.js";
import Login from "./authentication/login.js";
import { Helmet } from "react-helmet";
// import {Routes,Route} from "react-router-dom";
import { Route, Routes, HashRouter } from "react-router-dom";

function App() {
  // return <Home / > ;
  return (
    <>
      <HashRouter>
        <main className="main">
          
             
          <div id="layout-wrapper" className="">
              <Header />
              <Sidebar />
              <SendMoney />
             
            <div className="main-content">
              <div className="page-content">
                <Routes>
                  <Route exact path={"/"} element={<Home/>}></Route>
                </Routes>
                
              </div>
              <footer className="footer ">
                <div className="container-fluid ">
                  <div className="row ">
                    <div className="col-sm-6 ">
                      <span className="this-year"></span> © RevenueSure.
                    </div>
                    <div className="col-sm-6 ">
                      <div className="text-sm-end d-sm-block ">
                        Developed by Nouveta LTD.
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
          {/* <Home /> */}

          <Helmet>
            {/* <!-- App js --> */}
            <script src="./assets/js/app.js "></script>
            <script src="./assets/js/custom.js "></script>
          </Helmet>
        </main>
      </HashRouter>
    </>
  );
}

export default App;
