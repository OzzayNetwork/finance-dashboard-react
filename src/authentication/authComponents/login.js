import React,{useState,useEffect} from "react";
import { Helmet } from "react-helmet";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";



const Login = () => {
  //alert("we are at the login page "+theParentId)


const [username, setUsername]=useState("");
const [passWord,setPassword]=useState("");
const [errorMsg, seterrorMsg]=useState("");
const [loginClicked,setLoginClicked]=useState(false)
const[passwordStatus,setPasswordStatus]=useState(false)
const[fname,setFname]=useState("")
const[midName,setMidName]=useState("")



  const loginStart = (event) => {
    setLoginClicked(true)
    event.preventDefault();
    let data = {
      email: username,
      password: passWord,
      userType: "Parent",
    };

    let data2 = {
      msisdn: username,
      password: passWord,
      userType: "Parent",
    };
    
    console.log(data)
    AuthService.logIn(data).then((res) => {
        console.log(res);
        
        if(res.status===200){
            seterrorMsg(res.data.statusDescription)
            if(res.data.data.passwordSet===true){
              //alert("we are logging in")
               //setting the local storage with some data
              localStorage.setItem("parentId", res.data.data.userId)
              localStorage.setItem("parentEmail", res.data.data.email)
              localStorage.setItem("parentPhone", res.data.data.msisdn)
              localStorage.setItem("parentUserName", res.data.data.userName)
              localStorage.setItem("parentUserFName", res.data.data.userProfile.firstName)
              localStorage.setItem("parentUserLName", res.data.data.userProfile.lastName)
              if(res.data.data.userProfile.blinkaccounts.length !=0){
                //alert("It is not null")
                localStorage.setItem("guardianWalletBal", res.data.data.userProfile.blinkaccounts[0].currentBalance)
              }
              else{
                //alert("It is null")
                localStorage.setItem("guardianWalletBal", 0)

              }
              localStorage.setItem("guardianBlinkers", JSON.stringify(res.data.data.associates))
              //localStorage.setItem("parentFName",res.data.userProfile.firstName);

              //setting active blinker

              localStorage.setItem("activeBlinker", JSON.stringify(res.data.data.associates[res.data.data.associates.length-1].userId))
              localStorage.setItem("activeBlinkerIndex", JSON.stringify(res.data.data.associates.length-1))


            //alert(  localStorage.setItem("parentId", res.data.data.userId))
              console.log(localStorage)
              
            // alert( localStorage.setItem("parentFName",res.data.userProfile.firstName))

              $('#login-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
              setUsername(data.email);
            //alert(res.data.data.userId);
             window.location.reload()
              console.log(localStorage);
              //setTheParentId(res.data.data.userId);
              //alert(theParentId = {parentId})
              //alert(theParentId)
            }
            else{
              // $('.msg-holder').removeClass('d-none')
              console.log(res.data.data.passwordSet)
              console.log(res.data.data)
              setLoginClicked(false)
              document.getElementById("password-modal").click();
              setFname(res.data.data.userProfile.firstName)
              setMidName(res.data.data.userProfile.lastName)
             
            }
           
        }
      }).catch((err)=>{
        console.log(err)
        AuthService.phoneLogin(data2).then((res2)=>{
          if(res2.status===200){
            seterrorMsg(res2.data.statusDescription)
            console.log(res2)
            if(res2.data.data.passwordSet===true){
              //setting the local storage with some data
              localStorage.setItem("parentId", res2.data.data.userId)
              localStorage.setItem("parentEmail", res2.data.data.email)
              localStorage.setItem("parentPhone", res2.data.data.msisdn)
              localStorage.setItem("parentUserName", res2.data.data.userName)
              localStorage.setItem("parentUserFName", res2.data.data.userProfile.firstName)
              localStorage.setItem("parentUserLName", res2.data.data.userProfile.lastName)
              localStorage.setItem("guardianWalletBal", res2.data.data.userProfile.blinkaccounts[0].currentBalance)
              localStorage.setItem("guardianBlinkers", JSON.stringify(res2.data.data.associates))
              //localStorage.setItem("parentFName",res.data.userProfile.firstName);
              //setting active blinker
              localStorage.setItem("activeBlinker", JSON.stringify(res2.data.data.associates[res2.data.data.associates.length-1].userId))
              localStorage.setItem("activeBlinkerIndex", JSON.stringify(res2.data.data.associates.length-1))
              //alert(  localStorage.setItem("parentId", res.data.data.userId))
              console.log(localStorage)
              // alert( localStorage.setItem("parentFName",res.data.userProfile.firstName))
              $('#login-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
              setUsername(data.email);
              //alert(res.data.data.userId);
              window.location.reload()
              console.log(localStorage);
              //setTheParentId(res.data.data.userId);
              //alert(theParentId = {parentId})
              //alert(theParentId)
           }
           else{
              // $('.msg-holder').removeClass('d-none')
              console.log(res2.data.data.passwordSet)
              console.log(res2.data.data)
              setLoginClicked(false)
              document.getElementById("password-modal").click();
              setFname(res2.data.data.userProfile.firstName)
              setMidName(res2.data.data.userProfile.lastName)
           }
          }

        }).catch((error2)=>{
          //alert("some error")
          console.log(error2.response.data.statusDescription);
          seterrorMsg(error2.response.data.statusDescription)
          setLoginClicked(false)
          //  $('.msg-holder-err ').removeClass('d-none');
          //  $('.msg-holder-err .alert').alert('show');
          //  alert("we are not logger");
          //show
          $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all');;
        })
        
      })
  };

  return (
    <>
      <Helmet>
        <title>Blink! | Login to your account</title>
      </Helmet>
      <div className="my-auto">
        <div>
          <h5 className="text-primary">Welcome Back!</h5>
          <div className="msg-holder-err ">
            <div class="alert alert-danger alert-dismissible fade d-none" id="login-msg" role="alert">
                <i class="mdi mdi-block-helper me-2"></i>
                {errorMsg}
                <button type="button" class="btn-close close-alert"></button>
            </div>
          </div>

          {/* <div className="d-none msg-holder-success">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="mdi mdi-block-helper me-2"></i>
                {errorMsg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div> */}

          <p className="d-none">{errorMsg}</p>
        </div>

        <div className="mt-4">
          <form onSubmit={loginStart}>
            <div className="mb-3">
              <label for="username" className="form-label">
                Email or Phone No.
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your Email address or Phone Number"
                onChange={(event)=>setUsername(event.target.value)}
                required="true"
                required parsley-type="email"
              />
            </div>

            <div className="mb-3">
              <div className="float-end">
                <Link to="PasswordReset" className="fw-medium">
                  Forgot Pass Code?
                </Link>
              </div>
              <label className="form-label">Pass Code</label>
              <div className="input-group auth-pass-inputgroup text-capitalize">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your Pass Code"
                  aria-label="Password"
                  aria-describedby="password-addon"
                  onChange={(event)=>setPassword(event.target.value)}
                  required="true"
                />
                <button
                  className="btn btn-light "
                  type="button"

                  id="password-addon"
                >
                  <i className="mdi mdi-eye-outline"></i>
                </button>
              </div>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember-check"
              />
              <label className="form-check-label" for="remember-check">
                Remember me
              </label>
            </div>

            <div className="mt-3 d-grid">
              <button
                className="btn btn-primary waves-effect waves-light d-none"
                id="password-modal"
                type="button"
                data-bs-toggle="modal" data-bs-target=".set-password"
              >
                Log In
              </button>
              {loginClicked ? (
                <button disabled  className="btn d-flex justify-content-center align-items-center btn-primary waves-effect waves-light w-100 btn-flex btn-outline-danger waves-effect  btn text-center justify-items-center align-items-center btn-block-card">
                    <div class="spinner-border d-flex text-white m-0 " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span className="d-none">Login</span>
                  </button>
                  ):(
                    <button  className="btn btn-primary waves-effect waves-light w-100 btn-flex btn-outline-danger waves-effect  btn text-center justify-items-center align-items-center btn-block-card">
                      <div class="spinner-border d-none text-white m-0 " role="status">
                          <span class="sr-only">Loading...</span>
                      </div>
                      <span className="">Login</span>
                    </button>
                  )
              }
             

              
              
            </div>
          </form>
          <div className="mt-5 text-center text-capitalize font-weight-semibold fw-bold d-none">
              <p>Have an in inactive account? <a href="auth-register-2.html" class="fw-medium text-primary"> Activate your account </a> </p>
          </div>
        </div>
      </div>

      <div className="modal fade set-password" data-toggle="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" id="dismis-btn-dont-block" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="block-card-form"   className="modal-body p-4 pt-0">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="mb-3">
                                    <img className="m-0 p-0" src="assets/images/animated/lock.gif" alt="" height="130px"/>
                                </div>
                                <h5 className="text-uppercase text-black fw-semibold">Pass Code not set</h5>
                                <p className="text-muted">
                                  Welcome {fname+" "+midName} to your guardian portal account. Proceed to set your Pass Code.
                                </p>
                            </div>
                        </div>
                    </form>
                      <div className="modal-footer px-4 border-0">
                       <div className="col-12 d-flex ">
                            <Link to="PasswordReset" className=" btn-dont-block mb-2 btn btn-primary text-center flex-grow-1  justify-items-center align-items-center">
                                <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Continue</span>
                            </Link>
                       </div>
                    </div>
                </div>
            </div>
        </div>

      {/* <!-- end container-fluid --> */}
    </>
  );
};

export default Login;
