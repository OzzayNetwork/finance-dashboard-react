import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const AccountDetails =(props)=> {
    
    // loader setting
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});
    const [btnClicked,setBtnClicked]=useState(false)
    const [loadTransations,setLoadTransactions]=useState(true)

    const [loggedAdmin,setLogedadmin]=useState("")

    
    const[blinkerId,setBlinkerId]=useState(props.activeBlinker)
    const[userAccountDetails,setAccountDetails]=useState({})

   


    useEffect(()=>{
        setAccountDetails({})
        setLoadTransactions(true)
        AuthService.getStudentDetails(props.activeBlinker).then((res)=>{
            console.log(res)
            if(res.status==200){          
                // alert("found")  
                setAccountDetails(res.data.data)  
                console.log(res.data.data) 
                setLoadTransactions(false)
            }

        }).catch((err)=>{
            setLoadTransactions(false)
            // alert("error")
        })
        

        //transaction details start here
    },[props.activeBlinker])
    return (
      <>
        <Helmet>
          <title>Blink! | Account Details</title>
        </Helmet>
        {/* the modals container */}

        <div
          class="modal fade"
          id="account-details-modal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog modal-dialog-centered transaction-edit-modal ">
            <div class="modal-content position-relative">
              {loadTransations ? (
                <div class="modal-loader d-flex w-100 bg-white flex-column justify-items-center align-items-center p-5 position-absolute top-0 h-100 left-0 bottom-0 right-0">
                  <div class="lds-ripple">
                    <div></div>
                    <div></div>
                  </div>
                  <h6 class="text-uppercase pt-3 text-danger">Loading ...</h6>
                </div>
              ) : (
                <></>
              )}

              <div class="modal-body text-capitalize">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge  badge-soft-success text-uppercase badge font-12px bg-primary text-white">
                    Account Details
                  </span>

                  <button
                    type="button"
                    className="btn btn-light position-relative p-0 avatar-xs rounded-circle pull-right close-modal"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="avatar-title bg-transparent text-reset font-18px">
                      <i className="bx bx-x"></i>
                    </span>
                  </button>
                </div>
                <div className="payment-panel-parent">
                  <div className="d-flex justify-content-between align-items-center flex-column">
                    <div className="flex-shrink-0  mt-4 mb-2">
                      <div class="avatar-md mx-auto ">
                        <span class="avatar-title rounded-circle bg-random font-size-24 ">
                          {userAccountDetails?.userProfile?.firstName.charAt(0) +
                              "" +
                              userAccountDetails?.userProfile?.lastName.charAt(0)}
                        </span>
                      </div>
                      <img
                        className="rounded-circle avatar-sm d-none"
                        src="assets/images/users/avatar-5.jpg"
                        alt="Generic placeholder image"
                        height="65"
                      />
                    </div>
                    <span className="text-uppercase badge badge-soft-info mb-2 mt-2">
                      {userAccountDetails.userType}
                    </span>
                    <h5 class="font-size-14 mt-0 mb-0 text-capitalize">
                      {userAccountDetails?.userProfile?.firstName+" "+userAccountDetails?.userProfile?.middleName+" "+userAccountDetails?.userProfile?.lastName}
                    </h5>
                    <small>
                        {userAccountDetails?.userProfile?.institution?.institutionName}
                    </small>

                    <h2 className=" text-uppercase mt-4 mb-1 d-none">
                      KES 12333
                    </h2>

                    <p className="text-uppercase mb-4 d-none">Wallet Balance</p>
                    <h5 class="font-size-14 mt-3 mb-0 text-capitalize">
                      Blink ID:
                      <span class="text-black fw-semibold">
                      {userAccountDetails?.blinkId}
                      </span>
                    </h5>
                    <div class="col-12 bg-info bg-soft mt-3">
                      <div class="row text-left p-3">
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <p class="mb-0 d-flex align-items-center text-primary pr-4">
                                    <i class="mdi mdi-email-outline mr-0 font-18px"></i><span class="px-2">{userAccountDetails?.email}</span>
                                </p>

                                <p class="mb-0 d-flex align-items-center text-primary pl-4">
                                    <i class="mdi mdi-phone mr-0 font-18px"></i><span class="px-2">{StdFunctions.phoneOutput(userAccountDetails?.msisdn)}</span>
                                </p>

                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default AccountDetails;