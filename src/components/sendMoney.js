import React, {useState, useEffect,useRef} from 'react';
import { Helmet } from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import axios from "axios";
import $ from 'jquery';

const SendMoney=()=>{
    const parentId=localStorage.getItem("parentId")
    const parentEmail= localStorage.getItem("parentEmail")
    const parentUserName= localStorage.getItem("parentUserName")
    const parentFName=localStorage.getItem("parentUserFName")
    const parentLName=localStorage.getItem("parentUserLName")
    const parentWalletBal=localStorage.getItem("guardianWalletBal")
    const [errorMsg, seterrorMsg]=useState("")
    const [stkMsg, setStkMsg]=useState("")
    const [payStep,setPayStep]=useState(0)
    const[stkSent,setStkSent]=useState(false)
    const[transactionFee,setTransactionFee]=useState(0)
    

    console.log(localStorage)


    const [students, setstudents] = useState([])
    const [studentProfile, setStudentProfile] = useState({})
    const [firstStudent,setFirstStudent]=useState({})
    const [schoolName,setSchoolName]=useState("")
    const [myBlinkersCount,setMyBlinkersCount]=useState(0);

    //Accounts states start here
    const [allBlinkAccounts,setAllBlinkAccounts]=useState([])
    const [numOfAccounts,setNumOfAccounts]=useState(0)
    //account states end here

    //active account
    const[activeAccount,setActiveAccount]=useState("")
    //end of active ACCOUNT

    //send money inputs
    const [sendAmount,setSendAmount]=useState("")
    const [mpesaPhoneNum,setMpesaPhoneNum]=useState(StdFunctions.parentPhoneNo)
    const [sendMethod,setSendMethod]=useState("MPESA")
    const [sendAccountName,setSendAccountName]=useState("")
    const [mpesaTrue,setMpesaTrue]=useState(true)
    const [transactionStatus,setTransactionStatus]=useState("")
    const[sendMoneytransactionId,setSendMoneytransactionId]=useState("")
    const [sendMoneyCallback,setSendMoneyCallBack]=useState({})
    const[accountBalance,setAccountBalance]=useState("")
    const prevAmount = useRef();
    const blinkaudio=new Audio('../assets/sounds/notification-tone-swift-gesture.mp3');

    const [reoadState, setReoadState] = useState(1);
       const reloadComponent = () => {
        setReoadState(Math.random());
        window.location.reload(false)
        }

    
    useEffect(() => {
        //calling the send money function
        
        blinkerClicked()
        //const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"));
        const allBlinkers=AuthService.getLogedInAssociates()
        setstudents(allBlinkers)
        setFirstStudent(allBlinkers[0])
        setMyBlinkersCount(allBlinkers.length)
        //console.log(allBlinkers[0])
        
        AuthService.getStudentDetails(AuthService.getLogedInAssociates()[0].userId).then((res)=>{
            setStudentProfile(res.data.data.userProfile)
            //console.log("The student details")
            setTransactionFee(res.data.data.userProfile.institution.commission)
            setAllBlinkAccounts(res.data.data.userProfile.blinkaccounts)
            setNumOfAccounts(allBlinkAccounts.length)
            setActiveAccount(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
            setSendAccountName(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkersAccountType)
            setAccountBalance(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').currentBalance)
            prevAmount.current = accountBalance
            //alert(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)

        }).catch((err)=>{

        })
    },[])

    //sending money us effect
    useEffect(()=>{
        sendMoneyStart()
    },[transactionStatus])
    useEffect(()=>{
        console.log("The transaction fee is: "+transactionFee)
    },[transactionFee,firstStudent])

    // converting numbers to currency
    const kenyaCurrency=(num)=>{
        return 'KES ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    //this function helps get the details pertaining to the details of a student's account
    const targetId=firstStudent.userId
    // alert(targetId)


    const getInstitututionName=(studentId)=>{
        var studentInstitutionName
        AuthService.getStudentDetails(studentId).then((res)=>{
            console.log(res)
          //  setSchoolName(res.data.data.associates[0].institution.institutionName)
          
          studentInstitutionName=res.data.data.associates[0].cardId
            //alert(schoolName);
            console.log("the school Name is "+studentInstitutionName)
            
        })
        return studentInstitutionName
    }

    

    console.log(students);
    const blinkerClicked=(studentId,clickedIndex)=>{
        AuthService.getStudentDetails(studentId).then((res)=>{
           
            console.log(res)
            setSchoolName(res.data.data.associates[0].institution.institutionName)
            //alert(schoolName);
            console.log("the school Name is "+schoolName)
            setStudentProfile(res.data.data.userProfile)
            console.log(studentProfile)
            //alert(clickedIndex)

            const allBlinkers=AuthService.getLogedInAssociates()

            setFirstStudent(allBlinkers[clickedIndex])
            setMyBlinkersCount(allBlinkers.length)
            //console.log(allBlinkers[0])
            //alert(studentId)
        
        AuthService.getStudentDetails(AuthService.getLogedInAssociates()[clickedIndex].userId).then((res)=>{
            setStudentProfile(res.data.data.userProfile)
            setTransactionFee(res.data.data.userProfile.institution.commission)
            console.log("The transaction fee is:")
            console.log(res.data.data.userProfile.institution.commission)
            setAllBlinkAccounts(res.data.data.userProfile.blinkaccounts)
            setNumOfAccounts(allBlinkAccounts.length)
            setActiveAccount(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
           setSendAccountName(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkersAccountType)
           setAccountBalance(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').currentBalance)
           prevAmount.current = accountBalance
            console.log(allBlinkAccounts)

            console.log(studentProfile)
        }).catch((err)=>{

        })
        })
        // const returnedData= AuthService.getStudentDetails(studentId)
        // const GetSchoolName=returnedData.data.cardStatus
        

       

    }

    const accountClicked=async(accountId,accountName)=>{
        $(this).addClass("active").siblings().removeClass("active")
        setActiveAccount(accountId)
        setSendAccountName(accountName)
        
    }

    const sendMoneyStart=async(event)=>{

        $('.btn-send').prop('disabled', true);
        // $('.btn-send').children('div').removeClass('d-none').addClass('animate__animated').siblings('span').addClass('d-none')        


        event.preventDefault(); 
        let data = {
            
            TransactionType:"CustomerPayBillOnline",

            //test paybill
            // PayBillNumber:"175555",

            //live paybill
            PayBillNumber:"7597135",
            Amount:sendAmount,
            PhoneNumber:mpesaPhoneNum,
            CheckoutPhoneNumber:mpesaPhoneNum,
            AccountReference:activeAccount,
            TransactionDesc:"Topping up to "+StdFunctions.removeUnderscore(sendAccountName),
            userProfileId:StdFunctions.parentId,
            userId:StdFunctions.parentId,

            //live service id
            transactionServiceId:6,

            //live merchant Id
            merchantId:8

            //Test service id
            //transactionServiceId:1,

            //Test merchant Id
            //merchantId:1
          };
          let theStatus="Pending"
         
          AuthService.sendStkPush(data).then((res)=>{
            console.log(res.data)
            if(res.data.statusCode===200){
                setStkSent(true)
                $('#walletTopUp .modal-footer').addClass('d-none');
                $('#walletTopUp .close-modal').addClass('d-none');
                $('.stk-timer-container').removeClass('d-none').siblings().addClass('d-none');
                $(".stk-sent-msg").removeClass("d-none")
                setStkMsg(res.data.statusDescription)
                setSendMoneytransactionId(res.data.data.transactionId)
                $('#login-msg').addClass('d-none');
                

                var paymentTimeOut=6
                var getPaymentStatus=setInterval(function(){
                //const theStatus=AuthService.fetchTransactionByTransactionId(sendMoneytransactionId)
                $(".stk-timer").text(paymentTimeOut + " s");
                    if(paymentTimeOut<=0){
                        clearInterval(getPaymentStatus); 
                        $('.stk-sent').removeClass('d-none').siblings().addClass('d-none')

                        blinkaudio.play()
                           
                        blinkaudio.currentTime = 0;
                        const playAudio=setTimeout(function() { blinkaudio.pause(); }, 1000);
                    }
                    else{
                        //alert(transactionStatus)
                        console.log("The transaction status at every 10 seconds "+transactionStatus)
                        paymentTimeOut -= 1;
                    }
                    console.log(paymentTimeOut)
                },1000)
            }
            else{
                seterrorMsg("An unexpected error, try again later.")
                $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all')
                $('.btn-send').prop('disabled', false);
            }
          })

        
        console.log("Amount sending is KES:"+sendAmount)
        //alert(sendAmount)
        //alert(mpesaPhoneNum)
       
    }
    const reloadPage=(event)=>{
        //window.location.reload(false);
    }

    //setting amiunt sending
    const amountSending=async(event)=>{
        console.log(event.target.value); 
        setSendAmount(event.target.value)
       if(event.target.value<=transactionFee){
        $('.amount-send-input').addClass('text-danger')
       }
       else{
        $('.amount-send-input').removeClass('text-danger')
       }
    }


    //sending payment
   //sending payment
   $('body').unbind().on('click','.payment-next', function(){

    $('.payment-prev').prop('disabled', false)       
    var countTheSteps = parseFloat($(".payment-panel-parent .payment-panel").length);
    var theCurrentIndex= $(".payment-panel-parent .payment-panel.payment-active-panel").index();
    //setPayStep(theCurrentIndex)
    console.log("The current index is "+theCurrentIndex)
    theCurrentIndex=theCurrentIndex;
    if(theCurrentIndex!=countTheSteps){
        $('.payment-panel-parent').find('.payment-active-panel').addClass('d-none').removeClass('payment-active-panel').next().removeClass('d-none').addClass('payment-active-panel')
    }
    if (theCurrentIndex==countTheSteps-1) {
        $('.payment-next').addClass('d-none');
    }

    if(theCurrentIndex===1){
        $(this).prop('disabled', true);
    }
      
    

})

$('.payment-prev').unbind().on('click', function(){
    $('.payment-next').removeClass('d-none');  
    $('.payment-next').prop('disabled', false);
    var countTheSteps = parseFloat($(".payment-panel-parent .payment-panel").length);
    var theCurrentIndex= $(".payment-panel-parent .payment-panel.payment-active-panel").index();
    //theCurrentIndex=theCurrentIndex-1
    setPayStep(theCurrentIndex)
    console.log("The current index is "+theCurrentIndex)
    if(theCurrentIndex!=0){
        $('.payment-panel-parent').find('.payment-active-panel').addClass('d-none').removeClass('payment-active-panel').prev().removeClass('d-none').addClass('payment-active-panel')
        //$(this).prop('disabled', true);
    } 
    
    
    if(theCurrentIndex===1){
         $(this).prop('disabled', true);
    }

});



    return (
        <>
          <Helmet>
            <title>Blink! | Top up student's account</title>
          </Helmet>
          <div className="modal fade" id="walletTopUp" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalCenterTitle" aria-bs-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
              <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                  <div className="modal-header d-none">
                      <span className="badge badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Top Up Student's Account</span>
                  
                          
                      <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle close-modal" data-bs-dismiss="modal" aria-label="Close">
                          <span className="avatar-title bg-transparent text-reset font-18px">
                              <i className="bx bx-x"></i>
                          </span>
                      </button>
  
                  </div>
                  <form className="modal-body" autoComplete="off" id="payment-form" onSubmit={sendMoneyStart}>
                      <div className="d-flex justify-content-between align-items-center">
                          <span className="badge  badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Top Up Student's Account</span>
                  
                          
                      <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle pull-right close-modal" data-bs-dismiss="modal" aria-label="Close">
                          <span className="avatar-title bg-transparent text-reset font-18px">
                              <i className="bx bx-x"></i>
                          </span>
                      </button>
                      </div>
  
                      <div className="payment-panel-parent">
                          <div className="recepient-account payment-panel payment-active-panel">
                              <h5 className="text-capitalize text-black fw-medium">Recepient, Blink account & Amount </h5>
                              <label className="text-capitalize text-muted">Blinker receiving the money</label>
                              
                              <div>
                                  
                                  <div className="dropdown d-inline-block w-100 d-flex align-items-center mb-4 bg-info bg-opacity-25">
                                      <button type="button" className="btn header-item waves-effect align-items-center w-100  text-left d-flex" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <div className="flex-shrink-0 me-3">
                                            <div class="avatar-sm mx-auto ">
                                                <span class="avatar-title rounded-circle bg-random font-size-20">
                                                {studentProfile.institution != undefined && studentProfile.firstName.charAt(0)+""+studentProfile.middleName.charAt(0)}
                                                </span>
                                            </div>
                                              <img className="rounded-circle avatar-sm d-none" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="65"/>
                                          </div>
                                          
                                          <div className="flex-grow-1 chat-user-box me-3">
                                              <h6 className="user-title m-0 text-black fw-medium">{studentProfile.institution != undefined && studentProfile.firstName+" "+studentProfile.middleName}</h6>
                                              <p className="text-muted m-0 p-0">{studentProfile.institution != undefined && studentProfile.institution.institutionName}</p>
                                          </div>
                                            {StdFunctions.isBlinkersMore(students.length)?(
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <span className="d-flex align-items-center"><small className="text-info mr-3">Select Blinker</small> <i className="mdi mdi-chevron-down  d-xl-inline-block me-3 font-21"></i></span>
                                                </div>
                                            ):(
                                            <span></span>
                                            )}
                                          
                                      </button>
  
                                      
                                      <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-start p-0 w-100 ${StdFunctions.isgreaterThanOne(myBlinkersCount) ? "" : "d-none"}`}>
                                          <div className="p-3">
                                              <div className="row align-items-center">
                                                  <div className="col">
                                                      <h6 className="m-0" key="t-notifications"> My Blinkers </h6>
                                                  </div>
                                                  <div className="col-auto">
                                                      <a href="notifications.html" className="small" key="t-view-all"> View All</a>
                                                  </div>
                                              </div>
                                          </div>
                                          {students.length> 1 && students.map((item, index)=>(
                                            <div  style={{ maxheight: "230px" }}>
                                                <a onClick={()=> blinkerClicked(item.userId,index)}   className="d-flex px-3 pb-2 waves-effect dropdown-item">
                                                    <div className="flex-shrink-0 me-3">
                                                        <img className="rounded-circle d-none" src="assets/images/users/avatar-4.jpg" alt="Generic placeholder image" height="36"/>
                                                        <div className="avatar-sm mx-auto ">
                                                            <span className="avatar-title rounded-circle bg-random font-size-16 profile-abriv">
                                                                {item.firstName.charAt(0)+item.middleName.charAt(0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 chat-user-box">
                                                        <p className="user-title m-0">{item.firstName+" "+item.middleName}</p>
                                                        <p className="text-muted">{item.blinkId}</p>
                                                    </div>                                                            
                                                </a>
                                                </div>
                                            ))
                                            
                                        }    
                                          
                                      </div>
  
                                  
                                  </div>
  
                                  <label className="text-capitalize text-muted mb-4">Account you are sending the money to</label>
                                  <div className="mb-4 acount-type">
                                     

                                      <div>

                                        {allBlinkAccounts.length> 0 && allBlinkAccounts.slice(0,40).map((account, index)=>(
                                            
                                                <div>
                                                    <div className="d-none">Testing to see if my if else statememnt might work</div>
                                                        {StdFunctions.isActiveAccount(account.accountStatus) ? (
                                                            <a onClick={()=>accountClicked(account.accountNumber,account.blinkersAccountType)}  className={`d-flex px-3 mb-3 pl-0 py-2 align-items-center accountsSelector cursor-pointer text-capitalize ${StdFunctions.areTheyThesame(account.accountNumber,activeAccount) ? "active" : ""}`}>
                                                                <div className="flex-shrink-0 me-3">
                                                                    <img className="rounded-circle avatar-sm d-none" src="assets/images/blink-accounts/savings.svg" alt="Generic placeholder image" />
                                                                    {StdFunctions.isWelfareAccount(account.blinkersAccountType) ? (
                                                                        <img className="me-2" src="assets/images/blink-accounts/wellfare-alt.svg" alt="" height="40px"/>
                                                                        
                                                                        ) : (
                                                                        <></>
                                                                    )}
                                                                    {StdFunctions.isPocketMoney(account.blinkersAccountType) ? (
                                                                        <img className="me-2" src="assets/images/blink-accounts/wallet-alt.svg" alt="" height="40px"/>
                                                                        
                                                                        ) : (
                                                                        <></>
                                                                    )}
                                                                </div>
                                                                <div className="flex-grow-1 chat-user-box">
                                                                    <p className="user-title m-0 text-uppercase font-14px mb-0 pb-0">{StdFunctions.removeUnderscore(account.blinkersAccountType)}</p>
                                                                    <small>Acc Name.: <strong>{account.accountName}</strong></small>
                                                                </div>
                                                            </a>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    
                                                    
                                                </div>
                                            ))
                                            
                                        }  
                                                                            
                                        </div>
                                  </div>
  
                                  <label for="" className="text-capitalize">Amount to send</label>
                                  <div className="form-floating mb-3">
                                      <input type="number" autoComplete="off" className="form-control font-21 text-info form-control-lg amount-send-input" id="amount-input" min={transactionFee} placeholder="Enter Name" required ="true" onChange={amountSending} name="SendAMount"/>
                                      <label for="floatingnameInput">KES</label>
                                  </div>
                                  <div className="d-flex align-items-center px-3 justify-content-center"><span class="badge badge-soft-success font-size-14">  {"Transaction Fee: "+StdFunctions.kenyaCurrency(transactionFee)} </span></div>

                                  
                              </div>
                              
                          </div>
                          <div className="send-method d-none payment-panel">
                              <label for="" className="mb-0 pb-0">Payment Mode</label>
                              <p><small className="text-muted">How would you like to send this money?</small></p>
  
                              <div>
                                  <div className="accordion" id="accordionExample">
                                      <div className="accordion-item">
                                          <h2 className="accordion-header" id="headingOne">
                                              <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                  <div className="flex-shrink-0 me-3">
                                                      <img className="rounded-circle" src="assets/images/payment-options/mobile.svg" alt="Mobile Money" height="45"/>
                                                  </div>
                                                  <div className="d-flex flex-column">
                                                      <p className="m-0 p-0 text-uppercase">Mpesa</p>                                                
                                                      <p className="mb-0 p-0"> <small>Send money from your MPESA</small></p>
                                                  </div>
                                              </button>
                                          </h2>
                                          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                              <div className="accordion-body">
                                                  <div>
                                                      <p>
                                                          A payment request of <strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}</strong> will be sent to the MPESA number you enter below.
                                                      </p>
                                                  </div>
                                                  <div className="form-group">
                                                      <label for="">Your MPESA Phone Number</label>
                                                      <div className="form-floating mb-3">
                                                          <input type="text" autoComplete="off" className="form-control font-21 text-success form-control-lg" id="phone-input" value={mpesaPhoneNum} onChange={(event)=>setMpesaPhoneNum(event.target.value)} name="phoneNum" placeholder="Enter your phone No."/>
                                                          <label for="floatingnameInput">MPESA Phone No.</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="accordion-item d-none">
                                          <h2 className="accordion-header" id="headingTwo">
                                              <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                  <div className="flex-shrink-0 me-3">
                                                      <div className="avatar-sm">
                                                          <span className="avatar-title bg-primary bg-soft text-primary rounded-circle font-size-16">
                                                            {parentFName.charAt(0)+parentLName.charAt(0)}
                                                          </span>
                                                      </div>
                                                  </div>
                                                  <div className="d-flex flex-column">
                                                      <p className="m-0 p-0 text-uppercase">My Guardian Wallet ({parentFName+" "+parentLName})</p>                                                
                                                      <p className="mb-0 p-0"> <small>My Wallet Bal: <strong>KES {parentWalletBal}</strong></small></p>
  
                                                      
                                                  </div>
                                              </button>
                                          </h2>
                                          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                              <div className="accordion-body">
                                                  <div className="text-muted">
                                                      <p><strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}</strong> will be deducted from your Guardian Blink Wallet and the amount will be credited to <strong className="text-black">Alex's Blink Wallet Account.</strong></p>
                                              
                                                  </div>
                                                  <div className="form-group">
                                                      <label for="" className="text-capitalize">Enter your Account's PIN to confirm</label>
                                                      <div className="form-floating mb-3">
                                                          <input type="password" className="form-control text-success form-control-lg pb-3" id="password-input" placeholder="Enter Name"/>
                                                          <label for="floatingnameInput">Your Password</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      
                                  </div>
                              </div>
                          </div>
                          <div className="d-none transaction-summary payment-panel">
                              <label for="">Transaction Breakdown</label>
                              <div className="border p-4 rounded ">
                                  <div className="row">
                                      <div className="col-6">
                                          <div className="text-muted ">
                                              Recepient                                            
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black text-uppercase">
                                          {firstStudent?.firstName+" "+firstStudent?.middleName}                                          
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Blink Account                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.removeUnderscore(sendAccountName)}                                        
                                          </div>
                                      </div>

                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Account No.                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.removeUnderscore(activeAccount)}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Being Debited from                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              MPESA                                        
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Amount To Be Received                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.kenyaCurrency(sendAmount-transactionFee)}                                      
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Transaction Fee                                          
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                          {StdFunctions.kenyaCurrency(transactionFee)}                                    
                                          </div>
                                      </div>
                                      <div className="col-12 text-black"><hr className="mb-0 pb-0"/></div>
  
                                      <div className="col-6 text-uppercase">
                                          <div className="text-muted mt-4 font-21">
                                              Total                                          
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end text-uppercase">
                                          <div className=" text-right text-black font-21 fw-bold">
                                          {StdFunctions.kenyaCurrency(sendAmount)}                                         
                                          </div>
                                      </div>
                                  </div>
  
                                  <div className="mpesa-confirmation ">
                                      <p className="text-muted mt-4">A payment request of <strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}  </strong> will be sent to your <strong className="text-black">phone number ({StdFunctions.phoneOutput(mpesaPhoneNum)})</strong> after you click the <strong className="text-black text-capitalize">Finish</strong> button below. 
                                          <br/>
                                          <br/>
                                          Remember to <strong className="text-black">Check your phone</strong> to confirm payment by entering your MPESA PIN.</p>
                                          <div class="alert alert-danger alert-dismissible fade d-none" id="login-msg" role="alert">
                                                <i class="mdi mdi-block-helper me-2"></i>
                                                {errorMsg}
                                                <button type="button" class="btn-close close-alert"></button>
                                            </div>

                                            {stkSent ? (
                                                <>
                                                <button disabled type="submit" form="payment-form" className="btn-flex d-flex btn-send waves-button waves-effect w-100 mb-4 btn-set-limit  btn btn-primary text-center flex-grow-1  justify-items-center align-items-center justify-content-center align-content-center">
                                                    <div class="spinner-border text-white m-0 text-center d-flex justify-content-center align-items-center animate__slideInDown" role="status">
                                                        <span class="sr-only text-center">Loading...</span>
                                                    </div>
                                                    <span className="justify-content-center align-items-center d-none">
                                                        <span className="px-2">Send Money</span> 
                                                        <div className="flip-x"><i className="mdi mdi-reply ms-3 font-16px"></i></div>
                                                    </span>
                                                </button>
                                          
                                                </>
                                                ):(
                                                    <>
                                                    <button type="submit"  onClick={StdFunctions.dissableBtn} form="payment-form" className="btn-flex waves-button waves-effect w-100 mb-4 btn-set-limit  btn btn-primary text-center flex-grow-1  justify-items-center align-items-center">
                                                        <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        <span className="justify-content-center align-items-center d-flex">
                                                            <span className="px-2">Finish</span> 
                                                            <div className="flip-x"><i className="mdi mdi-reply ms-3 font-16px"></i></div>
                                                        </span>
                                                    </button>
                                          
                                                    </>
                                                )
                                            }
                                         
                                    <p className="stk-sent-msg mt-2 fw-bold font-size12px d-none text-capitalize text-success">{stkMsg}</p>
                                  </div>
  
                                  <div className="my-wallet-confirmation d-none">
                                      <p className="text-muted mt-4 "><strong className="text-uppercase text-black">KES 300</strong> will be deducted from your guardian blink wallet and amount will be credited to <strong className="text-capitalize text-black">Alex's pocket money account</strong>.</p>
                                      <p className="text-muted">confirm transaction by clicking the <strong className="text-capitalize text-black">send money</strong> button.</p>
                                      
                                     
                                      {StdFunctions.isValidPhoneNum(mpesaPhoneNum)? (
                                            <button  className="btn btn-primary btn-send btn-flex flex-grow-1 waves-effect waves-light text-center w-100">
                                             <div className="d-flex justify-content-center align-items-center"> <span className="mx-2">Send Money</span> <div className="flip-x"><i className="mdi mdi-reply flip-x ms-3 font-16px"></i></div></div>
                                            </button>                                        
                                            ) : (
                                                <button disabled="true" className="btn btn-primary btn-flex flex-grow-1 waves-effect waves-light text-center w-100">
                                                    <div className="d-flex justify-content-center align-items-center"> <span className="mx-2">Send Money</span> <div className="flip-x"><i className="mdi mdi-reply flip-x ms-3 font-16px"></i></div></div>
                                                </button>
                                    )}
  
                                  </div>
  
                                  
                              </div>
                          </div>
                          <div className="text-center d-flex flex-column justify-content-around align-items-center sent-success payment-panel d-none">
                              <div className="success-image mb-4">
                                  <img src="assets/images/payment-confirmation-images/sent.svg" height="200" alt=""/>                                
                              </div>
                              <h4 className="text-blink-primary fw-bold">We Have A blink!</h4>
                              <p className="text-muted mb-4"><strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}  </strong> has been sent to <strong className="text-black">Tom Jerry</strong> successfully as his <strong className="text-black"> {StdFunctions.removeUnderscore(sendAccountName)} </strong>. New Balance is {StdFunctions.kenyaCurrency(accountBalance)}</p>
  
                              <div className="border p-4 rounded ">
                                  <div className="row">
                                      <div className="col-lg-6">
                                          <div className="text-muted text-left">
                                              Previouse Balance                                           
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {prevAmount.current}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4 text-left">
                                              Amount Sent                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.kenyaCurrency(sendAmount)}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 d-none">
                                          <div className="text-muted mt-4 text-left">
                                              Transaction Fee                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end d-none">
                                          <div className=" text-right text-black">
                                          {StdFunctions.kenyaCurrency(sendAmount)}                                       
                                          </div>
                                      </div>
                                      <div className="col-12 text-black"><hr className="mb-0 pb-0"/></div>
  
                                      <div className="col-lg-6 text-uppercase">
                                          <div className="text-muted mt-4 font-21 text-left fw-bold">
                                              New Balance                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end text-uppercase">
                                          <div className=" text-right text-black font-21 fw-bold">
                                              {StdFunctions.kenyaCurrency(accountBalance)}                                        
                                          </div>
                                      </div>
                                  </div>
  
                                          
                              </div>
                              
                              <button type="button" onClick={reloadComponent} className="btn btn-flex btn-100 btn-primary flex-grow-1 w-100 font-size-16 text-uppercase my-3 "><i className="mdi mdi-check-bold ms-3 font-16px pr-2"></i>Done!</button>
                          </div>
                          <div className="text-center d-flex flex-column justify-content-around align-items-center stk-sent  d-none">
                              <div className="success-image mb-4">
                                  <img src="assets/images/payment-confirmation-images/stk-sent.svg" height="200" alt=""/>                                
                              </div>
                              <h4 className="text-blink-primary fw-bold text-capitalize mb-3">Check your Phone!</h4>
                              <p className="text-black">A payment request of <strong>{StdFunctions.kenyaCurrency(sendAmount)}</strong> has been sent to your phone No. <strong>{StdFunctions.phoneOutput(mpesaPhoneNum)}.</strong> </p>
                              <p>Check your phone and enter your MPESA PIN to confirm the transaction. A confirmation message will be sent to your phone to confirm the transaction.</p>
  
                              
                              <button type="button" onClick={reloadComponent} className="btn btn-flex btn-100 btn-primary flex-grow-1 w-100 font-size-16 text-uppercase my-3 "><i className="mdi mdi-check-bold ms-3 font-16px pr-2 d-none"></i>Close</button>
                          </div>
                      </div>
                      
                  </form>
                  <div className="modal-footer d-flex">
                      <button href="javascript: void(0);" disabled className="btn btn-outline-light waves-effect waves-light payment-prev"> <i className="mdi mdi-arrow-left ms-1"></i> Previous </button>
                        {StdFunctions.amountIsGreaterThan(transactionFee,sendAmount)? (
                            <button  className="btn btn-primary waves-effect waves-light payment-next">Next <i className="mdi mdi-arrow-right ms-1"></i></button>
                            
                                ) : (
                            <button  disabled="true" className="btn btn-primary waves-effect waves-light payment-next">Next <i className="mdi mdi-arrow-right ms-1"></i></button>
                        )}

                      <button type="submit" href="javascript: void(0);" className="btn btn-primary btn-flex flex-grow-1 waves-effect waves-light text-center d-none">
                        <div className="d-flex justify-content-center align-items-center"> <span>Send Money</span> <div className="flip-x"><i className="mdi mdi-reply flip-x ms-3 font-16px"></i></div></div>
                      </button>
                      
                  </div>
              </div>
              </div>
          </div>

          {/* send money offcanvas */}
        <div className={`offcanvas offcanvas-bottom border-bottom ${StdFunctions.isDeviceAnAndroiid() ? "pt-3566" : ""}`} tabindex="-1" id="offcanvas-send-money" aria-labelledby="offcanvasBottomLabel">
        <div className={`offcanvas-header border-bottom ${StdFunctions.isDeviceAnAndroiid() ? "pt-556" : ""}`}>

            {stkSent ? (
                               <>
                               
                               </>
                            ):(
                                <>
                                    <h5 id="offcanvasBottomExpenditureLabel mb-0">Top Up Student's Account</h5>
                                    <button type="button" className="btn-close text-reset waves-effect" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </>
                            )
                        }
                        </div>

            <form id="send-money-2" onSubmit={sendMoneyStart}  className="offcanvas-body pt-3 pb-0 px-0">
                <div className="payment-panel-parent">
                          <div className="recepient-account payment-panel payment-active-panel">
                              <label for="" className="mb-0 pb-0 px-3">Recepient, Blink account & Amount</label>
                              <p><small className="text-muted px-3">Blinker receiving the money</small></p>
                              
                              <div>
                                  
                                  <div className="dropdown d-inline-block w-100 d-flex align-items-center mb-2 bg-info bg-opacity-25">
                                      <button type="button" className="btn header-item waves-effect align-items-center w-100  text-left d-flex" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <div className="flex-shrink-0 me-3">
                                            <div class="avatar-sm mx-auto ">
                                                <span class="avatar-title rounded-circle bg-random font-size-20">
                                                {studentProfile.institution != undefined && studentProfile.firstName.charAt(0)+""+studentProfile.middleName.charAt(0)}
                                                </span>
                                            </div>
                                              <img className="rounded-circle avatar-sm d-none" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="65"/>
                                          </div>
                                          
                                          <div className="flex-grow-1 chat-user-box me-3">
                                              <h6 className="user-title m-0 text-black fw-medium">{studentProfile.institution != undefined && studentProfile.firstName+" "+studentProfile.middleName}</h6>
                                              <p className="text-muted m-0 p-0">{studentProfile.institution != undefined && studentProfile.institution.institutionName}</p>
                                          </div>
                                            {StdFunctions.isBlinkersMore(students.length)?(
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <span className="d-flex align-items-center"><small className="text-info mr-3">Select Blinker</small> <i className="mdi mdi-chevron-down  d-xl-inline-block me-3 font-21"></i></span>
                                                </div>
                                            ):(
                                            <span></span>
                                            )}
                                          
                                      </button>
  
                                      
                                      <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-start p-0 w-100 ${StdFunctions.isgreaterThanOne(myBlinkersCount) ? "" : "d-none"}`}>
                                          <div className="p-3">
                                              <div className="row align-items-center">
                                                  <div className="col">
                                                      <h6 className="m-0" key="t-notifications"> My Blinkers </h6>
                                                  </div>
                                                  <div className="col-auto">
                                                      <a href="notifications.html" className="small" key="t-view-all"> View All</a>
                                                  </div>
                                              </div>
                                          </div>
                                          {students.length> 1 && students.map((item, index)=>(
                                            <div  style={{ maxheight: "230px" }}>
                                                <a onClick={()=> blinkerClicked(item.userId,index)}   className="d-flex px-3 pb-2 waves-effect dropdown-item">
                                                    <div className="flex-shrink-0 me-3">
                                                        <img className="rounded-circle d-none" src="assets/images/users/avatar-4.jpg" alt="Generic placeholder image" height="36"/>
                                                        <div className="avatar-sm mx-auto ">
                                                            <span className="avatar-title rounded-circle bg-random font-size-16 profile-abriv">
                                                                {item.firstName.charAt(0)+item.middleName.charAt(0)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 chat-user-box">
                                                        <p className="user-title m-0">{item.firstName+" "+item.middleName}</p>
                                                        <p className="text-muted">{item.blinkId}</p>
                                                    </div>                                                            
                                                </a>
                                                </div>
                                            ))
                                            
                                        }    
                                          
                                      </div>
  
                                  
                                  </div>
  
                                  <label className="text-capitalize text-muted mb-0 pb-2 mt-0 border-bottom px-3 w-100">Account you are sending the money to</label>
                                  <div className="mb-4 acount-type">
                                     

                                      <div>

                                        {allBlinkAccounts.length> 0 && allBlinkAccounts.slice(0,40).map((account, index)=>(
                                            
                                                <div>
                                                    <div className="d-none">Testing to see if my if else statememnt might work</div>
                                                        {StdFunctions.isActiveAccount(account.accountStatus) ? (
                                                            <a onClick={()=>accountClicked(account.accountNumber,account.blinkersAccountType)}  className={`d-flex px-3 mb-0 pl-0 py-3 align-items-center accountsSelector cursor-pointer text-capitalize border-bottom ${StdFunctions.areTheyThesame(account.accountNumber,activeAccount) ? "active" : ""}`}>
                                                                <div className="flex-shrink-0 me-3 pl-3">
                                                                    <img className="rounded-circle avatar-sm d-none" src="assets/images/blink-accounts/savings.svg" alt="Generic placeholder image" />
                                                                    {StdFunctions.isWelfareAccount(account.blinkersAccountType) ? (
                                                                        <img className="me-2" src="assets/images/blink-accounts/wellfare-alt.svg" alt="" height="40px"/>
                                                                        
                                                                        ) : (
                                                                        <></>
                                                                    )}
                                                                    {StdFunctions.isPocketMoney(account.blinkersAccountType) ? (
                                                                        <img className="me-2" src="assets/images/blink-accounts/wallet-alt.svg" alt="" height="40px"/>
                                                                        
                                                                        ) : (
                                                                        <></>
                                                                    )}
                                                                </div>
                                                                <div className="flex-grow-1 chat-user-box">
                                                                    <p className="user-title m-0 text-uppercase font-14px mb-0 pb-0">{StdFunctions.removeUnderscore(account.blinkersAccountType)}</p>
                                                                    <small>Acc Name.: <strong>{account.accountName}</strong></small>
                                                                </div>
                                                            </a>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    
                                                    
                                                </div>
                                            ))
                                            
                                        }  
                                                                            
                                        </div>
                                  </div>
  
                                  <div className="px-3">
                                    <label for="" className="text-capitalize">Amount to send</label>
                                    <div className="form-floating mb-3">
                                        <input type="number" autoComplete="off" className="form-control font-21 text-info form-control-lg text-danger amount-send-input" id="amount-input" min={transactionFee} placeholder="Enter Name" required ="true" onChange={amountSending} name="SendAMount"/>
                                        <label for="floatingnameInput">KES</label>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center px-3 justify-content-center"><span class="badge badge-soft-success font-size-14">  {"Transaction Fee: "+StdFunctions.kenyaCurrency(transactionFee)} </span></div>
                                  
                              </div>
                              
                          </div>
                          <div className="send-method d-none payment-panel px-3">
                              <label for="" className="mb-0 pb-0 ">Payment Mode</label>
                              <p><small className="text-muted ">How would you like to send this money?</small></p>
  
                              <div>
                                  <div className="accordion" id="accordionExample">
                                      <div className="accordion-item">
                                          <h2 className="accordion-header" id="headingOne">
                                              <button className="accordion-button fw-medium w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                  <div className="flex-shrink-0 me-3">
                                                      <img className="rounded-circle" src="assets/images/payment-options/mobile.svg" alt="Mobile Money" height="45"/>
                                                  </div>
                                                  <div className="d-flex flex-column">
                                                      <p className="m-0 p-0 text-uppercase">MPESA</p>                                                
                                                      <p className="mb-0 p-0"> <small>Send money from your MPESA</small></p>
                                                  </div>
                                              </button>
                                          </h2>
                                          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                              <div className="accordion-body">
                                                  <div>
                                                      <p>
                                                          A payment request of <strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}</strong> will be sent to the MPESA number you enter below.
                                                      </p>
                                                  </div>
                                                  <div className="form-group">
                                                      <label for="">Your MPESA Phone Number</label>
                                                      <div className="form-floating mb-3">
                                                          <input type="text" autoComplete="off" className="form-control font-21 text-success form-control-lg" id="phone-input" value={mpesaPhoneNum} onChange={(event)=>setMpesaPhoneNum(event.target.value)} name="phoneNum" placeholder="Enter your phone No."/>
                                                          <label for="floatingnameInput">MPESA Phone No.</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="accordion-item d-none">
                                          <h2 className="accordion-header" id="headingTwo">
                                              <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                  <div className="flex-shrink-0 me-3">
                                                      <div className="avatar-sm">
                                                          <span className="avatar-title bg-primary bg-soft text-primary rounded-circle font-size-16">
                                                            {parentFName.charAt(0)+parentLName.charAt(0)}
                                                          </span>
                                                      </div>
                                                  </div>
                                                  <div className="d-flex flex-column">
                                                      <p className="m-0 p-0 text-uppercase">My Guardian Wallet ({parentFName+" "+parentLName})</p>                                                
                                                      <p className="mb-0 p-0"> <small>My Wallet Bal: <strong>KES {parentWalletBal}</strong></small></p>
  
                                                      
                                                  </div>
                                              </button>
                                          </h2>
                                          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                              <div className="accordion-body">
                                                  <div className="text-muted">
                                                      <p><strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}</strong> will be deducted from your Guardian Blink Wallet and the amount will be credited to <strong className="text-black">Alex's Blink Wallet Account.</strong></p>
                                              
                                                  </div>
                                                  <div className="form-group">
                                                      <label for="" className="text-capitalize">Enter your Account's PIN to confirm</label>
                                                      <div className="form-floating mb-3">
                                                          <input type="password" className="form-control text-success form-control-lg pb-3" id="password-input" placeholder="Enter Name"/>
                                                          <label for="floatingnameInput">Your Password</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      
                                  </div>
                              </div>
                          </div>
                          <div className="d-none transaction-summary payment-panel px-3">
                              <label for="">Transaction Breakdown</label>
                              <div className="border p-4 rounded ">
                                  <div className="row">
                                      <div className="col-6">
                                          <div className="text-muted ">
                                              Recepient                                            
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black text-uppercase">
                                          {firstStudent?.firstName+" "+firstStudent?.middleName}                                          
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Blink Account                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.removeUnderscore(sendAccountName)}                                        
                                          </div>
                                      </div>

                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Account No.                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.removeUnderscore(activeAccount)}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Being Debited from                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                              MPESA                                        
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Amount To Be Received                                           
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end">
                                          <div className=" text-right text-black">
                                          {StdFunctions.kenyaCurrency(sendAmount-transactionFee)}                                      
                                          </div>
                                      </div>
  
                                      <div className="col-6">
                                          <div className="text-muted mt-4">
                                              Transaction Fee                                          
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end ">
                                          <div className=" text-right text-black">
                                          {StdFunctions.kenyaCurrency(transactionFee)}                                        
                                          </div>
                                      </div>
                                      <div className="col-12 text-black"><hr className="mb-0 pb-0"/></div>
  
                                      <div className="col-6 text-uppercase">
                                          <div className="text-muted mt-4 font-21">
                                              Total                                          
                                          </div>
                                      </div>
  
                                      <div className="col-6 align-self-end text-uppercase">
                                          <div className=" text-right text-black font-21 fw-bold">
                                          {StdFunctions.kenyaCurrency(sendAmount)}                                         
                                          </div>
                                      </div>
                                  </div>
  
                                  <div className="mpesa-confirmation ">
                                      <p className="text-muted mt-4">A payment request of <strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}  </strong> will be sent to your <strong className="text-black">phone number ({mpesaPhoneNum})</strong> after you click the <strong className="text-black text-capitalize">Finish</strong> button below. 
                                          <br/>
                                          <br/>
                                          Remember to <strong className="text-black">Check your phone</strong> to confirm payment by entering your MPESA PIN.</p>
                                          <div class="alert alert-danger alert-dismissible fade d-none" id="login-msg" role="alert">
                                                <i class="mdi mdi-block-helper me-2"></i>
                                                {errorMsg}
                                                <button type="button" class="btn-close close-alert"></button>
                                            </div>

                                            

                                            {stkSent ? (
                                                <>
                                                <button disabled type="submit" form="send-money-2" className="btn-flex d-flex btn-send waves-button waves-effect w-100 mb-4 btn-set-limit  btn btn-primary text-center flex-grow-1  justify-items-center align-items-center justify-content-center align-content-center">
                                                    <div class="spinner-border text-white m-0 text-center d-flex justify-content-center align-items-center animate__slideInDown" role="status">
                                                        <span class="sr-only text-center">Loading...</span>
                                                    </div>
                                                    <span className="justify-content-center align-items-center d-none">
                                                        <span className="px-2">Finish</span> 
                                                        <div className="flip-x"><i className="mdi mdi-reply ms-3 font-16px"></i></div>
                                                    </span>
                                                </button>
                                          
                                                </>
                                                ):(
                                                    <>
                                                    <button type="submit"  onClick={StdFunctions.dissableBtn} form="send-money-2" className="btn-flex waves-button waves-effect w-100 mb-4 btn-set-limit  btn btn-primary text-center flex-grow-1  justify-items-center align-items-center">
                                                        <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        <span className="justify-content-center align-items-center d-flex">
                                                            <span className="px-2">Finish</span> 
                                                            <div className="flip-x"><i className="mdi mdi-reply ms-3 font-16px"></i></div>
                                                        </span>
                                                    </button>
                                          
                                                    </>
                                                )
                                            }
                                         
                                    <p className="stk-sent-msg mt-2 fw-bold font-size12px d-none text-capitalize text-success">{stkMsg}</p>
                                  </div>
  
                                  <div className="my-wallet-confirmation d-none">
                                      <p className="text-muted mt-4 "><strong className="text-uppercase text-black">KES 300</strong> will be deducted from your guardian blink wallet and amount will be credited to <strong className="text-capitalize text-black">Alex's pocket money account</strong>.</p>
                                      <p className="text-muted">confirm transaction by clicking the <strong className="text-capitalize text-black">send money</strong> button.</p>
                                      
                                     
                                      {StdFunctions.isValidPhoneNum(mpesaPhoneNum)? (
                                            <button  className="btn btn-primary btn-send btn-flex flex-grow-1 waves-effect waves-light text-center w-100">
                                             <div className="d-flex justify-content-center align-items-center"> <span className="mx-2">Send Money</span> <div className="flip-x"><i className="mdi mdi-reply flip-x ms-3 font-16px"></i></div></div>
                                            </button>                                        
                                            ) : (
                                                <button disabled="true" className="btn btn-primary btn-flex flex-grow-1 waves-effect waves-light text-center w-100">
                                                    <div className="d-flex justify-content-center align-items-center"> <span className="mx-2">Send Money</span> <div className="flip-x"><i className="mdi mdi-reply flip-x ms-3 font-16px"></i></div></div>
                                                </button>
                                    )}
  
                                  </div>
  
                                  
                              </div>
                          </div>
                          <div className="text-center d-flex flex-column justify-content-around align-items-center sent-success payment-panel d-none min-vh-100 ">
                              <div className="success-image mb-4">
                                  <img src="assets/images/payment-confirmation-images/sent.svg" height="200" alt=""/>                                
                              </div>
                              <h4 className="text-blink-primary fw-bold">We Have A blink!</h4>
                              <p className="text-muted mb-4"><strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}  </strong> has been sent to <strong className="text-black">Tom Jerry</strong> successfully as his <strong className="text-black"> {StdFunctions.removeUnderscore(sendAccountName)} </strong>. New Balance is {StdFunctions.kenyaCurrency(accountBalance)}</p>
  
                              <div className="border p-4 rounded ">
                                  <div className="row">
                                      <div className="col-lg-6">
                                          <div className="text-muted text-left">
                                              Previouse Balance                                           
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {prevAmount.current}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4 text-left">
                                              Amount Sent                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.kenyaCurrency(sendAmount)}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 d-none">
                                          <div className="text-muted mt-4 text-left">
                                              Transaction Fee                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end d-none">
                                          <div className=" text-right text-black">
                                          {StdFunctions.kenyaCurrency(sendAmount)}                                       
                                          </div>
                                      </div>
                                      <div className="col-12 text-black"><hr className="mb-0 pb-0"/></div>
  
                                      <div className="col-lg-6 text-uppercase">
                                          <div className="text-muted mt-4 font-21 text-left fw-bold">
                                              New Balance                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end text-uppercase">
                                          <div className=" text-right text-black font-21 fw-bold">
                                              {StdFunctions.kenyaCurrency(accountBalance)}                                        
                                          </div>
                                      </div>
                                  </div>
  
                                          
                              </div>
                              
                              <button type="button" onClick={reloadComponent} className="btn btn-flex btn-100 btn-primary flex-grow-1 w-100 font-size-16 text-uppercase my-3 "><i className="mdi mdi-check-bold ms-3 font-16px pr-2"></i>Done!</button>
                          </div>
                          <div className="text-center d-flex flex-column justify-content-center align-items-center stk-sent p-4 min-vh-90 d-none">
                              <div className="success-image mb-4">
                                  <img src="assets/images/payment-confirmation-images/stk-sent.svg" height="200" alt=""/>                                
                              </div>
                              <h4 className="text-blink-primary fw-bold text-capitalize mb-3">Check your Phone!</h4>
                              <p className="text-black">A payment request of <strong>{StdFunctions.kenyaCurrency(sendAmount)}</strong> has been sent to your phone No. <strong>{StdFunctions.phoneOutput(mpesaPhoneNum)}.</strong> </p>
                              <p>Check your phone and enter your MPESA PIN to confirm the transaction. A confirmation message will be sent to your phone to confirm the transaction.</p>
  
                              
                              <button type="button" onClick={reloadComponent} className="btn btn-flex btn-100 btn-primary  w-100 font-size-16 text-uppercase my-3 "><i className="mdi mdi-check-bold ms-3 font-16px pr-2 d-none"></i>Close</button>
                          </div>
                      </div>
            </form>
            <div className="offcanvas-header d-flex flex-column boarder-top-canvas">

            {/* the send money buttons */}
                        {stkSent ? (
                               <>
                               
                               </>
                            ):(
                                <>
                                <div className="d-flex col-12 align-items justify-content-between">
                                 <button href="javascript: void(0);" disabled className="btn btn-outline-light waves-effect waves-light payment-prev"> <i className="mdi mdi-arrow-left ms-1"></i> Previous </button>
                                    {StdFunctions.amountIsGreaterThan(transactionFee,sendAmount)? (
                                        <button  className="btn btn-primary waves-effect waves-light payment-next">Next <i className="mdi mdi-arrow-right ms-1"></i></button>
                                        
                                            ) : (
                                        <button  disabled="true" className="btn btn-primary waves-effect waves-light payment-next">Next <i className="mdi mdi-arrow-right ms-1"></i></button>
                                    )}

                                    <button type="submit" href="javascript: void(0);" className="btn btn-primary btn-flex flex-grow-1 waves-effect waves-light text-center d-none">
                                    <div className="d-flex justify-content-center align-items-center"> <span>Send Money</span> <div className="flip-x"><i className="mdi mdi-reply flip-x ms-3 font-16px"></i></div></div>
                                    </button>
                                </div>
                                </>
                            )
                        }

          
            {/* end of send money buttos */}
                    <div className="col-12">
                        <div className="msg-holder-err w-100 pt-0 px-0">
                            <div class="alert alert-danger alert-dismissible fade d-none limit-msg"  role="alert">
                                <i class="mdi mdi-block-helper me-2"></i>
                                {errorMsg}
                                <button type="button" class="btn-close close-alert"></button>
                            </div>
                        </div>
                    </div>
                    

                        <div className="col-12 d-none">
                            <button disabled form="changeLimit2" className="btn-flex btn-set-limit btn-set-limit-sm w-100 btn btn-primary text-center flex-grow-1  justify-items-center align-items-center">
                                <div class="spinner-border text-white m-0 d-none animate__slideInDown" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Save Changes</span>
                            </button>
                        </div>

                    </div>
                       
                </div>

  
          
        </>
      );
}
export default SendMoney;
