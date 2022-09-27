import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes,useParams} from "react-router-dom";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'


import $ from 'jquery';
const BlockBlinker=()=>{

  const[statusUpdate,setStatusUpdate]=useState("")

  const [students, setstudents] = useState([])
  const[blockLable,setBlockLable]=useState("")

  //Accounts states start here
  const [loading, setLoading] = useState(false);
  const [firstStudent,setFirstStudent]=useState({})

  const [allBlinkAccounts,setAllBlinkAccounts]=useState([])
  const [numOfAccounts,setNumOfAccounts]=useState(0)
  //account states end here

  //getting selected blinker
  const { id } = useParams();
  const theNewStudentId=id
  const [fetchedStudentDetails,setFetchedStudentDetails]=useState({})

  const [selectedStudentId,setSelectedStudentId]=useState(theNewStudentId)

  const[selectedPocketMoneyId,setselectedPocketMoneyId]=useState("")
  const [errorMsg, seterrorMsg]=useState("");
  const [blockTitle,setBlockTitle]=useState("")
  const [blockMsg,setBlockMsg]=useState("")
  const [blockErrMsg,setBlockErrMsg]=useState("")
  const [blockImg,setBlockImg]=useState("")
  const[cardIsBlocked,setCardIsBlocked]=useState(false)
  const [selectedStudentActiveStatus,setSelectedStudentActiveStatus]=useState(true)
  //getting selected account pocket money id
  const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")

  //student details
  const [studentProfile, setStudentProfile] = useState({})


  const location = useLocation();
  let currentWindow=location.pathname;

  //let currentWindow = location.pathname;
  let ourBaseURL = "/Login";
  console.log(currentWindow)

  //getting student details
  useEffect(()=>{

    const allBlinkers=AuthService.getLogedInAssociates()
    console.log(allBlinkers)
    console.log(allBlinkers.find(x=>x.userProfileId===theNewStudentId))
        //setstudents(allBlinkers)
        setFirstStudent(allBlinkers[0])
    
      AuthService.getStudentDetails(theNewStudentId).then((res)=>{  
        //alert(res.data.data.userProfile.firstName) 
        //alert(res.data.data.userProfile.status) 
       
        setStudentProfile(res.data.data.userProfile)
        setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
        console.log("the blink wallet account Id is:"+blinkWalletAccountNum)
        //alert(blinkWalletAccountNum)
        setFetchedStudentDetails(res.data.data)
        //all other accounts
        setAllBlinkAccounts(res.data.data.userProfile.blinkaccounts)
        setNumOfAccounts(allBlinkAccounts.length)
        setselectedPocketMoneyId(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkAccountId)

        //alert(numOfAccounts)
        console.log("All accounts for first blinker are "+allBlinkAccounts)
        console.log(allBlinkAccounts)
        setLoading(false);

        //the account details to check for blocking
        if(res.data.data.userProfile.status==="Disabled"){
            setSelectedStudentActiveStatus(false)
            setCardIsBlocked(true)
    
            setBlockMsg(res.data.data.userProfile.firstName+" Will be unable to access the funds from the card. Do you want to unblock?")
            setBlockTitle(res.data.data.userProfile.firstName+"'s Card Has Been Blocked")
            setBlockImg("assets/images/animated/credit-card.gif")
            setBlockLable("Unblock "+res.data.data.userProfile.firstName)
        }
        else{
            setSelectedStudentActiveStatus(true)
            setCardIsBlocked(false)
    
            setBlockTitle("Block " +res.data.data.userProfile.firstName+"'s Card")
            setBlockMsg("Are you sure you want to block the card?")
            setBlockImg("assets/images/Account-options/block.svg")
            setBlockLable("Block "+res.data.data.userProfile.firstName)
            
        }


    }).catch((err)=>{
      console.log(err)
     // alert("Error occured at blocking")
    })
  },[theNewStudentId])

  // seeing if student is blocked
  

  // blocking and unblocking
  const blockCard2=async(event)=>{
    setStatusUpdate("Disabled");
    event.preventDefault()
    $('.btn-block-card').prop('disabled', true).siblings().prop('disabled', true);
    $('.btn-block-card').children("div").removeClass('d-none').siblings('span').addClass('d-none')
    //alert(firstStudent.userId)
    //alert()
    AuthService.changeAccountStatus(theNewStudentId,"Disabled").then((res)=>{
       setBlockErrMsg(res.data.statusDescription) 
        if(res.status===200){
           
            setSelectedStudentActiveStatus(false)

            setBlockMsg(studentProfile?.firstName+" Will be unable to access the funds from the card. Do you want to unblock?")

            setBlockTitle(studentProfile.firstName+"'s Card Has Been Blocked")
            setBlockImg("assets/images/animated/credit-card.gif")
            setCardIsBlocked(true)
            $('.btn-block-card').prop('disabled', false).siblings().prop('disabled', false)
            $('.btn-block-card').children("div").addClass('d-none').siblings('span').removeClass('d-none')
            setBlockLable("Unblock "+res.data.data.userProfile.firstName)
        }
        else{
           // alert("Action cant be performed at the moment. Try again later")
        }
    }).catch((err)=>{
        // alert("Something went wrong, try again later")
    })
}

const unBlockCard2=async(event)=>{
    setStatusUpdate("Active");
    event.preventDefault()
    $('.btn-set-unblock').prop('disabled', true).siblings().prop('disabled', true);
    $('.btn-set-unblock').children("div").removeClass('d-none').siblings('span').addClass('d-none')
    //alert(firstStudent.userId)
    //alert()
    AuthService.changeAccountStatus(studentProfile.userId,"Active").then((res)=>{
       setBlockErrMsg(res.data.statusDescription) 
        if(res.status===200){
           
           
            setSelectedStudentActiveStatus(true)
            setBlockErrMsg(studentProfile?.firstName+"'s Account was succesfully reactivated.") 
            
            setBlockImg("assets/images/Account-options/block.svg")
            setCardIsBlocked(false)

            setBlockTitle("Block " +studentProfile?.firstName+"'s Card")
            setBlockMsg("Are you sure you want to block the card?")

            $('.btn-set-unblock').prop('disabled', false).siblings().prop('disabled', false);
            $('.btn-set-unblock').children("div").addClass('d-none').siblings('span').removeClass('d-none')
            $('.block-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
            $('.account-block-modal .btn-close').click()
            
            $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
            $('#the-toast .toast-body').text(studentProfile?.firstName+"'s Card has been Unblocked")
            setBlockLable("Block "+res.data.data.userProfile.firstName)
            setTimeout(() => {                  
                $('#the-toast').addClass('animate__fadeOutDown')
              }, 4000);  
              setTimeout(() => {                  
                $('#the-toast').removeClass('show')
              }, 5000);
        }
        else{
           // alert("Action cant be performed at the moment. Try again later")
        }
    }).catch((err)=>{
        // alert("Something went wrong, try again later")
        setTimeout(() => {                  
            $('#the-toast').addClass('animate__fadeOutDown')
          }, 4000);  
          setTimeout(() => {                  
            $('#the-toast').removeClass('show')
          }, 5000);
    })
}

  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  } else {
    //console.log(location.pathname)
  return (
    <>
      {/* blocking card modal */}
      <div className="modal fade account-block-modal" data-toggle="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="block-card-form"  onSubmit={blockCard2} className="modal-body p-4 pt-0">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div className="mb-4">
                                    <img className="m-0 p-0" src={blockImg} alt="" height="90px"/>
                                </div>
                                
                                <h5 className={`text-uppercase ${cardIsBlocked ? "text-danger" : "text-black"}`}>{blockTitle}</h5>
                                <p className="">{blockMsg}</p>
                               
                            </div>
                        </div>

                        <div className="col-12 text-left">
                            <div className="msg-holder-err w-100 pt-0 px-0">
                                <div class="alert alert-danger alert-dismissible fade d-none block-msg"  role="alert">
                                    <i class="mdi mdi-block-helper me-2"></i>
                                    {blockErrMsg}
                                    <button type="button" class="btn-close close-alert"></button>
                                </div>
                            </div>
                        </div>

                    </form>
                    <form id="unblock-card" onSubmit={unBlockCard2}></form>
                    <div className="modal-footer px-4">

                       <div className="col-12 d-flex ">

                            {cardIsBlocked ? (
                               <>
                               <button form="unblock-card"   className=" btn-set-unblock me-3  btn btn-success text-center flex-grow-1  justify-items-center align-items-center unblock-card">
                                    <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span className="">Unblock {firstStudent?.firstName}</span>
                                </button>
                                <button data-bs-dismiss="modal"  className="btn-flex btn-outline-danger waves-effect  btn text-center justify-items-center align-items-center btn-block-card-close">
                                    <div class="spinner-border d-none text-danger m-0 " role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span className="">Close</span>
                                </button>
                               </>
                            ):(
                                <>
                                <button data-bs-dismiss="modal"  className=" btn-dont-block me-3  btn btn-info text-center flex-grow-1  justify-items-center align-items-center">
                                <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Don't Block</span>
                            </button>
                            <button  form="block-card-form" className="btn-flex btn-outline-danger waves-effect  btn text-center justify-items-center align-items-center btn-block-card">
                                <div class="spinner-border d-none text-danger m-0 " role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Block</span>
                            </button>
                                </>
                            )
                        }

                            
                       </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
  );
  }

  if(currentWindow==="/"){
    console.log("we are at the home page")
  }

  
}

export default BlockBlinker;
