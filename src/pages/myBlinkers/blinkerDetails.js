import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import BlockBlinker from "../../components/blockBlinker";
import AccountLimits from "../../components/AccountLimit.js";
import Moment from 'moment'
import {Link,useLocation,matchRoutes,useParams} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const BlinkerDetails =()=> {
    const transactionsCountTwo=0
    const { id } = useParams();
    const theNewStudentId=id
     // loader setting
     const [loading, setLoading] = useState(false);
     const [quote, setQuote] = useState({});
     const [selectedStudentId,setSelectedStudentId]=useState(theNewStudentId)
     
     const[isMobileBrowser,setIsMobileBrowser]=useState(StdFunctions.isMobileBrowser)

    const [students, setstudents] = useState([])
    const [studentProfile, setStudentProfile] = useState({})

    const [fetchedStudentDetails,setFetchedStudentDetails]=useState({})
    //Accounts states start here
    const [allBlinkAccounts,setAllBlinkAccounts]=useState([])
    const [numOfAccounts,setNumOfAccounts]=useState(0)
    const[selectedPocketMoneyId,setselectedPocketMoneyId]=useState("")
    
    const[theMonth,setTheMonth]=useState(Moment().startOf('month').format('MMMM, YYYY'))
    const[theWeek,setTheWeek]=useState(Moment().startOf('week').format('DD MMM YYYY')+"-"+Moment().endOf('week').format('DD MMM YYYY'))
    const[theDate,setTheDate]=useState(Moment().format('DD MMM YYYY'))
    
    const[weekStart,setWeeekStart]=useState(Moment().startOf('week').format('YYYY-MM-DD 00:00:00'))
    const[weekEnd,setWeeekEnd]=useState(Moment().endOf('week').format('YYYY-MM-DD 23:59:59'))
    
    const[monthStart,setMonthStart]=useState(Moment().startOf('month').format('YYYY-MM-DD 00:00:00'))
    const[monthEnd,setMonthEnd]=useState(Moment().endOf('month').format('YYYY-MM-DD 23:59:59'))

    const[last30DaysStart,setLast30DaysStart]=useState(Moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'))
    const[last30DaysEnd,setLast30DaysEnd]=useState(Moment().format('YYYY-MM-DD 23:59:59'))

    const[graphPeriodStart,setGraphPeriodStart]=useState(Moment().subtract(6, 'months').format('YYYY-MM-DD 00:00:00'))
    const[graphPeriodEnd,setGraphPeriodEnd]=useState(Moment().format('YYYY-MM-DD 23:59:59'))

    const[dateStart,setDateStart]=useState(Moment().format('YYYY-MM-DD 00:00:00'))
    const[dateEnd,setDateEnd]=useState(Moment().format('YYYY-MM-DD 23:59:59'))

    const[dailyUsage,setDailyUsage]=useState("0")
    const[weeklyUsage,setWeeklyUsage]=useState("0")
    const[monthlyUsage,setMonthlyUsage]=useState("0")
    const[last30Usage,setLast30Usage]=useState("0")
    const[graphUsage,setGraphUsage]=useState("0")

    const[dailyDep,setDailyDep]=useState("0")
    const[weeklyDep,setWeeklyDep]=useState("0")
    const[monthlyDep,setMonthlyDep]=useState("0")
    const[last30Dep,setLast30Dep]=useState("0")
    const[graphDep,setGraphDep]=useState("0")

    //editing information form hooks
    const[firstName,setFirstName]=useState("")
    const[midName,setMidName]=useState("")
    const[lastName,setLastName]=useState("")
    const[blinkerEmail,setBlinkerEmail]=useState("")
    const[blinkerPhone,setBlinkerPhone]=useState("")
    const[blinkerGender,setBlinkerGender]=useState("")
    const[blinkerUserName,setBlinkerUserName]=useState("")
    const[identificationType,setIdentificationType]=useState("")
    const[identificationNum,setIdentificationNum]=useState("")
    const[userType,setUserType]=useState("")
    const[formChanged,setFormChanged]=useState("false")

    const[submitClicked,setSubmitClicked]=useState(false)
    const[detailsChanged,setDetailsChanged]=useState(false)
    const[changingDetails,setChangingDetails]=useState("")
    const[guardianId,setGuardianId]=useState(JSON.parse(localStorage.getItem("parentId")))
    
    const [selectedStudentActiveStatus,setSelectedStudentActiveStatus]=useState(true)
    const[cardIsBlocked,setCardIsBlocked]=useState(false)


    






    //getting selected account pocket money id
    const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")
    const[cardBal,setCardBal]=useState("")

    const [firstStudent,setFirstStudent]=useState({})
    const [schoolName,setSchoolName]=useState("")
    const [myBlinkersCount,setMyBlinkersCount]=useState(0);
    const [hasBlinkers,setHasBlinkers]=useState(false)

    const idParams=useParams();
    console.log("The params are")
    console.log(JSON.stringify(idParams))
    
    
   

   

    useEffect(() => {
        //alert(guardianId)
        setDetailsChanged(false)
        console.log(selectedStudentId)
        //load before showiing data
        setLoading(true);
        //const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"));
        const allBlinkers=AuthService.getLogedInAssociates()
        setstudents(allBlinkers)
        setFirstStudent(allBlinkers[selectedStudentId])
        setMyBlinkersCount(allBlinkers.length)
        console.log(allBlinkers)
        setFormChanged(false)


        AuthService.getStudentDetails(selectedStudentId).then((res)=>{
            
              
            setStudentProfile(res.data.data.userProfile)

            setFirstName(res.data.data.userProfile.firstName)
            setMidName(res.data.data.userProfile.middleName)
            setLastName(res.data.data.userProfile.lastName)
            setBlinkerPhone(res.data.data.msisdn)
            setBlinkerEmail(res.data.data.email)
            setBlinkerGender(res.data.data.userProfile.gender)
            setBlinkerUserName(res.data.data.userName)
            setUserType(res.data.data.userProfile.userType)
            setIdentificationType(res.data.data.userProfile.identificationType)
            setIdentificationNum(res.data.data.userProfile.identificationNo)

            if(res.data.data.userProfile.gender==="Female")  {
                $('#radioFemale').prop('checked', true);
                $('#radioMale').prop('checked', false);
            }

            if(res.data.data.userProfile.gender==="Male")  {
                $('#radioFemale').prop('checked', false);
                $('#radioMale').prop('checked', true);
            }
            

            setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
            setCardBal(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').currentBalance)
            console.log("the blink wallet account Id is:"+blinkWalletAccountNum)
            //alert(blinkWalletAccountNum)
            setFetchedStudentDetails(res.data.data)
            console.log(res.data.data)
            setSchoolName(res.data.data.userProfile.institution.institutionName)
            //all other accounts
            setAllBlinkAccounts(res.data.data.userProfile.blinkaccounts)
            setNumOfAccounts(allBlinkAccounts.length)
            setselectedPocketMoneyId(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkAccountId)

            //alert(numOfAccounts)
            console.log("All accounts for first blinker are "+allBlinkAccounts)
            console.log(allBlinkAccounts)
            console.log(studentProfile)
            setLoading(false);

            if(res.data.data.status==="Disabled"){
                setSelectedStudentActiveStatus(false)
                setCardIsBlocked(true)
    
            }
            else{
                setSelectedStudentActiveStatus(true)
                setCardIsBlocked(false)
    
                
            }


        }).catch((err)=>{

        })
        
    },[selectedStudentId,detailsChanged])

    // Daily transactions
    useEffect(()=>{
        setDailyUsage("0")
        setDailyDep("0")
        
        let theAmounts=0 
        let deposit=0

        AuthService.getTransactionsByDate(selectedStudentId,dateStart,dateEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                    
                }

                if(transaction.transType==="Money_transfer"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                }
                setDailyUsage(theAmounts)
                
            })

            
        }).catch((err)=>{
            console.log(err)
            //alert("error")
            setDailyUsage("0")
            setDailyDep("0")
        })

    },[selectedStudentId,theDate])

    //weekly transactions
    useEffect(()=>{
        setWeeklyUsage("0")
        setWeeklyDep("0")
        let theAmounts=0 
        let depAmount=0
        AuthService.getTransactionsByDate(selectedStudentId,weekStart,weekEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                    
                }
                if(transaction.transType==="Money_transfer"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                }

                if(transaction.transType==="Deposit"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    depAmount+=parseFloat(transaction.amount)
                }

                setWeeklyUsage(theAmounts)
                setWeeklyDep(depAmount)
            })

            
        }).catch((err)=>{
            console.log(err)
            //alert("error")
            setWeeklyUsage(0)
        })


    },[theWeek,selectedStudentId])

    // monthly usage
    useEffect(()=>{
        setMonthlyUsage("0")
        setMonthlyDep("0")
        let theAmounts=0 
        let depAmount=0

        AuthService.getTransactionsByDate(selectedStudentId,monthStart,monthEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                    
                    
                }
                if(transaction.transType==="Money_transfer"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                }

                if(transaction.transType==="Deposit"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    depAmount+=parseFloat(transaction.amount)
                }

                setMonthlyUsage(theAmounts)
                setMonthlyDep(depAmount)
            })

            
        }).catch((err)=>{
            console.log(err)
            //alert("error")
            setMonthlyUsage("0")
            setMonthlyDep("0")
        })


        

    },[theMonth,selectedStudentId])

    //calculating averages
    useEffect(()=>{
        setLast30Usage("0")
        setLast30Dep("0")
        let theAmounts=0 
        let depAmount=0

        AuthService.getTransactionsByDate(selectedStudentId,last30DaysStart,last30DaysEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                    
                    
                }
                if(transaction.transType==="Money_transfer"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                }

                if(transaction.transType==="Deposit"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    depAmount+=parseFloat(transaction.amount)
                }

                

                setLast30Usage(theAmounts/30)
                setLast30Dep(depAmount/30)
                
                
            })

            
        }).catch((err)=>{
            console.log(err)
            //alert("error")
            setLast30Usage("0")
            setLast30Dep("0")
        })


        

    },[last30DaysEnd,last30DaysStart])

    //graph data

    useEffect(()=>{
        setGraphDep("0")
        setGraphUsage("0")
        let theAmounts=0 
        let depAmount=0

        AuthService.getTransactionsByDate(selectedStudentId,graphPeriodStart,graphPeriodEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                    
                    
                }
                if(transaction.transType==="Money_transfer"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                }

                if(transaction.transType==="Deposit"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    depAmount+=parseFloat(transaction.amount)
                }

                

                setGraphUsage(theAmounts)
                setGraphDep(depAmount)
                
                
            })

            
        }).catch((err)=>{
            console.log(err)
            //alert("error")
            setLast30Usage("0")
            setLast30Dep("0")
        })


        

    },[graphPeriodStart,graphPeriodEnd])

    
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

    const changeBlinkerDetails=async(event)=>{
        event.preventDefault()
        setSubmitClicked(true)

        let data={
            "firstName": firstName, 
            "middleName": midName, 
            "lastName": lastName,  
            "userName": blinkerUserName, 
            "gender": blinkerGender, 
            "email": blinkerEmail, 
            "userType": "Student", 
            "identificationType": identificationType,
            "msisdn": blinkerPhone, 
            "identificationNo": identificationNum,
            "blinkId":"",
            "userId":selectedStudentId
          }

          AuthService.editBlinkAccount(data).then((res)=>{
            console.log(res)
            if(res.status===200){
                setDetailsChanged(true)
                setSubmitClicked(false)
                setChangingDetails("Profile Details Updated")
                $('.edit-account .btn-close').click()

                $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
                $('#the-toast .toast-body').text("Account details Updated")
                
                setTimeout(() => {                  
                    $('#the-toast').addClass('animate__fadeOutDown')
                  }, 4000);  
                  setTimeout(() => {                  
                    $('#the-toast').removeClass('show')
                  }, 5000);

                //updating local storage associates
                AuthService.getStudentDetails(guardianId).then((res)=>{
                    if(res.status===200){
                        localStorage.setItem("guardianBlinkers", JSON.stringify(res.data.data.associates))
                    }
                })

            }
            else{
                setChangingDetails("Error, Try again later")
            }
          }).catch((err)=>{
            console.log(err)
            setSubmitClicked(false)
            setChangingDetails("Error, Try again later")
          })
    }

    const genderChange=async(event)=>{
        console.log(event.target.value); 
        setFormChanged(true)

        if(event.target.value==="Female")  {
            $('#radioFemale').prop('checked', true);
            $('#radioMale').prop('checked', false);
        }

        if(event.target.value==="Male")  {
            $('#radioMale').prop('checked', true);
            $('#radioFemale').prop('checked', false);
        }

        setBlinkerGender(event.target.value)
    }

    const changingFormCheck=async(event)=>{
        setFormChanged(true)
        //alert("form changed")
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
                    <p className="m-0 p-0 text-u">Please Wait</p>
                </div>
            </div>
            ):(
                <h1 className="d-none">Found</h1>
            )
        }

        <Helmet>
        <title>Blink! | {studentProfile.firstName+" "}Account Details</title>
        </Helmet>    {/* the modals container */}
        <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row d-sm-none d-md-flex">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">{studentProfile.firstName} Details</h4>

                    <div className="page-title-right d-sm-none d-md-flex">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                            <li className="breadcrumb-item"><Link to="/MyBlinkers">My blinkers</Link></li>
                            <li className="breadcrumb-item active">{studentProfile.firstName}</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>

        <div className="row d-sm-none d-md-none ">
            <div className="col-12">
                <h4 className="text-black pt-4 pb-3 p-3 border-bottom-1px fw-medium ">Transactions</h4>
            </div>
        </div>
        {/* <!-- end page title --> */}
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card">
                    <div className="card-body text-center align-items-center justify-content-center">

                        {/* profile picture */}
                            <div class=" mb-2 position-relative">
                                <button class="avatar-title d-none change-pic rounded-circle btn btn-info font-size-16">
                                    <i class="mdi-camera-outline mdi font-size-20 text-white"></i>
                                </button>
                                <img src="assets/images/users/avatar-1.jpg" class="avatar-md rounded-circle img-thumbnail d-none" alt=""/>
                                <div class="avatar-xl avatar-card mx-auto ">
                                    <span class="avatar-title rounded-circle bgrandom7 font-size-30 border-white text-uppercase">                                                
                                        {studentProfile?.institution != undefined && studentProfile.firstName.charAt(0)+""+studentProfile.middleName.charAt(0)}
                                    </span>
                                </div>
                            </div>
                        {/* end of profile picture */}

                        <div className="flex-grow-1">
                            <h5 className="font-size-14 mt-3 mb-0 text-capitalize">{studentProfile?.firstName+" "+studentProfile?.middleName+" "+studentProfile.lastName}</h5>
                            <small className="text-muted text-capitalize">{schoolName}</small>
                        </div>
                        <div>
                            <button className="btn btn-info waves-effect waves-light mt-3" data-bs-toggle="modal" data-bs-target=".edit-account">Edit Details</button>
                        </div>


                        <div className="mt-4">
                            <h1 className="mb-0 pb-0 text-black">{StdFunctions.kenyaCurrency(cardBal)}</h1>
                            <small className="text-muted text-capitalize text-black fw-semibold">Wallet balance.</small>
                            <h5 className="font-size-14 mt-3 mb-0 text-capitalize">Blink ID: <span className="text-black fw-semibold">{StdFunctions.creditCard2(blinkWalletAccountNum)}</span></h5>
                        </div>
                        

                        
                    </div>
                    <div className="col-12 bg-success bg-soft">
                        <div className="row text-left p-4">
                            <div className="col-6 border-right">
                                <div class="avatar-xs me-0 d-none">
                                    <span class="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                        <i class="mdi mdi-arrow-up-bold"></i>
                                    </span>
                                </div>
                                <p className="fw-semibold text-black mb-0">{StdFunctions.kenyaCurrency(last30Dep)}</p>
                                <small>Avg. Daily Deposits</small>
                            </div>

                            <div className="col-6">
                                <p className="fw-semibold text-black mb-0">{StdFunctions.kenyaCurrency(last30Usage)}</p>
                                <small>Avg. Monthly Usage</small>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        <p className="mb-0">Was registered on  
                            { " "+Moment(fetchedStudentDetails.dateCreated).add(3, 'hours').calendar(null, {sameElse: 'DD MMM YYYY  hh:mm A' })}
                        </p>
                    </div>
                    <div className="px-3 pb-3">
                       
                        {StdFunctions.areTheyThesame(blinkerEmail,"") ? (
                                    <></>
                                ):(
                                    <p className="mb-0 d-flex align-items-center text-primary">
                                        <i class="mdi mdi-email-outline mr-2 font-18px"></i><span className="px-2">{blinkerEmail}</span>
                                    </p>
                                )
                            }

                            {StdFunctions.areTheyThesame(blinkerPhone,"") ? (
                                    <></>
                                ):(
                                    <p className={`mb-0 align-items-center text-primary ${StdFunctions.areTheyThesame(blinkerPhone,"") ? "d-none" : "d-flex"}`}  className="">
                                        <i class="mdi mdi-phone mr-2 font-18px"></i><span className="px-2">{blinkerPhone}</span>
                                    </p>
                                )
                            }
                    </div>
                   
                    
                    <div className="card-header bg-white border-top">
                        <h6 className="text-uppercase mb-3">Account Options</h6>

                        <a className="d-sm-none waves-effect d-md-flex align-items-center py-2 mouse-pointer changeLimitLink" data-bs-toggle="modal" data-bs-target=".account-limit-modal">
                            <span className="mdi mdi-calendar-alert me-2 font-24px "></span>
                            <span className="flex-grow-1"> Change Expenditure Limit</span>
                            <span class="d-flex align-items-center change-icon">
                                <i class="bx bx-chevron-right font-size-30 text-primary"></i>
                            </span>
                        </a>

                        <a className="align-items-center waves-effect py-2 mouse-pointer changeLimitLink d-md-none d-sm-flex" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-limits" aria-controls="offcanvasBottom">
                            <span className="mdi mdi-calendar-alert me-2 font-24px "></span>
                            <span className="flex-grow-1"> Change Expenditure Limit</span>
                            <span class="d-flex align-items-center change-icon">
                                <i class="bx bx-chevron-right font-size-30 text-primary"></i>
                            </span>
                        </a>

                        <a className="d-fle d-none align-items-center waves-effect py-2">
                            <span className="mdi-comment-alert-outline mdi me-2 font-24px "></span>
                            <span className="flex-grow-1"> Notification Level</span>
                            <span class="d-flex align-items-center change-icon">
                                <i class="bx bx-chevron-right font-size-30 text-primary"></i>
                            </span>
                        </a>

                        

                        <a data-bs-toggle="modal" data-bs-target=".account-block-modal"  className={`d-flex waves-effect mouse-pointer align-items-center py-2   ${cardIsBlocked ? "text-primary" : "text-danger"}`} >
                            
                            {cardIsBlocked?
                            ( <><span className="mdi mdi-key-variant me-2 font-24px "></span><span className="flex-grow-1"> Unblock {studentProfile?.firstName}</span></>):
                            ( <><span className="mdi mdi-cancel me-2 font-24px "></span><span className="flex-grow-1"> Block {studentProfile?.firstName}</span></>)}
                           
                            <span class="d-flex align-items-center change-icon">
                                <i className={`bx bx-chevron-right font-size-30  ${cardIsBlocked ? "text-primary" : "text-danger"}`} ></i>
                            </span>
                        </a>

                        <a data-bs-toggle="modal" data-bs-target=".account-block-moda" className={`d-fle waves-effect d-none mouse-pointer align-items-center py-2  ${cardIsBlocked ? "text-info" : "text-danger"}`} >
                            <span className="mdi mdi-cancel me-2 font-24px "></span>
                            {cardIsBlocked?
                            ( <><span className="mdi mdi-key-variant me-2 font-24px "></span><span className="flex-grow-1"> Unblock {studentProfile?.firstName}</span></>):
                            ( <><span className="mdi mdi-cancel me-2 font-24px "></span><span className="flex-grow-1"> Block {studentProfile?.firstName}</span></>)}
                            <span class="d-flex align-items-center change-icon">
                                <input type="checkbox" id="switch3" switch="bool" checked />
                                <label for="switch3" data-on-label="Yes" data-off-label="No"></label>
                            </span>
                        </a>

                    </div>
                </div>
            </div>
            {/* <!-- end col --> */}
            <div className="col-sm-12 col-md-6 col-lg-8">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center w-100 border-bottom p-3">
                            <div class="d-flex w-100">
                                <div class="d-flex align-items-center justify-content-between w-100 ">
                                    <h4 class="card-title mb-0 me-3">This Month's Summary</h4>
                                    <div className="d-fle d-none justify-content-end align-items-center">

                                        <button type="button" className="btn me-3 btn-flex flex-grow-1 btn-flex btn-outline-primary no-wrap btn-sm  waves-effect btn-label waves-light">
                                            <i className="mdi mdi-calendar-question label-icon"></i> Custom Date
                                        </button>

                                        <div class="input-group input-group-sm">
                                            <select class="form-select form-select-sm">
                                                <option value="JA" selected="">Jan</option>
                                                <option value="DE">Dec</option>
                                                <option value="NO">Nov</option>
                                                <option value="OC">Oct</option>
                                            </select>
                                            <label class="input-group-text">Month</label>
                                        </div>
                                       
                                    </div>
                                       
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="card-header bg-white border-bottom p-3">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-4 py-2">
                                        <div className="border border-grey p-3 rounded ">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="avatar-xs me-3">
                                                    <span className="avatar-title rounded-circle bg-warning bg-soft text-warning font-size-18">
                                                        <i className="mdi mdi-calendar-today"></i>
                                                    </span>
                                                </div>
                                                <h5 className="font-size-14 mb-0">Today's Expenditure</h5>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="text-muted mt-3">
                                                        <p>{theDate}</p>
                                                        <h4>{StdFunctions.kenyaCurrency(dailyUsage)}</h4>
                                                        <p className="mb-0 text-uppercase">
                                                            <span className="badge rounded-pill bg-success">
                                                                <i className="mdi mdi-arrow-up-bold pe-1"></i>{StdFunctions.kenyaCurrency(dailyDep)} DEPOSIT
                                                            </span>
                                                        </p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-4 py-2">
                                        <div className="border border-grey p-3 rounded ">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="avatar-xs me-3">
                                                    <span className="avatar-title rounded-circle bg-info bg-soft text-info font-size-18">
                                                        <i className="mdi mdi-calendar-range"></i>
                                                    </span>
                                                </div>
                                                <h5 className="font-size-14 mb-0">Weekly Expenditure</h5>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="text-muted mt-3">
                                                        <p>{theWeek}</p>
                                                        <h4>{StdFunctions.kenyaCurrency(weeklyUsage)}</h4>
                                                        <p className="mb-0 text-uppercase">
                                                            <span className="badge rounded-pill bg-success">
                                                                <i className="mdi mdi-arrow-up-bold pe-1"></i>{StdFunctions.kenyaCurrency(weeklyDep)} DEPOSIT
                                                            </span>
                                                        </p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-4 py-2">
                                        <div className="border border-grey p-3 rounded ">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="avatar-xs me-3">
                                                    <span className="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                                        <i className="mdi mdi-calendar-month"></i>
                                                    </span>
                                                </div>
                                                <h5 className="font-size-14 mb-0 text-capitalize">This month</h5>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="text-muted mt-3">
                                                        <p>{theMonth}</p>
                                                        <h4>{StdFunctions.kenyaCurrency(monthlyUsage)}</h4>
                                                        <p className="mb-0 text-uppercase">
                                                            <span className="badge rounded-pill bg-success">
                                                                <i className="mdi mdi-arrow-up-bold pe-1"></i>{StdFunctions.kenyaCurrency(monthlyDep)} DEPOSIT
                                                            </span>
                                                        </p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                                                       
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-12 py-2">
                                        <div className="p-0 rounded ">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="d-flex flex-column">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="avatar-xs me-3">
                                                            <span className="avatar-title rounded-circle bg-dark bg-soft text-black font-size-18">
                                                                <i className="mdi mdi-chart-line-variant"></i>
                                                            </span>
                                                        </div>
                                                        <h5 className="font-size-14 mb-0 text-capitalize">Last six Months Overview</h5>
                                                    </div>

                                                    <div className="mb-0 text-muted">
                                                        <p className="mb-0 pb-0">Amount Spent</p>
                                                        <h4>{StdFunctions.kenyaCurrency(graphUsage)}</h4>
                                                        <div><span className="badge badge-soft-success font-size-12 me-1"> {StdFunctions.kenyaCurrency(graphDep)} </span> Deposits</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="d-none">graph comes here</div>
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

        {/* <!-- end row --> */}
        </div>

        {/* edit account details modal */}
        

        <div className="modal fade edit-account" tabindex="-1" role="dialog" aria-hidden="true">
            <div className={`modal-dialog  ${StdFunctions.isMobilePhone() ? "modal-fullscreen" : "modal-dialog-centered"}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit The Blinker Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                       <form onSubmit={changeBlinkerDetails}   id="edit-blinker">
                           <div className="row" onChange={changingFormCheck}>
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input className="form-control" pattern="[A-Za-z]{2,}" required value={firstName} onChange={(event)=>setFirstName(event.target.value)} type="text" placeholder="First Name" />
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label>Middle Name</label>
                                        <input className="form-control" pattern="[A-Za-z]{2,}" required value={midName} onChange={(event)=>setMidName(event.target.value)} type="text" placeholder="First Name" />
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input className="form-control" pattern="[A-Za-z]{2,}" required value={lastName} onChange={(event)=>setLastName(event.target.value)} type="text" placeholder="First Name" />
                                    </div>
                                </div>

                                <div class="col-12 mb-3">
                                    <div class="mt-4">
                                        <h5 class="font-size-14 mb-1">Binker's Gender</h5>
                                    <div onChange={genderChange} className="d-flex">
                                            <div class="form-check mb-3 me-3">
                                                <input class="form-check-input" value="Male" type="radio" name="blinkerGender" id="radioMale" />
                                                <label class="form-check-label" for="radioMale">
                                                    Male
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input"  value="Female" type="radio" name="blinkerGender" id="radioFemale" />
                                                <label class="form-check-label" for="radioFemale">
                                                    Female
                                                </label>
                                            </div>
                                    </div>
                                    </div>
                                </div>

                                <div className="col-12 mb-3 d-none">
                                    <div className="form-group">
                                        <label>Phone No.</label>
                                        <input className="form-control" value={blinkerPhone}  onChange={(event)=>setBlinkerPhone(event.target.value)} type="text" placeholder="Enter Phone No." />
                                    </div>
                                </div>

                                <div className="col-12 mb-3 d-none">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input className="form-control" value={blinkerEmail}  onChange={(event)=>setBlinkerEmail(event.target.value)} type="text" placeholder="email@email.com" />
                                    </div>
                                </div>
                           </div>
                       </form>
                    </div>
                    <div className="modal-footer">

                        {formChanged ?
                         <>
                            {submitClicked ? 
                            <>
                                <button disabled="true" type="submit" form="edit-blinker"   className="btn-flex btn-secondary opacity-50 w-100 waves-effect  btn text-center justify-items-center align-items-center btn-block-card-close">
                                    <div class="spinner-border text-white m-0 me-2" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span className="">Save Changes</span>
                                </button>
                            </> 
                            : 
                            <>
                                <button type="submit" form="edit-blinker"   className="btn-flex btn-primary w-100 waves-effect  btn text-center justify-items-center align-items-center btn-block-card-close">
                                    <div class="spinner-border d-none text-white m-0 me-2" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span className="">Save Changes</span>
                                </button>
                            </>
                            }
                        </> 
                        :
                        <>
                            <button disabled="true" type="submit" form="edit-blinker"   className="btn-flex btn-secondary opacity-50 w-100 waves-effect  btn text-center justify-items-center align-items-center btn-block-card-close">
                                <div class="spinner-border text-white m-0 me-2 d-none" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span className="">Save Changes</span>
                            </button>
                        </>
                        }


                    </div>
                    
                </div>
            </div>
        </div>
        <BlockBlinker/>
        <AccountLimits/>

        </>
    );
}
export default BlinkerDetails;