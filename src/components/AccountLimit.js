import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes,useParams} from "react-router-dom";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'


import $ from 'jquery';


const AccountLimit=()=>{
const { id } = useParams();
const theNewStudentId=id

const [selectedStudentId,setSelectedStudentId]=useState(theNewStudentId)
const [students, setstudents] = useState([])
const [studentProfile, setStudentProfile] = useState({})
const[limitClick,setLimitClick]=useState(false)

const [fetchedStudentDetails,setFetchedStudentDetails]=useState({})
//Accounts states start here
const [allBlinkAccounts,setAllBlinkAccounts]=useState([])
const [numOfAccounts,setNumOfAccounts]=useState(0)
const[selectedPocketMoneyId,setselectedPocketMoneyId]=useState("")


const[alllimits,setAlllimits]=useState([])
const[isDailyLimitSet,setIsDailyLimitSet]=useState(false)
const[statusUpdate,setStatusUpdate]=useState("")
const [errorMsg, seterrorMsg]=useState("");
const [loading, setLoading] = useState(false);
const [quote, setQuote] = useState({});
const [dailyCardLimit, setDailyCardLimit] = useState("");
const [newDailyCardLimit, setNewDailyCardLimit] = useState("");
const [firstStudent,setFirstStudent]=useState({})
const [schoolName,setSchoolName]=useState("")
const [myBlinkersCount,setMyBlinkersCount]=useState(0);
const [hasBlinkers,setHasBlinkers]=useState(false)
const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")



$('.limit-container').unbind().on('click', function(){
    $(this).find('input').removeClass('d-none');
    $(this).siblings().removeClass('d-none')
    $(this).find('.limit-text').addClass('d-none')
    $(this).find('.change-icon').addClass('d-none').removeClass('d-flex')
    $('.account-limit-modal .modal-footer ').removeClass('d-none')
    $('.btn-set-limit-sm').prop('disabled', false);
   // alert("the body clicked")
    setTimeout(() => {
        $(this).removeClass('waves-effect')
      }, 2000); 
});

$('.close-limit-box').unbind().on('click', function(){
    $(this).addClass('d-none');
    $(this).siblings().find('input').addClass('d-none')
    $(this).siblings().find('input').val('')
    $(this).siblings('.limit-container').addClass('waves-effect').find('input').addClass('d-none');
    $(this).siblings('.limit-container').find('.limit-text').removeClass('d-none')
    $(this).siblings('.limit-container').find('.change-icon').removeClass('d-none').addClass('d-flex')
    $('.btn-set-limit-sm').prop('disabled', true);
    
    $('.account-limit-modal .modal-footer ').addClass('d-none')
})



$('.account-limit-modal .btn-close').unbind().on('click', function () {
    $('.limit-container').addClass('waves-effect').find('input').addClass('d-none');
    $('.limit-container').find('.limit-text').removeClass('d-none')
    $('.limit-container').find('.change-icon').removeClass('d-none').addClass('d-flex')
    $('.close-limit-box').addClass('d-none')
    $(this).siblings().find('input').val('')
    $('.account-limit-modal .modal-footer ').addClass('d-none')
    $('.limit-msg').addClass('d-none')
  })

  $('.offcanvas-bottom .btn-close').unbind().on('click', function(){
    $('.limit-msg').addClass('d-none')
  })





useEffect(() => {
    //alert("we are here")
    let blinkAccId
    console.log(selectedStudentId)
    //load before showiing data
    //const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"));
    const allBlinkers=AuthService.getLogedInAssociates()
    setstudents(allBlinkers)
    setFirstStudent(allBlinkers[selectedStudentId])
    setMyBlinkersCount(allBlinkers.length)
    console.log(allBlinkers)


    AuthService.getStudentDetails(selectedStudentId).then((res)=>{
        setStudentProfile(res.data.data.userProfile)

        setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
        console.log("the blink wallet account Id is:"+blinkWalletAccountNum)
        let blinkNo=res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber
        //alert(blinkWalletAccountNum)
        setFetchedStudentDetails(res.data.data)
        console.log(res.data.data)
        setSchoolName(res.data.data.userProfile.institution.institutionName)
        //all other accounts
        setAllBlinkAccounts(res.data.data.userProfile.blinkaccounts)
        setNumOfAccounts(allBlinkAccounts.length)
        setselectedPocketMoneyId(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkAccountId)

        blinkAccId=res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkAccountId

        //alert(numOfAccounts)
        console.log("All accounts for first blinker are "+allBlinkAccounts)
        console.log(allBlinkAccounts)
        console.log(studentProfile)
        setLoading(false);

        // checking for limits
        AuthService.getAccountLimits(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkAccountId).then((res)=>{
       
            console.log("The account Limits ARe: "+res.data.data.find(x=>x.limitPeriod==="DAILY").amount)
            setAlllimits(res.data.data)
    
            console.log("the account limits starts here")
            console.log(res)
            if(res.status===200){
                
                if(res.data.data.find(x=>x.limitPeriod==="DAILY").limitStatus==="Active"){
                    //alert("A limit is set")
                    setDailyCardLimit(res.data.data.find(x=>x.limitPeriod==="DAILY").amount)
                    setNewDailyCardLimit(res.data.data.find(x=>x.limitPeriod==="DAILY").amount)
                    setIsDailyLimitSet(true)
                }
                else{
                    setIsDailyLimitSet(false)  
                    setDailyCardLimit("Not Set")
                }
            }
            else{
                setIsDailyLimitSet(false) 
            }
        }).catch((err)=>{
            if(err.response.status===404){
                setDailyCardLimit("Not Set")
                console.log("The first student is")
                console.log(firstStudent)
                //alert("Limit not set")
                setIsDailyLimitSet(false)
            }
       })
       


    }).catch((err)=>{

    })
    // setLimitClick(false)

    //checking if account has limits
   
    
},[limitClick])

$('.changeLimitLink').unbind().on('click',function(){
    //alert("clicked")
    setLimitClick(true)
})

//checking if it has an existing limit
useEffect(()=>{
     
    
},[])


const newLimit=async(event)=>{

    let data={
        "amount":newDailyCardLimit,
        "blinkAccountId":selectedPocketMoneyId,
        "limitPeriod":"DAILY",
        "limitStatus":"Active",
        "addedBy":StdFunctions.parentId,
        "kidUserId":theNewStudentId,
      }
      console.log(firstStudent)
      //alert(firstStudent.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
      //alert(StdFunctions.parentId)

      //alert(firstStudent.blinkId)
      //alert(firstStudent.userId)


    $('.btn-set-limit').prop('disabled', true);
    event.preventDefault(); 
    $('.btn-set-limit').children('div').removeClass('d-none').addClass('animate__animated').siblings('span').addClass('d-none')        
      
    AuthService.newCardLimit(data).then((res)=>{           
       console.log(res)
      
       $('.limit-msg').show().removeClass('d-none').addClass('show')

       if(res.status===200){
            seterrorMsg(res.data.statusDescription)
            $('.btn-set-limit').prop('disabled', false);  
            $('.btn-set-limit').children('div').addClass('d-none').removeClass('animate__animated').siblings('span').removeClass('d-none') 
            $('.limit-container').addClass('waves-effect').find('input').addClass('d-none');
            $('.limit-container').find('.limit-text').removeClass('d-none')
            $('.limit-container').find('.change-icon').removeClass('d-none').addClass('d-flex')
            $('.limit-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
            $('.close-limit-box').addClass('d-none')   
            $('.limit-msg').removeClass('d-none').removeClass('fade')
            seterrorMsg("Daily transaction limit for "+studentProfile?.firstName +" "+studentProfile?.middleName+" has been updated to "+StdFunctions.kenyaCurrency(newDailyCardLimit))
            $('.btn-set-limit-sm').prop('disabled', true);
            setDailyCardLimit(newDailyCardLimit)
            setIsDailyLimitSet(true)
            $('.account-limit-modal .modal-footer ').addClass('d-none')
            setIsDailyLimitSet(true)

            $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
            $('#the-toast .toast-body').text("New Expenditure limit set")
            
            setTimeout(() => {                  
                $('#the-toast').addClass('animate__fadeOutDown')
              }, 4000);  
              setTimeout(() => {                  
                $('#the-toast').removeClass('show')
              }, 5000);

            if(res.data.data.limitStatus==="Inactive"){
                AuthService.inactivateLimit(data).then((res)=>{
                    if(res.status===200){
                        setIsDailyLimitSet(true)
                    }
                })
             }
            
        }
       
     
    }).catch((err)=>{
      console.log(err)
      $('.btn-set-limit').prop('disabled', false);  
       $('.btn-set-limit').children('div').addClass('d-none').removeClass('animate__animated').siblings('span').removeClass('d-none')   
            
    })
}

//disable limit
const disableLimit=async(event)=>{
    $('.disable-limits').prop('disabled', true);
    event.preventDefault(); 
    $('.disable-limits').children('div').removeClass('d-none').addClass('animate__animated').siblings('span').addClass('d-none') 
    //alert(theNewStudentId)
    let data={
        "amount":newDailyCardLimit,
        "blinkAccountId":selectedPocketMoneyId,
        "limitPeriod":"DAILY",
        "limitStatus":"Inactive",
        "addedBy":StdFunctions.parentId,
        "kidUserId":theNewStudentId
      }
     
      AuthService.inactivateLimit(data).then((res)=>{           
        console.log(res)
       
        $('.limit-msg').show().removeClass('d-none').addClass('show')

        if(res.status===200){
            //alert("disabled")
             seterrorMsg(res.data.statusDescription)
             setNewDailyCardLimit("")
             $('.disable-limits').prop('disabled', false);  
             $('.disable-limits').children('div').addClass('d-none').removeClass('animate__animated').siblings('span').removeClass('d-none') 
             $('.limit-container').addClass('waves-effect').find('input').addClass('d-none');
             $('.limit-container').find('.limit-text').removeClass('d-none')
             $('.limit-container').find('.change-icon').removeClass('d-none').addClass('d-flex')
             $('.limit-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
             $('.close-limit-box').addClass('d-none')   
             $('.limit-msg').removeClass('d-none').removeClass('fade')
             seterrorMsg("Daily transaction limit for "+studentProfile?.firstName +" "+studentProfile?.middleName+" has been disabled")
             $('.btn-set-limit-sm').prop('disabled', true);
             $('.account-limit-modal .modal-footer ').addClass('d-none')
             setIsDailyLimitSet(false)
             setDailyCardLimit("Not Set")
             console.log(res.data)

             $('.account-limit-modal .btn-close').click()

             $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
            $('#the-toast .toast-body').text("Expenditure limit Disabled")
            
            setTimeout(() => {                  
                $('#the-toast').addClass('animate__fadeOutDown')
              }, 4000);  
              setTimeout(() => {                  
                $('#the-toast').removeClass('show')
              }, 5000);
            
         }
        
      
     }).catch((err)=>{
       console.log(err)
       $('.disable-limits').prop('disabled', false);  
        $('.disable-limits').children('div').addClass('d-none').removeClass('animate__animated').siblings('span').removeClass('d-none')   
         //alert("somethong went wrong")    
     })
}




  const location = useLocation();
  let currentWindow=location.pathname;

  //let currentWindow = location.pathname;
  let ourBaseURL = "/Login";
  console.log(currentWindow)

  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  } else {
    //console.log(location.pathname)
  return (
    <>
{/* Setting Expenditure Limits */}
<div className="modal fade account-limit-modal" data-toggle="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change Expenditure Limits</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="changeLimit" onSubmit={newLimit} className="modal-body ro  p-0">
                        <div className="px-3 col-12">
                            <div className="msg-holder-err w-100 pt-3 px-3 p-0 text-none">
                                <div class="alert alert-danger alert-dismissible fade d-none limit-msg" id="" role="alert">
                                    <i class="mdi mdi-block-helper me-2"></i>
                                    {errorMsg}
                                    <button type="button" class="btn-close close-alert"></button>
                                </div>
                            </div>
                        </div>
                        <div className="waves-effect col-12 mb-0 d-flex align-items-end">
                            <div className="mb-0 d-flex flex-grow-1  align-items-center waves-effect align-items-center p-3 limit-container">
                                <div className="flex-grow-1">
                                    <label for="formrow-firstname-input" className="form-label">Max Daily pocket money Expenditure</label>
                                    

                                    {isDailyLimitSet ? (
                                        <h5 className="text-blink-primary limit-text">{StdFunctions.kenyaCurrency(dailyCardLimit)}</h5>
                                    ):(
                                        <h5 className="text-blink-primary limit-text">{dailyCardLimit}</h5>
                                        )
                                    }

                                    <input type="number" required className="form-control d-none" value={newDailyCardLimit} onChange={(event)=>setNewDailyCardLimit(event.target.value)}  id="dailyLimits" Name="DailyLimits" placeholder="Enter Daily Limit"/>
                                </div>
                                {isDailyLimitSet ? (
                                        <span  className="d-flex align-items-center change-icon">
                                            <small className="text-primary">Change Limit</small>
                                            <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                        </span>
                                    ):(
                                        <span  className="d-flex align-items-center change-icon">
                                            <small className="text-primary">Set  Limit</small>
                                            <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                        </span>
                                    )
                                }

                            </div>
                            <button type="button" class="mb-3 me-3 d-none btn btn-light position-relative p-0 avatar-xs rounded-circle close-limit-box ">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="mdi mdi-close font-size-18"></i>
                                </span>
                            </button>
                       </div>

                       <div className="col-12 mb-0 d-fle align-items-end d-none">
                            <div className="mb-0 d-flex flex-grow-1  align-items-center waves-effect align-items-center p-3 limit-container">
                                <div className="flex-grow-1">
                                    <label for="formrow-firstname-input" className="form-label">Maximum Weekly pocket money Expenditure</label>
                                    <h5 className="text-blink-primary limit-text">Not Set</h5>
                                    <input type="text" className="form-control d-none flex-grow-1 me-3"  id="dailyLimits" Name="DailyLimits" placeholder="Enter Weekly Limit"/>
                                        
                                </div>
                                
                                {isDailyLimitSet ? (
                                        <span  className="d-flex align-items-center change-icon">
                                            <small className="text-primary">Change Limit</small>
                                            <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                        </span>
                                    ):(
                                        <span  className="d-flex align-items-center change-icon">
                                            <small className="text-primary">Set  Limit</small>
                                            <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                        </span>
                                    )
                                }

                            </div>
                            <button type="button" class="mb-3 d-none btn btn-light position-relative p-0 avatar-xs rounded-circle close-limit-box ">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="mdi mdi-close font-size-18"></i>
                                </span>
                            </button>
                       </div>

                       <div className="col-12 mb-0 d-fle align-items-end d-none">
                            <div className="mb-0 d-flex flex-grow-1  align-items-center waves-effect align-items-center p-3 limit-container">
                                <div className="flex-grow-1">
                                    <label for="formrow-firstname-input" className="form-label">Maximum Monthly pocket money Expenditure</label>
                                    <h5 className="text-blink-primary limit-text">Not set</h5>
                                    <input type="text" className="form-control d-none" value={newDailyCardLimit}   id="dailyLimits" Name="DailyLimits" placeholder="Enter Monthly Limit"/>
                                </div>
                                <span  className="d-flex align-items-center change-icon">
                                    <small className="text-primary">Change</small>
                                    <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                </span>

                            </div>
                            <button type="button" class="mb-3 d-none btn btn-light position-relative p-0 avatar-xs rounded-circle close-limit-box ">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="mdi mdi-close font-size-18"></i>
                                </span>
                            </button>
                       </div>

                    </form>
                    <form onSubmit={disableLimit} id="limit-disable"></form>
                    <div className="modal-footer d-flex d-none px-3">

                       <div className="col-12 d-flex ">
                            
                            {isDailyLimitSet ? (
                                <button form="limit-disable" className="disable-limits btn btn-outline-secondary waves-effect btn-flex btn me-3  text-center justify-items-center align-items-center">
                                    <div class="spinner-border d-none text-secondary m-0 " role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span className="">Disable Limits</span>
                                </button>
                                ):(
                                    <></>
                                )
                            }

                            <button form="changeLimit" className="btn-flex btn-set-limit  btn btn-primary text-center flex-grow-1  justify-items-center align-items-center">
                                <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Save Changes</span>
                            </button>
                       </div>
                    </div>
                </div>
            </div>
        </div>

        {/* expenditure mobile */}
                                    
        <div className={`offcanvas offcanvas-bottom border-bottom ${StdFunctions.isDeviceAnAndroiid() ? "pt-3678" : ""}`}   tabindex="-1" id="offcanvas-limits" aria-labelledby="offcanvasBottomLabel">
            <div className={`offcanvas-header border-bottom ${StdFunctions.isDeviceAnAndroiid() ? "pt-5678" : ""}`}>
                <h5 className="offcanvas-title mb-0">Expenditure Limits</h5>
                <button type="button mt-4" className="btn-close text-reset waves-effect" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <form id="changeLimit2" onSubmit={newLimit} className="offcanvas-body px-0 pb-0 pt-3 d-flex flex-column justify-content-between">
                <div className="form-content w-100">
                    <div className="waves-effect col-12 mb-0 d-flex align-items-end">
                        <div className="mb-0 d-flex flex-grow-1  align-items-center waves-effect align-items-center p-3 limit-container">
                            <div className="flex-grow-1">
                                <label for="formrow-firstname-input" className="form-label">Max Daily pocket money Expenditure</label>
                                {isDailyLimitSet ? (
                                        <h5 className="text-blink-primary limit-text">{StdFunctions.kenyaCurrency(dailyCardLimit)}</h5>
                                    ):(
                                        <h5 className="text-blink-primary limit-text">{dailyCardLimit}</h5>
                                    )
                                }
                                <input type="number" min="20" required className="form-control d-none" onChange={(event)=>setNewDailyCardLimit(event.target.value)}  id="dailyLimits" Name="DailyLimits" placeholder="Enter Daily Limit"/>
                            </div>
                                {isDailyLimitSet ? (
                                        <span  className="d-flex align-items-center change-icon">
                                            <small className="text-primary">Change Limit</small>
                                            <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                        </span>
                                    ):(
                                        <span  className="d-flex align-items-center change-icon">
                                            <small className="text-primary">Set  Limit</small>
                                            <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                        </span>
                                    )
                                }

                        </div>
                        <button type="button" class="mb-3 me-3 d-none btn btn-light position-relative p-0 avatar-xs rounded-circle close-limit-box ">
                            <span class="avatar-title bg-transparent text-reset">
                                <i class="mdi mdi-close font-size-18"></i>
                            </span>
                        </button>
                    </div>

                    <div className="col-12 mb-0 d-fle align-items-end d-none">
                        <div className="mb-0 d-flex flex-grow-1  align-items-center waves-effect align-items-center p-3 limit-container">
                            <div className="flex-grow-1">
                                <label for="formrow-firstname-input" className="form-label">Maximum Weekly pocket money Expenditure</label>
                                <h5 className="text-blink-primary limit-text">Not Set</h5>
                                <input type="text" className="form-control d-none flex-grow-1 me-3"  id="dailyLimits" Name="DailyLimits" placeholder="Enter Weekly Limit"/>
                                    
                            </div>
                            <span  className="d-flex align-items-center change-icon">
                                <small className="text-primary">Change</small>
                                <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                            </span>
                            

                        </div>
                        <button type="button" class="mb-3 d-none btn btn-light position-relative p-0 avatar-xs rounded-circle close-limit-box ">
                            <span class="avatar-title bg-transparent text-reset">
                                <i class="mdi mdi-close font-size-18"></i>
                            </span>
                        </button>
                    </div>

                    <div className="col-12 mb-0 d-fle align-items-end d-none">
                        <div className="mb-0 d-flex flex-grow-1  align-items-center waves-effect align-items-center p-3 limit-container">
                            <div className="flex-grow-1">
                                <label for="formrow-firstname-input" className="form-label">Maximum Monthly pocket money Expenditure</label>
                                <h5 className="text-blink-primary limit-text">Not set</h5>
                                <input type="text" className="form-control d-none"   id="dailyLimits" Name="DailyLimits" placeholder="Enter Monthly Limit"/>
                            </div>
                            <span  className="d-flex align-items-center change-icon">
                                <small className="text-primary">Change</small>
                                <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                            </span>

                        </div>
                        <button type="button" class="mb-3 d-none btn btn-light position-relative p-0 avatar-xs rounded-circle close-limit-box ">
                            <span class="avatar-title bg-transparent text-reset">
                                <i class="mdi mdi-close font-size-18"></i>
                            </span>
                        </button>
                    </div>

                </div>
                <div className="d-flex flex-column p-3">
                    <div className="col-12">
                        <div className="msg-holder-err w-100 pt-0 px-0">
                            <div class="alert alert-danger alert-dismissible fade d-none limit-msg"  role="alert">
                                <i class="mdi mdi-block-helper me-2"></i>
                                {errorMsg}
                                <button type="button" class="btn-close close-alert"></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-non">
                        {isDailyLimitSet ? (
                            <button form="limit-disable" className="disable-limits mb-3 w-100 btn btn-outline-secondary waves-effect btn-flex btn me-3  text-center justify-items-center align-items-center">
                                <div class="spinner-border d-none text-secondary m-0 " role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Disable Limit</span>
                            </button>
                            ):(
                                <></>
                            )
                        }
                    </div>

                   

                    <div className="col-12">
                        <button disabled form="changeLimit2" className="btn-flex btn-set-limit btn-set-limit-sm w-100 btn btn-primary text-center flex-grow-1  justify-items-center align-items-center">
                            <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <span className="">Save Changes</span>
                        </button>
                    </div>

                </div>
            </form>
        </div>
    
     
    </>
  );
  }

  if(currentWindow==="/"){
    console.log("we are at the home page")
  }

  
}

export default AccountLimit;
