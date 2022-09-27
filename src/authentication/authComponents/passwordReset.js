import React, {useState, useEffect,useRef} from 'react';
import { Helmet } from "react-helmet";
import { Route, Routes, HashRouter, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import {Link} from "react-router-dom"
import $ from 'jquery';
const PasswordReset=()=>{
  const [phoneNum,setPhoneNum]=useState("")
  const [errorMsg, seterrorMsg]=useState("");
  const navigate=useNavigate()

   // loader setting
   const [loading, setLoading] = useState(false);
   const [quote, setQuote] = useState({});

  useEffect(()=>{
    // sendMoneyStart()
    //document.getElementById(".dismis-btn-dont-block").click()
  },[phoneNum])

  //document.getElementById(".dismis-btn-dont-block").click();

  //remove a backdrop when oppening this page
  $('.modal-backdrop').removeClass('show').addClass('d-none')

  const getOtpCode=async(event)=>{
    
    event.preventDefault();
    let data={
      "msisdn":StdFunctions.add254(phoneNum),
      "appSignature":"sdw3423qwd"
    }
    //alert(StdFunctions.add254(phoneNum))
    if(phoneNum!="")
    {
      setLoading(true);
      $('.otp-btn').prop('disabled', true);
      AuthService.getAccountByPhoneNum(StdFunctions.add254(phoneNum)).then((res)=>{
        console.log(res.data)
        if(res.data.totalPages===1){

          localStorage.setItem("OTPmiddleName", res.data.data[0].userProfile.middleName)
          localStorage.setItem("OTPFirstName", res.data.data[0].userProfile.firstName)
          localStorage.setItem("OTPgender", res.data.data[0].userProfile.gender)
          

          AuthService.getOTP(data).then((res)=>{
            if(res.data.statusCode===200){
              setQuote(res.data);       
              seterrorMsg(res.data.statusDescription)

              //setting up the local storage OTP
              localStorage.setItem("OTPPhoneNum", StdFunctions.add254(phoneNum))
              localStorage.setItem("OTPType","SMS")
              

              $('#login-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
              setTimeout(() => {
                setLoading(false);
                navigate("/Login/otpVerification",{replace:true})
              }, 2000);        
        
            }
            else{
              $('.btn-send').prop('disabled', false);
              $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all');
        
            }
          })
        }
        else{
          setLoading(false)
          $('.otp-btn').prop('disabled', false);
          seterrorMsg("An account with that phone number does not exist")
          $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all');;
        }
      })

      
    }
  }

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
                    <h5 className="m-0 p-0 text-u">Sending OTP</h5>
                </div>
            </div>
            ):(
                <h1 className="d-none">Sent</h1>
            )
          }
      <Helmet>
        <title>Blink! | Reset Your Pass Code</title>
      </Helmet>
      <div className="my-auto">

        <div>
            <h5 className="text-primary"> Reset Your Pass Code</h5>
            <p className="text-muted">Enter your Phone number and an OTP will be sent to you.</p>
        </div>

        <div className="msg-holder-err ">
            <div class="alert alert-danger alert-dismissible fade d-none" id="login-msg" role="alert">
                <i class="mdi mdi-block-helper me-2"></i>
                {errorMsg}
                <button type="button" class="btn-close close-alert"></button>
            </div>
          </div>

        <div className="mt-4">
            
            <form onSubmit={getOtpCode} id='otp-form'>

                <div className=" mb-3 ">
                    <label for="useremail " className="form-label ">Phone</label>
                    <input type="text" className="form-control " id="phoneNum" name="phoneNum" placeholder="Enter your phone number" onChange={(event)=>setPhoneNum(event.target.value)} />
                </div>

                <div className="text-end ">
                    <button className="btn btn-primary w-md waves-effect waves-light otp-btn align-items-center d-flex" type="submit ">

                      <span className="pl-3 ps-5">
                        Get OTP
                      </span>
                   </button>
                </div>

            </form>
            <div className="mt-5 text-center ">
                <p>Remember It ? <Link to="/Login" className="fw-medium text-primary "> Login</Link> </p>
            </div>
        </div>
    </div>

      
  {/* <!-- end container-fluid --> */}

    </>
  );
}

export default PasswordReset;
