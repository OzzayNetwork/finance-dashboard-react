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

        event.preventDefault(); 
        let data = {
            
            TransactionType:"CustomerPayBillOnline",
            PayBillNumber:"175555",
            Amount:sendAmount,
            PhoneNumber:mpesaPhoneNum,
            CheckoutPhoneNumber:mpesaPhoneNum,
            AccountReference:activeAccount,
            TransactionDesc:"Topping up to "+StdFunctions.removeUnderscore(sendAccountName),
            userProfileId:StdFunctions.parentId,
            userId:StdFunctions.parentId,
            transactionServiceId:1,
            merchantId:1
          };
          let theStatus="Pending"
         
          AuthService.sendStkPush(data).then((res)=>{
            console.log(res.data)
            if(res.data.statusCode===200){
                $('#walletTopUp .modal-footer').addClass('d-none');
                $('#walletTopUp .close-modal').addClass('d-none');
                $('.stk-timer-container').removeClass('d-none').siblings().addClass('d-none');
                $(".stk-sent-msg").removeClass("d-none")
                setStkMsg(res.data.statusDescription)
                setSendMoneytransactionId(res.data.data.transactionId)
                $('#login-msg').addClass('d-none');

                let SendMonyeTrsansactionId=res.data.data.transactionId
                //setTransactionStatus(AuthService.fetchTransactionByTransactionId(SendMonyeTrsansactionId).data.transactionStatus)
                setTransactionStatus(res.data.data.paymentStatus)
                //alert(SendMonyeTrsansactionId)
                //alert(res.data.data.paymentStatus)
                var paymentTransactionStatus=res.data.data.paymentStatus
                

                console.log("Call back details")
                console.log(sendMoneyCallback)

                //getting the transaction ID


                //checking if transaction was succesful
                //console.log("transactionStatus: "+res.data.data.transactionId)
                //console.log(AuthService.fetchTransactionByTransactionId(res.data.data.transactionId).data.statusDescription)

                var paymentTimeOut=60
                var getPaymentStatus=setInterval(function(){
                //const theStatus=AuthService.fetchTransactionByTransactionId(sendMoneytransactionId)

                    if(paymentTimeOut<=0){
                        clearInterval(getPaymentStatus);
                        
                        //const paymentstatus=res.data.data.paymentCallBackStatus

                        setSendMoneyCallBack(AuthService.getTransactionById(SendMonyeTrsansactionId).data.transactionStatus)
                        //alert(sendMoneyCallback)
                        console.log("we are at the two minute mark")
                    }
                    else{
                        //alert(transactionStatus)
                        console.log("The transaction status at every 10 seconds "+transactionStatus)
                        paymentTimeOut -= 10;
                    }
                    console.log(paymentTimeOut)
                },10000)
                

                
                
                var timeleft = 30;
                var downloadTimer = setInterval(function () {
                    if (timeleft <= 0) {
                        clearInterval(downloadTimer);
                        //alert("You took to long to confirm the transaction, click send money to retry or ");
                        seterrorMsg("You took to long to confirm the transaction, click send money to Resend the Payment request or check the phone number if its correct")
                        $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all')
                        $(".stk-sent-msg").addClass("d-none")
                        $(".stk-timer").text("0 s");
                        $('.btn-send').prop('disabled', false);
                        $('#walletTopUp .close-modal').removeClass('d-none');
        
                        $('#walletTopUp .modal-footer').removeClass('d-none');
                        $('.stk-timer-container').addClass('d-none').siblings().removeClass('d-none');
                        $('.btn-send').prop('disabled', false);
                    }
        
                    $(".stk-timer").text(timeleft + " s");
                        
                        if(timeleft>=20){
                            //alert("we are at 20")
                            
                            theStatus=res.data.data.paymentCallBackStatus
                            //theStatus
                            
                            
                        }
                        if(timeleft<20){
                            setTransactionStatus("Successful")
                            //theStatus="Successful"
                        }

                        if(theStatus==="Successful"){
                           console.log("The transaction went through: ")
                           $(".payment-panel").addClass('d-none').siblings('.sent-success').removeClass('d-none')
                           
                           blinkaudio.play()
                           
                           blinkaudio.currentTime = 0;
                           const playAudio=setTimeout(function() { blinkaudio.pause(); }, 1000);
                           //clearInterval(playAudio);
                           

                        }

                        if(theStatus!="Successful"){
                            timeleft -= 1;
                            console.log("checking the transactionstatus: the status at "+timeleft+" is "+transactionStatus)
                        }

                        //setTransactionStatus(res.data.data.paymentCallBackStatus)
                        //setTransactionStatus("True")
                       
                    }, 1000);

            }
            else{
                seterrorMsg("An unexpected error, try again later.")
                $('#login-msg').show().addClass('show').addClass('alert-danger').removeClass('d-none').removeClass('alert-success').children('i').addClass('mdi-block-helper').removeClass('mdi-check-all')

            }
          })

        
        console.log("Amount sending is KES:"+sendAmount)
        //alert(sendAmount)
        //alert(mpesaPhoneNum)
       
    }
    const reloadPage=(event)=>{
        //window.location.reload(false);
    }



    return (
        <>
          <Helmet>
            <title>Blink! | Digital Wallet for Students</title>
          </Helmet>
          <div className="modal fade" id="walletTopUp" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalCenterTitle" aria-bs-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
              <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                  <div className="modal-header d-none">
                      <span className="badge badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Send Money</span>
                  
                          
                      <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle close-modal" data-bs-dismiss="modal" aria-label="Close">
                          <span className="avatar-title bg-transparent text-reset font-18px">
                              <i className="bx bx-x"></i>
                          </span>
                      </button>
  
                  </div>
                  <form className="modal-body" id="payment-form" onSubmit={sendMoneyStart}>
                      <div className="d-flex justify-content-between align-items-center">
                          <span className="badge  badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Send Money</span>
                  
                          
                      <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle pull-right close-modal" data-bs-dismiss="modal" aria-label="Close">
                          <span className="avatar-title bg-transparent text-reset font-18px">
                              <i className="bx bx-x"></i>
                          </span>
                      </button>
                      </div>
  
                      <div className="payment-panel-parent">
                          <div className="recepient-account payment-panel payment-active-panel">
                              <h4 className="text-capitalize">Recepient, Blink account & Amount </h4>
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
                                              <h6 className="user-title m-0">{studentProfile.institution != undefined && studentProfile.firstName+" "+studentProfile.middleName}</h6>
                                              <p className="text-muted m-0 p-0">{studentProfile.institution != undefined && studentProfile.institution.institutionName}</p>
                                          </div>
                                            {StdFunctions.isBlinkersMore(students.length)?(
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <span className="d-flex align-items-center"><small className="text-info mr-3">Click to change</small> <i className="mdi mdi-chevron-down  d-xl-inline-block me-3 font-21"></i></span>
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
                                      <input type="number" className="form-control font-21 text-info form-control-lg" id="amount-input" placeholder="Enter Name" required ="true" onChange={(event)=>setSendAmount(event.target.value)} name="SendAMount"/>
                                      <label for="floatingnameInput">KES</label>
                                  </div>
                                  
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
                                                      <p className="m-0 p-0 text-uppercase">Mobile Money</p>                                                
                                                      <p className="mb-0 p-0"> <small>Eg Mpesa, Airtel Money, MTN ...</small></p>
                                                  </div>
                                              </button>
                                          </h2>
                                          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                              <div className="accordion-body">
                                                  <div>
                                                      <p>
                                                          A payment request of <strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}</strong> plus <strong className="text-black">KES 50 as transaction</strong> fee will be sent to the MPESA number you enter below.
                                                      </p>
                                                  </div>
                                                  <div className="form-group">
                                                      <label for="">Your MPESA Phone Number</label>
                                                      <div className="form-floating mb-3">
                                                          <input type="text" className="form-control font-21 text-success form-control-lg" id="phone-input" value={mpesaPhoneNum} onChange={(event)=>setMpesaPhoneNum(event.target.value)} name="phoneNum" placeholder="Enter your phone No."/>
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
                                                      <p><strong className="text-black">KSH 250</strong> plus <strong className="text-black">KES 50 as transaction fee</strong> will be deducted from your Guardian Blink Wallet and the amount will be credited to <strong className="text-black">Alex's Blink Wallet Account.</strong></p>
                                              
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
                                      <div className="col-lg-6">
                                          <div className="text-muted ">
                                              Recepient                                            
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black text-uppercase">
                                          {firstStudent?.firstName+" "+firstStudent?.middleName}                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4">
                                              Blink Account                                           
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.removeUnderscore(sendAccountName)}                                        
                                          </div>
                                      </div>

                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4">
                                              Account No.                                           
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.removeUnderscore(activeAccount)}                                        
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4">
                                              Being Debited from                                           
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              MPESA                                        
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4">
                                              Amount Being sent                                           
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              {StdFunctions.kenyaCurrency(sendAmount)}                                      
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4">
                                              Transaction Fee                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              KES 0.00                                        
                                          </div>
                                      </div>
                                      <div className="col-12 text-black"><hr className="mb-0 pb-0"/></div>
  
                                      <div className="col-lg-6 text-uppercase">
                                          <div className="text-muted mt-4 font-21">
                                              Total                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end text-uppercase">
                                          <div className=" text-right text-black font-21 fw-bold">
                                          {StdFunctions.kenyaCurrency(sendAmount)}                                         
                                          </div>
                                      </div>
                                  </div>
  
                                  <div className="mpesa-confirmation ">
                                      <p className="text-muted mt-4">A payment request of <strong className="text-black">{StdFunctions.kenyaCurrency(sendAmount)}  </strong> will be sent to your <strong className="text-black">phone number ({mpesaPhoneNum})</strong> soon after you click the <strong className="text-black text-capitalize">Send Money</strong> button bellow. 
                                          <br/>
                                          <br/>
                                          Remember to <strong className="text-black">Check your phone</strong> to confirm payment by entering your Mpesa pin.</p>
                                          <div class="alert alert-danger alert-dismissible fade d-none" id="login-msg" role="alert">
                                                <i class="mdi mdi-block-helper me-2"></i>
                                                {errorMsg}
                                                <button type="button" class="btn-close close-alert"></button>
                                            </div>
                                          
                                          {StdFunctions.isValidPhoneNum(mpesaPhoneNum)? (
                                                <button type="submit" form="payment-form" className="btn btn-primary btn-flex flex-grow-1 btn-send waves-effect  waves-light text-center w-100">
                                                    <div className="d-flex justify-content-center align-items-center"> 
                                                        <div className="stk-timer-container d-none justify-content-center align-items-center">
                                                            <span className="mdi mdi-timer-outline font-16px"></span>
                                                            <span className="stk-timer px-2"></span>
                                                        </div>
                                                        <div className="justify-content-center align-items-center d-flex">
                                                            <span className="px-2">Send Money</span> 
                                                            <div className="flip-x"><i className="mdi mdi-reply ms-3 font-16px"></i></div>
                                                        </div>
        
                                                    </div>
                                                </button>                                       
                                            ) : (
                                                <button disabled="true" type="submit" className="btn btn-primary btn-flex flex-grow-1 waves-effect btn-send waves-light text-center w-100">
                                                    <div className="d-flex justify-content-center align-items-center"> 
                                                        <div className="stk-timer-container d-none justify-content-center align-items-center">
                                                            <span className="mdi mdi-timer-outline font-16px"></span>
                                                            <span className="stk-timer px-2"></span>
                                                        </div>
                                                        <div className="justify-content-center align-items-center d-flex">
                                                            <span className="px-2">Send Money</span> 
                                                            <div className="flip-x"><i className="mdi mdi-reply ms-3 font-16px"></i></div>
                                                        </div>
        
                                                    </div>
                                             </button>
                                    )}
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
                          <div className="text-center d-flex flex-column justify-content-around align-items-center sent-success d-none payment-panel">
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
  
                                      <div className="col-lg-6">
                                          <div className="text-muted mt-4 text-left">
                                              Transaction Fee                                          
                                          </div>
                                      </div>
  
                                      <div className="col-lg-6 align-self-end">
                                          <div className=" text-right text-black">
                                              KES 0.00                                        
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
                      </div>
                      
                  </form>
                  <div className="modal-footer d-flex">
                      <button href="javascript: void(0);" disabled className="btn btn-outline-light waves-effect waves-light payment-prev"> <i className="mdi mdi-arrow-left ms-1"></i> Previouse </button>
                        {StdFunctions.isGreaterThanZero(sendAmount)? (
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
          
  
          
        </>
      );
}
export default SendMoney;
