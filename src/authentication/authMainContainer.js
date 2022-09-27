import React from "react";
import Login from "./authComponents/login.js";
import PasswordReset from "./authComponents/passwordReset.js";
import OTPVerification from "./authComponents/otpVerification.js";
import NewPassword from "./authComponents/newPassword.js";
import { Helmet } from "react-helmet";
import { Route, Routes, HashRouter,BrowserRouter } from "react-router-dom";
import $ from 'jquery';

//this function hides part of the main page
const removeMain=()=>{
    //alert("we are here")
    $('body .loginPageOnly').next('main').addClass('d-none');
    $('.loginPageOnly').next('main').addClass('d-none');
    
}
$('body').find('.loginPageOnly').next('main').addClass('d-none');
$('body').on('click','.btn-dont-block',function(){
    alert("clicked")
    document.getElementById("dismis-btn-dont-block").click();
})
window.onload = function () { 
    $('.loginPageOnly').next('main').addClass('d-none');
}

const AuthMainContainer =()=>{
    //alert(" wer are at the authinticatuon main page "+theParentId)
    
    console.log("we are at the authentication pages")
    {removeMain()}
   

    return (
        <> 
          <div className="loginPageOnly">
              <div className="container-fluid p-0">
                  <div className="row g-0">
  
                      <div className="col-xl-8 col-md-8">
                          <div className="auth-full-bg pt-lg-5 p-4">
                              <div className="w-100">
                                  <div className="bg-overlay"></div>
                                  <div className="d-flex h-100 flex-column">
  
                                      <div className="p-4 mt-auto">
                                          <div className="row justify-content-center">
                                              <div className="col-lg-7">
                                                  <div className="text-center">
  
                                                      
  
                                                      <div dir="ltr">
                                                          <div className="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">
  
  
                                                              <div className="item">
                                                                  <div className="py-3 py-sm-0">
                                                                      <div className="d-flex justify-content-center align-items-center flex-column">
                                                                          
                                                                          <img src="assets/images/logo-files/blink-white.svg" alt="Nouveta Logo" className="img mb-3" style={{ width: "140px" }}/>
                                                                          <h2 className="mb-0 pb-1"><strong className="text-white fw-medium">Guardian's Portal</strong></h2>
                                                                          <h6 className="text-uppercase"><strong className="text-white text-capitalize fw-light">manage your Dependants' Pocket Money from anywhere easily & Efficiently</strong></h6>
                                                                      </div>
                                                                  </div>
  
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      {/* <!-- end col --> */}
  
                      <div className="col-xl-4 col-md-4">
                          <div className="auth-full-page-content p-md-5 p-4">
                              <div className="w-100">
  
                                  <div className="d-flex flex-column h-100">
                                      <div className="mb-4 mb-md-5 d-sm-none d-md-block">
                                          <div href="index.html" className="d-block auth-logo">
                                              <img src="assets/images/color-log0.svg" alt="" height="18" className="auth-logo-dark"/>
                                              <img src="assets/images/logo-light.png" alt="" height="18" className="auth-logo-light"/>
                                          </div>
                                      </div>
                                      
                                      {/* <PasswordReset/> */}
                                      {/* <OTPVerification/> */}
                                      {/* <NewPassword/> */}
                                      
  
                                     
                                        <Routes>
                                            <Route exact path={"/"} element={<Login />}></Route>
                                            <Route exact path={"PasswordReset"} element={<PasswordReset/>}></Route>
                                            <Route exact path={"OTPVerification"} element={<OTPVerification/>}></Route>
                                            <Route exact path={"NewPassword"} element={<NewPassword/>}></Route>
                                        </Routes>
                                    
                                        
                                      
  
                                      <div className="mt-4 mt-md-5 text-center">
                                          <p className="mb-0">©
                                          <span className="this-year"></span> Blink! <strong>Student Digital wallet</strong></p>
                                      </div>
                                  </div>
  
  
                              </div>
                          </div>
                      </div>
                      {/* <!-- end col --> */}
                  </div>
                  {/* <!-- end row --> */}
              </div>
              {/* <!-- end container-fluid --> */}
          </div>

          <Helmet>
            {/* <!-- App js --> */}
            {/* <script src="./assets/js/app.js "></script>
            <script src="./assets/js/custom.js "></script> */}
        </Helmet>
        </>
      )
}

export default AuthMainContainer;
