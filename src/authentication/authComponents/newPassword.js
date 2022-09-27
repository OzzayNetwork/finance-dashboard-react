import React,{useState,useEffect} from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, HashRouter, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";

const NewPassword=()=>{
    const [errorMsg, seterrorMsg]=useState("");
    const [newPassword,setNewPassword]=useState("")
    const [canClick,setCanClick]=useState(false)
    const [passErr,setPassErr]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [thePassword,setThePassword]=useState("")
    const navigate=useNavigate()
    const [newPasswordIsSet,setNewPasswordIsSet]=useState(false)

    //account details
    const [accountGender,setAccountGender]=useState(localStorage.getItem("OTPgender"))
    const [accountFirstName,setFirstName]=useState(localStorage.getItem("OTPFirstName"))
    const [accountMiddleName,setAccountMiddleName]=useState(localStorage.getItem("OTPmiddleName"))

   

    //the json body variables
    const [thePhoneNum,setThePhoneNum]=useState(localStorage.getItem("OTPPhoneNum"))
    const [theOTP,setTheOTP]=useState(localStorage.getItem("typedOTP"))

    useEffect(()=>{
        if(newPassword!=""){
            if(newPassword===confirmPassword){
                setThePassword(newPassword)
                setPassErr("looking Good!")
                $('.pass-feedback').addClass("text-success").removeClass("text-danger")
                $('.msg-icon').removeClass('bx-block').addClass('bx-check-double')
                setCanClick(true)
            }
            else{
                setPassErr("Pass Code Mismatch!")
                $('.pass-feedback').addClass("text-danger").removeClass("text-success")
                $('.msg-icon').removeClass('bx-check-double').addClass('bx-block')
                setCanClick(false)
            }
        }
        else{
            setCanClick(false)
        }
    },[newPassword,confirmPassword])
   
    // loader setting
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});

    //setting new password
    const settingTheNewPassword=async(event)=>{
        event.preventDefault()
        $('#login-msg').addClass('d-none')
        let data={
            "email": "",
            "msisdn": thePhoneNum,
            "password": thePassword,
            "isSmsOtp": true,
            "isEmailOtp": false,
            "otp": theOTP,
            "userId": "1294"
        }
        setLoading(true)
        AuthService.changePassword(data).then((res)=>{           
            

            if(res.data.statusCode===200){
                //alert("Password changed succesfully")
                setNewPasswordIsSet(true)
                $('#success-modal').click()
                setQuote(res.data);       
                seterrorMsg(res.data.statusDescription)  
                seterrorMsg("Pass Code Successfully Updated")
                console.log("The change Password response")
                console.log(res.data)
                
  
                $('#login-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
               
                localStorage.clear();
                setLoading(false);

                        
          
              }

              if(res.data.statusCode===2200){
                alert("Password changed succesfully")
                setQuote(res.data);       
                seterrorMsg(res.data.statusDescription)  
                console.log("The change Password response")
                console.log(res.data)
                
  
                $('#login-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
               
                localStorage.clear();
                setLoading(false);

                setTimeout(() => {
                  
                  navigate("/Login",{replace:true})
                }, 2000);        
          
              }
            
           
            
        }).catch((err)=>{
           console.log(err)
            seterrorMsg(err.response.data.statusDescription)  
            $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all');

            if(err.response.status===404){                
                //alert("nothing")
                $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all');

                setTimeout(() => {                    
                    navigate("/Login/passwordReset",{replace:true})
                }, 4000);
            }

            if(err.response.status===501){                
                //alert("nothing")
                $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all');

                setTimeout(() => {                    
                    navigate("/Login/passwordReset",{replace:true})
                }, 4000);
            }
        })
    }

    $('body').unbind().on('click', '.close-success-password', function(){
        setTimeout(() => {
            navigate("/Login",{replace:true})
        }, 2000);   
    })

    return (


        <>
         {loading ? (
            <div className="content-loader-container d-none bg-black bg-opacity-50">
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
                    <h5 className="m-0 p-0 text-u">Please Wait</h5>
                </div>
            </div>
            ):(
                <h1 className="d-none">Sent</h1>
            )
          }

          <Helmet>
            <title>Blink! | Set Your New Pass Code</title>

            <script src="assets/libs/parsleyjs/parsley.min.js"></script>
              
          </Helmet>
          <div className="my-auto">
  
          <div>
              <h5 className="text-primary">New Pass Code</h5>
            <p className="text-muted">Hello <span className="text-capitalize fw-semibold text-black">{accountFirstName+" "+accountMiddleName}</span>, correctly fill in the inputs below to reset your <strong className="text-black fw-medium text-capitalize">4 digit Pass Code</strong></p>
          </div>
  
          <div className="mt-4">
              <form autocomplete="off" className="needs-validation" novalidate onSubmit={settingTheNewPassword}>
  
                    <div className="msg-holder-err ">
                        <div class="alert alert-dismissible fade d-none" id="login-msg" role="alert">
                            <i class="mdi mdi-block-helper me-2"></i>
                            {errorMsg}
                            <button type="button" class="btn-close close-alert"></button>
                        </div>
                    </div>

                  <div className="mb-3">
                      <label for="userpassword" className="form-label">New Pass Code</label>
                      <input  onChange={(event)=>setNewPassword(event.target.value)} maxLength="4" required type="password" className="form-control" id="userpassword" placeholder="4 Digit Pass Code" required/>
                      <div className="invalid-feedback text-capitalize">
                          Enter your New Pass Code
                      </div>
                  </div>
  
                  <div className="mb-3">
                      <label for="userpassword" className="form-label">Confirm Pass Code</label>
                      <input  onChange={(event)=>setConfirmPassword(event.target.value)}  maxLength="4" required type="password" className="form-control" id="confirmpassword" placeholder="Confirm Pass Code" required/>
                      <div className="invalid-feedback text-capitalize">
                          Pass code mismatch
                      </div>
                  </div>
  
                  <div>
                      <p className="mb-0 text-danger pass-feedback text-capitalize fw-semibold d-flex align-items-center text-left"><span className="bx msg-icon pr-2 font-16px"></span>{passErr}</p>
                  </div>
  
                  <div className="mt-4 d-grid d-flex">
                        <Link to="/Login/otpVerification" className="btn btn-outline-secondary waves-effect text-capitalize" type="submit">Previous</Link>
                        <span className="opacity-0">nt</span>

                        {canClick? (
                            <button type="button" className="btn btn-primary waves-effect waves-light flex-grow-1" type="submit">Finish</button>
                                ) : (
                            <button disabled="true" className="btn btn-primary waves-effect waves-light flex-grow-1" type="submit">Finish</button>
                        )}

                  </div>
  
                  <div className="mt-4 text-center d-none">
                      <h5 className="font-size-14 mb-3">Sign up using</h5>
  
                      <ul className="list-inline">
                          <li className="list-inline-item">
                              <a href="javascript::void()" className="social-list-item bg-primary text-white border-primary">
                                  <i className="mdi mdi-facebook"></i>
                              </a>
                          </li>
                          <li className="list-inline-item">
                              <a href="javascript::void()" className="social-list-item bg-info text-white border-info">
                                  <i className="mdi mdi-twitter"></i>
                              </a>
                          </li>
                          <li className="list-inline-item">
                              <a href="javascript::void()" className="social-list-item bg-danger text-white border-danger">
                                  <i className="mdi mdi-google"></i>
                              </a>
                          </li>
                      </ul>
  
                  </div>
  
              </form>
  
              <div className="mt-5 text-center">
                  <p>Already have an account ? <a href="auth-login.html" className="fw-medium text-primary"> Login</a> </p>
              </div>
                                
             
            <button className="btn btn-primary waves-effect waves-light d-none" id="success-modal" type="button" data-bs-toggle="modal" data-bs-target=".password-set-succeess" >
                Log In
            </button>
            <div className="modal fade password-set-succeess" data-toggle="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title"></h5>
                            <button type="button" className="btn-close d-none"  data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="block-card-form"   className="modal-body p-4 pt-0">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <div className="mb-3">
                                        <img className="m-0 p-0" src="assets/images/animated/password.gif" alt="" height="130px"/>
                                    </div>
                                    <h5 className="text-uppercase text-black fw-semibold">{errorMsg}</h5>
                                    <p className="text-muted">
                                        Your Pass Code has been updated, use your new Pass Code to login.
                                    </p>
                                </div>
                            </div>
                        </form>
                        <div className="modal-footer px-4 border-0">
                        <div className="col-12 d-flex ">
                                <button  className="close-success-password mb-2 btn btn-primary text-center flex-grow-1  justify-items-center align-items-center" data-bs-dismiss="modal" aria-label="Close">
                                    <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span className="">Continue</span>
                                </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

              
  
          </div>
          </div>

          {/* confirming password was set */}
          
          
      {/* <!-- end container-fluid --> */}
  
        </>
      );
}

export default NewPassword;
