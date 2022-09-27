import React, {useState, useEffect,useRef} from 'react';
import { Helmet } from "react-helmet";
import { Route, Routes, HashRouter, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import {Link} from "react-router-dom"
import $ from 'jquery';
const OTPVerification=()=>{
    const[TheOTP,setTheOTP]=useState("")
    const navigate=useNavigate()

    const[digit1,setDigit1]=useState("")
    const[digit2,setDigit2]=useState("")
    const[digit3,setDigit3]=useState("")
    const[digit4,setDigit4]=useState("")

    useEffect(()=>{
        setTheOTP(digit1+digit2+digit3+digit4)
        //alert(TheOTP)
        console.log(TheOTP)
    },[digit1,digit2,digit3,digit4])

    const OTPPhoneNum=localStorage.getItem("OTPPhoneNum")
    const typedOTP=async(event)=>{
        event.preventDefault()
        setTheOTP(digit1+digit2+digit3+digit4)
        localStorage.setItem("typedOTP", TheOTP)
        navigate("/Login/newPassword",{replace:true})
    }

    return (
        <>
          <Helmet>
            <title>Blink! | OTP verification</title>
              {/* <!-- auth-2-carousel init --> */}
              <script src="assets/js/pages/auth-2-carousel.init.js"></script>
  
              {/* <!-- two-step-verification js --> */}
              <script src="assets/js/pages/two-step-verification.init.js"></script>
          </Helmet>
          <div className="my-auto">
              <div className="text-center">
  
                  <div className="avatar-md mx-auto">
                      <div className="avatar-title rounded-circle bg-light d-flex align-items-center justify-content-center">
                          <i className="dripicons-message  h1 mb-0 text-primary"></i>
                      </div>
                  </div>
                  <div className="p-2 mt-4">
  
                      <h4>OTP</h4>
                      <p className="mb-5">Please enter the 4 digit code sent to <span className="fw-semibold"><br/>{StdFunctions.phoneOutput(OTPPhoneNum)}. </span> <Link to="/Login/PasswordReset">Change</Link></p>
  
                      <form autocomplete="off" onSubmit={typedOTP}>
                          <div className="row">
                              <div className="col-3">
                                  <div className="mb-3">
                                      <label for="digit1-input" className="visually-hidden">Dight 1</label>
                                      <input  pattern="[0-9]" required selected type="text" className="form-control form-control-lg text-center two-step" maxLength="1" data-value="1" id="digit1-input" onChange={(event)=>setDigit1(event.target.value)}/>
                                  </div>
                              </div>
  
                              <div className="col-3">
                                  <div className="mb-3">
                                      <label for="digit2-input" className="visually-hidden">Dight 2</label>
                                      <input  pattern="[0-9]" required type="text" className="form-control form-control-lg text-center two-step" maxLength="1" data-value="2" id="digit2-input" onChange={(event)=>setDigit2(event.target.value)}/>
                                  </div>
                              </div>
  
                              <div className="col-3">
                                  <div className="mb-3">
                                      <label for="digit3-input" className="visually-hidden">Dight 3</label>
                                      <input  pattern="[0-9]" required type="text" className="form-control form-control-lg text-center two-step" maxLength="1" data-value="3" id="digit3-input"  onChange={(event)=>setDigit3(event.target.value)}/>
                                  </div>
                              </div>
  
                              <div className="col-3">
                                  <div className="mb-3">
                                      <label for="digit4-input" className="visually-hidden">Dight 4</label>
                                      <input  pattern="[0-9]" required type="text" className="form-control form-control-lg text-center two-step" maxLength="1" data-value="4" id="digit4-input"  onChange={(event)=>setDigit4(event.target.value)}/>
                                  </div>
                              </div>
                          </div>
                          <div className="mt-4">
                            <button href="auth-password-confirmation.html" className="btn btn-primary w-md">Next</button>
                        </div>
                      </form>
  
                     
                  </div>
  
              </div>
          </div>
  
          
      {/* <!-- end container-fluid --> */}
  
        </>
      );
}

export default OTPVerification;
