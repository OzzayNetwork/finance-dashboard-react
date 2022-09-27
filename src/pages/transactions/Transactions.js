import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Transactions =()=> {
    const transactionsCountTwo=0

     // loader setting
     const [loading, setLoading] = useState(false);
     const [quote, setQuote] = useState({});

    const[boughtItemsQty,setBoughtItemsQty]=useState(0)
    const[transactionDetails,setTransactionDetails]=useState({})
    const[transactionProducts,setTransactionProducts]=useState([])
    const [transactionTackShop,settransactiontackShop]=useState("")
    const[transactionInstitution,setTransactionInstitution]=useState("")
    const[transactionFee,setTransactionFee]=useState("")
    const[transactionServiceCategory,setTransactionServiceCategory]=useState("")

    const [students, setstudents] = useState([])
    const [studentProfile, setStudentProfile] = useState({})

    //getting number of transactions per blinker
    const[transactionsCount,getTransactionsCount]=useState("")

    // this stores all the student transactions
    const [studentTransactions, setStudentTransactions] = useState([])

    //getting selected account pocket money id
    const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")

    const [firstStudent,setFirstStudent]=useState({})
    const [schoolName,setSchoolName]=useState("")
    const [myBlinkersCount,setMyBlinkersCount]=useState(0);

    //blinker index and blinker id
    const[clikedBlinkerId2,setClickedBlinkerId2]=useState(AuthService.getLogedInAssociates()[0].userId)
    const[clikedBlinkerIndex2,setClickedBlinkerIndex2]=useState(0)

    //transaction filtering states
    const[viewAllTransactions,setViewAllTransactions]=useState(true)
    const[viewSpendTransactions,setSpendTransactions]=useState(false)
    const[viewDepositTransactions,setViewDepositTransactions]=useState(false)
    const[areTransactionsEmpty,setAreTransactionsEmpty]=useState(false)
    const [loadTable,setLoadTable]=useState(true)

    //view transactions functions
    const viewAllFunc=()=>{
        setViewAllTransactions(true)
        setSpendTransactions(false)
        setViewDepositTransactions(false)
    }

    const viewSpendFunc=()=>{
        setViewAllTransactions(false)
        setSpendTransactions(true)
        setViewDepositTransactions(false)
    }

    const viewDepositFunc=()=>{
        setViewAllTransactions(false)
        setSpendTransactions(false)
        setViewDepositTransactions(true)
    }

    useEffect(()=>{
        const allBlinkers=AuthService.getLogedInAssociates()
        setFirstStudent(allBlinkers[0])
        setClickedBlinkerIndex2(0)
        setClickedBlinkerId2(AuthService.getLogedInAssociates()[0].userId)
    },[])

     useEffect(() => {
        console.log(clikedBlinkerIndex2)
        console.log("The clicked ID is "+clikedBlinkerId2)
        console.log(firstStudent)
        setLoading(true);


        $('.product-items').each(function(index) {
            const products = $(this).text()
           $(this).text(StdFunctions.removeFirstCharacter(products))
        });
        //function that removed the first character
       
        //const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"));
        const allBlinkers=AuthService.getLogedInAssociates()
        setstudents(allBlinkers)
        setFirstStudent(allBlinkers[clikedBlinkerIndex2])
        setMyBlinkersCount(allBlinkers.length)
        //console.log(allBlinkers[0])
        
        AuthService.getStudentDetails(clikedBlinkerId2).then((res)=>{
            if(res.status===200){
                console.log(res)
                setQuote(res);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);

                setStudentProfile(res.data.data.userProfile)
                
                //setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
                setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
                console.log("the blink wallet account Id is:"+blinkWalletAccountNum)
                //alert(blinkWalletAccountNum)
                console.log(studentProfile)
            }
            else{
               // alert("some error")
            }
           // alert("No error ocured")
            
        }).catch((err)=>{
            //alert("err when getting students")
            //setStudentProfile({})
            setClickedBlinkerId2("1300")
            setClickedBlinkerIndex2(0)
        })

        

        console.log("The transactions should appear down here as an object")

       
    },[clikedBlinkerId2])

    useEffect(()=>{
        setStudentTransactions([])
        setAreTransactionsEmpty(false)  
        setLoadTable(true)
        
        AuthService.getStudentTransactions(blinkWalletAccountNum,clikedBlinkerId2).then((res)=>{
            console.log("The transactions are")
            console.log(res) 
            if(res.status===200){
                if(viewAllTransactions===true){
                    setQuote(res);
                    
                    setStudentTransactions(res.data.data)
                    getTransactionsCount(res.data.length)

                    let arraySize=res.data.data.length

                    if(arraySize===0){
                        setAreTransactionsEmpty(true)
                    }
                    else{
                        setAreTransactionsEmpty(false)   
                    }
                    setLoadTable(false)
                }
                
                if(viewDepositTransactions===true){
                    console.log("The deposit transactions are")
                    //console.log(res.data.data)
                    console.log(res.data.data.filter(x=>x.transType==='Deposit'))
                    setStudentTransactions(res.data.data.filter(x=>x.transType==='Deposit'))
                    getTransactionsCount(res.data.data.filter(x=>x.transType==='Deposit').length)
                    let arraySize=res.data.data.filter(x=>x.transType==='Deposit').length

                    if(arraySize===0){
                        setAreTransactionsEmpty(true)
                    }
                    else{
                        setAreTransactionsEmpty(false)   
                    }
                    setLoadTable(false)
                }

                if(viewSpendTransactions===true){
                    console.log("Expenditure")
                    console.log(res.data.data.filter(x=>x.transType==='Merchant_Pay'))
                    let merchantPayTransactions=res.data.data.filter(x=>x.transType==='Merchant_Pay')
                    let Money_transfer=res.data.data.filter(x=>x.transType==='Money_transfer')
                    let AllExpenses= merchantPayTransactions.concat(Money_transfer);
                   

                    setStudentTransactions(AllExpenses)
                    getTransactionsCount(AllExpenses.length)

                    if(AllExpenses.length===0){
                        setAreTransactionsEmpty(true)
                    }
                    else{
                        setAreTransactionsEmpty(false)   
                    }
                    setLoadTable(false)
                }

                
                if(res.data.data.length!=0){
                    $('body .show-trans-cont').removeClass("d-none");
                    $('body .no-trans-cont').addClass("d-none")
                    $('.product-items').each(function(index) {
                        const products = $(this).text()
                    $(this).text(StdFunctions.removeFirstCharacter(products))
                    });
                }
                if(res.data.data.length===0){
                    $('body .show-trans-cont').addClass("d-none");
                    $('body .no-trans-cont').removeClass("d-none")
                }
            }
            else{
                alert("what just happened")
            }
            
        }).catch((err)=>{
            console.log(err)
            //alert("Error occured")
        })
    },[clikedBlinkerId2,viewAllTransactions,viewSpendTransactions,viewDepositTransactions])
    

    
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


    $('body').unbind().on('click','.nav-item .nav-link',function(){
        $(this).addClass('active').parent().siblings().children().removeClass('active')
     })
    

    

    console.log(students);
    const blinkerClicked=(studentId,clickedIndex)=>{
        setLoading(true);
        setClickedBlinkerId2(studentId)

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

            //clicke blinker wallet Id
            setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)

            console.log(studentProfile)

            //clicked blinker transactions
            AuthService.getStudentTransactions(blinkWalletAccountNum,AuthService.getLogedInAssociates()[clickedIndex].userId).then((res)=>{
                setQuote(res.data);
                setLoading(false);
                //setStudentProfile(res.data.data.userProfile)
            setStudentTransactions(res.data.data)
            // console.log("We are here for transactions")
            // console.log(res.data.data)
            // console.log("The transactions start here <br/>"+res.data.length)
            //alert(studentTransactions.length)
            
            if(res.data.data.length!=0){
                //alert("not zero")
                $('body .show-trans-cont').removeClass("d-none");
                $('body .no-trans-cont').addClass("d-none")
                $('.product-items').each(function(index) {
                    const products = $(this).text()
                   $(this).text(StdFunctions.removeFirstCharacter(products))
                });
            }
            if(res.data.data.length===0){
                //alert("it is a zero")
                $('body .show-trans-cont').addClass("d-none");
                $('body .no-trans-cont').removeClass("d-none")
            }

            

          

        }).catch((err)=>{
            console.log(err)
        })
        }).catch((err)=>{

        })
        $('.product-items').each(function(index) {
            const products = $(this).text()
           $(this).text(StdFunctions.removeFirstCharacter(products))
        });
        })
        // const returnedData= AuthService.getStudentDetails(studentId)
        // const GetSchoolName=returnedData.data.cardStatus
        
        $('.product-items').each(function(index) {
            const products = $(this).text()
           $(this).text(StdFunctions.removeFirstCharacter(products))
        });
       

    }

    //date formating
    let QuantityOfItems=0
    //getting transaction details
    const clickedTransaction=(transactionId,tuckShop,transactionFee,transactingInstitute,serviceCategory,clickedTransactionProducts)=>{
        

        //alert(transactionId)
        setTransactionDetails(studentTransactions.find(x=>x.transactionId===transactionId))
        setTransactionProducts(clickedTransactionProducts)
        settransactiontackShop(tuckShop)
        setTransactionInstitution(transactingInstitute)
        setTransactionServiceCategory(serviceCategory)
        setTransactionFee(transactionFee)

        console.log("the clicked transaction Produuct Items")
        console.log(transactionProducts)

       
            clickedTransactionProducts.map((productItem)=>{
           
            setBoughtItemsQty(QuantityOfItems+=productItem.units)
        })
        console.log("The total items are: "+QuantityOfItems)


    }

    const blinkerClicked2=(studentId,clickedIndex)=>{
        setClickedBlinkerId2(studentId)
        setClickedBlinkerIndex2(clickedIndex)
    }

    //clicked transactions products
    
    
    
   
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
        <title>Blink! | Transactions</title>
        </Helmet>    {/* the modals container */}
        <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row d-sm-none d-md-flex">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">Transactions For {firstStudent.firstName} </h4>

                    <div className="page-title-right d-sm-none d-md-flex">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                            <li className="breadcrumb-item active">{firstStudent.firstName} Transactions</li>
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
            <div className="col-12">
                <div className="card no-shadow-sm">
                    <div className="card-header pt-2 bg-white w-100 d-flex justify-content-between align-items-center w-100 border-bottom">
                        <div className="col-sm-12 w-100 col-md-6 col-lg-8 col-xl-5">
                        <div className="dropdown d-inline-block w-100 d-flex align-items-center">
                            <button type="button" className="btn header-item waves-effect align-items-center w-100  text-left d-flex p-0" id="blinkers-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="flex-shrink-0 me-3">
                                    <img className="rounded-circle d-none" src="assets/images/logo-files/blink-icon2.svg" alt="Generic placeholder image" height="65"/>
                                    <div className="avatar-sm mx-auto ">
                                        <span className="avatar-title rounded-circle bg-random font-size-18">
                                            {studentProfile.institution != undefined && firstStudent.firstName.charAt(0)+""+firstStudent.middleName.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex-grow-1 chat-user-box me-3">
                                    <h6 className="user-title m-0 font-size- text-black fw-medium">{firstStudent?.firstName+" "+firstStudent?.middleName}</h6>
                                    <p className="text-muted m-0 p-0 font-size-12">{firstStudent?.blinkId}</p>
                                </div>

                                
                                {StdFunctions.isBlinkersMore(students.length)?(
                                            <div className="d-flex   justify-content-center align-items-center">
                                                <span className="d-flex align-items-center"><small className="text-info mr-3 pe-2 d-sm-none d-md-flex">Select Blinker</small> <span class="badge rounded-pill bg-primary-blink float-end">+{students?.length-1} More</span><i className="mdi mdi-chevron-down  d-xl-inline-block me-0 font-21"></i></span>
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
                                        <div className="col-auto d-none">
                                            <a href="notifications.html" className="small" key="t-view-all"> View All</a>
                                        </div>
                                        
                                    </div>
                                </div>
                            
                                    {students.length> 1 && students.map((item, index)=>(
                                        <div  style={{ maxheight: "230px" }}>
                                            <a onClick={()=> blinkerClicked2(item.userId,index)}   className="d-flex px-3 pb-2 waves-effect dropdown-item">
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
                        </div>
                    </div>
                    <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom d-sm-none d-md-flex">

                    <div className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                        <div className="d-md-flex d-none align-items-center">
                            
                            <div class="btn-group select-tbl-filter" role="group" aria-label="Basic example">
                                <button onClick={viewAllFunc} type="button" class="btn active btn-outline-primary waves-light waves-effect d-flex align-items-center justify-content-center">View All</button>
                                <button onClick={viewDepositFunc} type="button" class="btn btn-outline-primary waves-light waves-effect d-flex align-items-center justify-content-center"><i className="mdi mdi-arrow-down-bold font-size-16"></i><span className="pl-1 d-none d-lg-inline d-md-inline">Money In</span></button>
                                <button onClick={viewSpendFunc} type="button" class="btn btn-outline-primary  waves-light waves-effect d-flex align-items-center justify-content-center"><i className="mdi mdi-arrow-up-bold font-size-16"></i> <span className="pl-1 d-none d-lg-inline d-md-inline">Expenses</span></button>
                            </div>

                        </div>
                        <div className="dataTables_filter d-none  px-3 flex-grow-1">
                            <label>
                                <input type="search" className="form-control form-control-sm emailSearch w-100" placeholder="Search through Records ..." aria-controls="datatable-buttons"/>
                            </label>
                        </div>
                        <div className="d-none">
                            <a href="property-new.html" type="button" className="btn btn-dark dropdown-toggle option-selector d-flex align-items-center justify-content-center">
                                <i className="bx bx-slider-alt  font-size-16"></i> <span className="pl-1 d-md-inline">Filter Table</span>
                            </a>
                        </div>


                    </div>
                    
                    </div>
                    <div className="card-body show-trans-cont min-h-90 px-sm-0 p-md-  pt-sm-0">
                        <div className="table-responsive  d-xs-none d-md-flex d-sm-none">

                            <table className="table border-light table-bordere table-borderles align-middle table-nowrap table-hover  contacts-table table-stripe " id="datatable-buttons">
                                <thead className="table-light text-capitalize">
                                    <tr className="table-dark">
                                        <th></th>
                                        <th>Transaction Ref</th>
                                        <th>Transaction Type</th>
                                        <th scope="col">Debited At</th>
                                        <th>Deposit from</th>
                                        <th scope="col">Items Bought</th>
                                        <th scope="col">Date</th>
                                        <th scope="col" className="text-right">Transaction Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    
                                    {studentTransactions?.length>0 && studentTransactions?.map((transaction,index)=>(
                                                        
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-xs me-0">
                                                        {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                            <span className="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                                                <i className="mdi mdi-arrow-up-bold"></i>
                                                            </span>
                                                        ):(
                                                            <span className="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                                                <i className="mdi mdi-arrow-down-bold"></i>
                                                                </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-capitalize text-nowrap fw-semibold cursor-pointer"  onClick={()=> clickedTransaction(transaction?.transactionId,transaction?.blinkMerchant.merchantName,transaction?.service.institution.commission,transaction?.service.institution.institutionName,transaction?.transType,transaction.productsSold)} data-bs-toggle="modal" data-bs-target="#transaction-details">{transaction.receiptNumber}</td>
                                            <td className="text-capitalize">
                                                
                                                {StdFunctions.areTheyThesame(transaction.transType,"Money_transfer")?(
                                                    <span>Cash Withdrawal</span>
                                                ):(
                                                    StdFunctions.removeUnderscore(transaction.transType)                                                                  
                                                )}
                                            </td>
                                            <td className="text-capitalize text-nowrap">
                                                {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                    <strong>-</strong>  
                                                ):(
                                                    transaction.blinkMerchant.merchantName                                                                   
                                                )}
                                            </td>
                                            <td className="text-capitalize text-nowrap">
                                                {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                    StdFunctions.phoneOutput(transaction.accountFrom)
                                                ):(
                                                    <strong>-</strong>                                                                  
                                                )}
                                            </td>
                                            <td className="text-capitalize text-nowrap">
                                                {StdFunctions.isArrayEmpty(transaction.productsSold.length)?(
                                                <strong>-</strong>
                                                ):(
                                                <span></span>
                                                )}
                                                <span className="product-items">                                    
                                                    {
                                                        transaction.productsSold.length> 0 && transaction.productsSold.map((product,index)=>(<span>,{product.productName} </span>)) 
                                                    }  
                                                </span>
                                                                                
                                            </td>
                                            <td className="text-capitalize text-nowrap">
                                                {
                                                    Moment(transaction.dateCreated).add(3, 'hours').calendar(null, {
                                                    sameElse: 'DD MMM YYYY  hh:mm A'
                                                })}
                                            </td>
                                            <td className="text-capitalize text-nowrap text-right fw-bold">
                                                {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                                        <h5 className="font-size-14 mb-1 text-success">{StdFunctions.kenyaCurrency(transaction.amount)}</h5>
                                                                        ):(
                                                                            <h5 className="font-size-14 mb-1 text-danger">{StdFunctions.kenyaCurrency(transaction.amount)}</h5>                                                                 
                                                                        )}
                                            </td>
                                        
                                            <td>
                                                <div className="d-flex justify-content-end">
                                                    <button type="button" className="btn btn-primary btn-sm waves-effect waves-light text-nowrap me-3" onClick={()=> clickedTransaction(transaction?.transactionId,transaction?.blinkMerchant.merchantName,transaction?.service.institution.commission,transaction?.service.institution.institutionName,transaction?.transType,transaction.productsSold)} data-bs-toggle="modal" data-bs-target="#transaction-details">View Details</button>
                                                    <button type="button" className="btn d-none btn-info btn-sm waves-effect waves-light text-nowrap me-3" data-bs-toggle="modal" data-bs-target=".receipting-modal">Items Bought</button>

                                                </div>
                                            </td>
                                        </tr>              
                                    ))}

                                    
                                
                                    
                                </tbody>
                                
                            </table>

                           
                        </div>

                        
                        {areTransactionsEmpty? (
                            <div className="card-body d-sm-none d-md-block px-5 d-flex flex-column justify-items-center align-items-center text-center">
                                <div className="p-5 py-0 pt-3">
                                    <img src="assets/images/filter-imgs/no-results.svg" className="img mb-4" alt="No search results" height="207px" />
                                </div>
                                <h4>No Results To Show</h4>
                                <p>We couldnt find what you are looking for, try changing the filters.</p>
                            </div>
                            ):(
                                <></>
                            )
                        }

                        

                        {loadTable? (
                                <div className="card-body d-sm-none d-md-block">
                                    <div className="row mb-3">
                                        <div className="col-1 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-2 circle-place-holder"></span>
                                            </p>
                                        </div>
                                        <div className="col-11 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-1 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-2 circle-place-holder"></span>
                                            </p>
                                        </div>
                                        <div className="col-11 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-1 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-2 circle-place-holder"></span>
                                            </p>
                                        </div>
                                        <div className="col-11 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-1 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-2 circle-place-holder"></span>
                                            </p>
                                        </div>
                                        <div className="col-11 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-1 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-2 circle-place-holder"></span>
                                            </p>
                                        </div>
                                        <div className="col-11 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-1 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-2 circle-place-holder"></span>
                                            </p>
                                        </div>
                                        <div className="col-11 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    
                                </div>
                                ):(
                                    <>
                                   
                                    </>
                                )
                            }
                        <div className="table-responsive d-md-none d-sm-flex flex-column">
                            <ul className=" align-items-center nav text-center fw-medium left border-bottom w-100 text-black transactions-navigation justify-content-between">
                                <div className="d-flex">
                                    <li className="nav-item">
                                        <span href="" onClick={viewAllFunc} className="nav-link text-black active" href="">All</span>
                                    </li>
                                    <li className="nav-item">
                                        <span href="" onClick={viewDepositFunc} className="nav-link text-black" href="">Money In</span>
                                    </li>
                                    <li className="nav-item">
                                        <span href="" onClick={viewSpendFunc} className="nav-link text-black" href="">Expenses</span>
                                    </li>
                                </div>
                                <div className="d-fle d-none">
                                    <button type="button" class="btn  btn-white waves-effect position-relative p-0 avatar-xs rounded-circle me-1">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-search-alt text-black font-16px"></i>
                                        </span>
                                    </button>

                                    <button type="button" class="btn btn-white waves-effect position-relative p-0 avatar-xs rounded-circle me-3">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-slider-alt text-black font-16px"></i>
                                        </span>
                                    </button>
                                    

                                   

                                </div>
                                
                            </ul>

                            <table className="table table-nowrap  align-middle mb-0 table-hover">
                                <thead className="table-light d-non">
                                    <tr>
                                        
                                        <th className="text-black text-capitalize" colspan="2">
                                            Transaction details
                                        </th>
                                        <th className="text-right text-capitalize text-black">
                                            <span>Amount & time</span>
                                        </th>
                                    </tr>
                                </thead>
                                
                                
                                <tbody>

                                {studentTransactions?.length>0 && studentTransactions?.map((transaction,index)=>(
                                    <tr onClick={()=> clickedTransaction(transaction?.transactionId,transaction?.blinkMerchant.merchantName,transaction?.service.institution.commission,transaction?.service.institution.institutionName,transaction?.transType,transaction.productsSold)} data-bs-toggle="modal" data-bs-target="#transaction-details" className="mouse-pointer">
                                        <th scope="row" className="px-sm-0 pl-sm-2">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-xs me-0">
                                                    
                                                    {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                        <span className="avatar-title rounded-circle bg-success bg-soft text-success font-size-18">
                                                            <i className="mdi mdi-arrow-up-bold"></i>
                                                        </span>
                                                    ):(
                                                        <span className="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-18">
                                                            <i className="mdi mdi-arrow-down-bold"></i>
                                                            </span>
                                                    )}
                                                </div>
                                                
                                            </div>
                                        </th>
                                        <td>
                                            <div  className="text-truncate text-black fw-medium text-capitalize product-items-trunc" >
                                                    {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                        StdFunctions.phoneOutput(transaction.accountFrom)
                                                    ):(
                                                        transaction.blinkMerchant.merchantName                                                              
                                                    )}
                                                    <span className="product-items" 
                                                    
                                                    >                                    
                                                        {
                                                            transaction.productsSold.length> 0 && transaction.productsSold.map((product,index)=>(<span>,{product.productName} </span>)) 
                                                        }  
                                                    </span>
                                                {/* {transaction.blinkMerchant.merchantName }<small>{" ("+transaction.service.institution.institutionName+")"}</small> */}
                                            </div>
                                            <p className="text-muted p-0 m-0 text-truncate  product-items-trunc">
                                                   {/* {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                                    <small className="d-none d-md-inline">Transaction Type: </small> 
                                                                ):(
                                                                    <small></small>                                                                  
                                                                )} */}
                                                                {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                                    
                                                                    <span className="text-muted text-capitalize">{StdFunctions.removeUnderscore(transaction.transType)}</span>
                                                                ):(
                                                                    <>
                                                                    {StdFunctions.areTheyThesame(transaction.transType,"Money_transfer")?(
                                                                        <span>Cash Withdrawal</span>
                                                                    ):(
                                                                        <span className="text-muted text-capitalize">{StdFunctions.removeUnderscore(transaction.transType)}</span>                                                                
                                                                    )}
                                                                    </>
                                                                                                                                  
                                                                )}
                                                
                                            </p>
                                        </td>
                                        <td className="text-right px-sm-0 text-capitalize pr-sm-2">

                                                    {StdFunctions.isDepositTransaction(transaction.transType)?(
                                                <h5 className="font-size-14 mb-1 text-success">{StdFunctions.kenyaCurrency(transaction.amount)}</h5>
                                                ):(
                                                    <h5 className="font-size-14 mb-1 text-danger">{StdFunctions.kenyaCurrency(transaction.amount)}</h5>                                                                 
                                                )}
                                            <div className="text-muted transaction-date">
                                            {
                                                Moment(transaction.dateCreated).add(3, 'hours').calendar(null, {
                                                sameElse: 'DD MMM YYYY  hh:mm A'
                                            })}
                                            </div>
                                        </td>                                                           
                                    </tr>
                                    
                                ))}
                                </tbody>
                            </table>

                            {/* loading place holder */}

                            {loadTable? (
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-2 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-1"></span>
                                            </p>
                                        </div>
                                        <div className="col-10 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-2 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-1"></span>
                                            </p>
                                        </div>
                                        <div className="col-10 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-3 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-2 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-1"></span>
                                            </p>
                                        </div>
                                        <div className="col-10 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-2 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-2 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-1"></span>
                                            </p>
                                        </div>
                                        <div className="col-10 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-5 me-2"></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-2 p-0 pe-2 pr-3">
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder avatar-title rounded-circle p-4 me-1"></span>
                                            </p>
                                        </div>
                                        <div className="col-10 p-0">
                                            <p class="card-text placeholder-glow d-flex flex-wrap h-100 align-items-center">
                                                <span class="placeholder col-7 me-2"></span>
                                                <span class="placeholder col-4"></span>
                                                <span class="placeholder col-4 me-2"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                ):(
                                    <>
                                   
                                    </>
                                )
                            }

                            
                            {/* show when there no resuts to display */}

                            {areTransactionsEmpty? (
                                <div className="card-body px-5 d-flex flex-column justify-items-center align-items-center text-center">
                                    <div className="p-5 py-0 pt-3">
                                        <img src="assets/images/filter-imgs/no-results.svg" className="img mb-4" alt="No search results" height="207px" />
                                    </div>
                                    <h4>No Results To Show</h4>
                                    <p>We couldnt find what you are looking for, try changing the filters.</p>
                                </div>
                                ):(
                                    <></>
                                )
                            }

                            

                        </div>
                    </div>

                    {/* show when there no resuts to display */}
                    
                    <div className="card-body no-trans-cont px-5 d-flex flex-column justify-items-center align-items-center text-center">
                        <div className="p-5 py-0">
                            <img src="assets/images/illustration-images/empty-transactions.svg" className="img mb-4"/>
                        </div>
                        <h4 className="fw-bold">No Transactions Yet</h4>
                        <p>No transactions have been registered with the student, you can start by sending them money first </p>
                        <a className="font-size-24px d-none" href="" data-bs-toggle="modal" data-bs-target="#walletTopUp">Send Money</a>
                        <a href="javascript: void(0);" data-bs-toggle="modal" data-bs-target="#walletTopUp" className="text-primary font-16">Send Money <span className="flip-x"><span ><i class="mdi mdi-arrow-right-thick"></i></span></span> </a>
                    </div>
                </div>
            </div>
            {/* <!-- end col --> */}
        </div>

        {/* <!-- end row --> */}
        </div>

        {/* transaction details modal */}
        <div className="modal fade" id="transaction-details" tabindex="-1" role="dialog" aria-bs-labelledby="exampleModalCenterTitle" aria-bs-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
              <div className="modal-dialog modal-dialog-centered modal-md text-center" role="document">
              <div className="modal-content">
                  <div className="modal-header d-none">
                      <span className="badge badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Send Money</span>
                  
                          
                      <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle close-modal" data-bs-dismiss="modal" aria-label="Close">
                          <span className="avatar-title bg-transparent text-reset font-18px">
                              <i className="bx bx-x"></i>
                          </span>
                      </button>
  
                  </div>
                  <div className="modal-body">
                      <div className="d-flex justify-content-between align-items-center">
                          <span className="badge  badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Transaction details</span>
                  
                          
                      <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle pull-right close-modal" data-bs-dismiss="modal" aria-label="Close">
                          <span className="avatar-title bg-transparent text-reset font-18px">
                              <i className="bx bx-x"></i>
                          </span>
                      </button>
                      </div>
  
                      <div className="payment-panel-parent">
                          <div className="">
                                <div className="flex-shrink-0 me-3 mt-4 mb-3">
                                    <div class="avatar-md mx-auto ">
                                        <span class="avatar-title rounded-circle bg-random font-size-24">
                                            {studentProfile.institution != undefined && studentProfile.firstName.charAt(0)+""+studentProfile.middleName.charAt(0)}
                                        </span>
                                    </div>
                                    <img className="rounded-circle avatar-sm d-none" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="65"/>
                                </div>
                                <h4 className="mb-0 text-uppercase">
                                {studentProfile.institution != undefined && studentProfile.firstName+" "+studentProfile.middleName}
                                </h4>
                                <p className="text-muted text-uppercase mb-2">{firstStudent?.blinkId}</p>
                                <span className="text-uppercase badge badge-soft-info">
                                    {StdFunctions.areTheyThesame(transactionServiceCategory,"Money_transfer")?(
                                        <>Cash Withdrawal</>
                                    ):(
                                        StdFunctions.removeUnderscore(transactionServiceCategory)                                                               
                                    )}
                                </span>
                                <h2 className=" text-uppercase mt-4 mb-1">
                                        {StdFunctions.isGoodsPurchase(transactionServiceCategory)?(
                                            <span className="">-{StdFunctions.kenyaCurrency(transactionDetails?.amount)}</span>
                                            
                                        ):(
                                            <span className="">{StdFunctions.kenyaCurrency(transactionDetails?.amount)}</span>
                                        )}
                                   
                                </h2>

                                    {StdFunctions.areTheyThesame(transactionServiceCategory,"Deposit")?(
                                        <p className="text-uppercase mb-4">Tranasction Fee <span className="fw-semibold">{StdFunctions.kenyaCurrency(transactionFee)}</span> </p>

                                    ):(
                                        <p className="text-uppercase mb-4">Tranasction Fee <span className="fw-semibold">{StdFunctions.kenyaCurrency(0.00)}</span> </p>
                                                          
                                    )}

                            </div>
                            <div className="px-4 mb-4 transactions-details-table text-left d-flex justify-items-center align-items-center w-100 px-sm-0">
                            
                                <div className="d-flex flex-column boarder-grey border-1 justify-content-center align-items-center w-100  p-3">
                                   
                                    <table className="table table-borderless mb-0 mt-0 table-sm single-receipt">
                                            {StdFunctions.isMerchantPay(transactionServiceCategory)?(
                                                <></>
                                            ):(
                                               <p className="mb-0 pb-0 mt-3"><blockquote className="text-center"><span className="text-muted">Transaction Ref</span> {transactionDetails?.receiptNumber}</blockquote></p>
                                                                                          
                                            )}

                                            {StdFunctions.isDepositTransaction(transactionDetails?.transType)?(
                                                <h4><blockquote className="text-center"><span className="text-muted text-uppercase">Received From:</span> <br className="d-sm-flex d-md-none"/> <span className="text-info">{ StdFunctions.phoneOutput(transactionDetails?.accountFrom)}</span></blockquote></h4>
                                            ):(
                                                  <></>                                        
                                            )}
                                            {StdFunctions.isMoneyTransfer(transactionDetails?.transType)?(
                                                <h4><blockquote className="text-center"><span className="text-muted text-uppercase">Received From:</span><br className="d-sm-flex d-md-none"/> <span className="text-info">{ StdFunctions.phoneOutput(transactionDetails?.accountFrom)}</span></blockquote></h4>
                                            ):(
                                                  <></>                                        
                                            )}
                                            <thead className="table-border">
                                                {StdFunctions.isMerchantPay(transactionServiceCategory)?(
                                                    <tr>
                                                    <th colspan="4" className="text-black text-uppercase pb-0 mb-0">
                                                        <blockquote className=""><span className="text-muted">Transaction Ref</span> {transactionDetails?.receiptNumber}</blockquote>
                                                    </th>
                                                </tr>
                                            ):(
                                                <></>
                                            )}

                                            {StdFunctions.isMerchantPay(transactionServiceCategory)?(
                                                <tr>
                                                    <th scope="col" colspan="2">Items</th>
                                                    <th scope="col" className="text-center">Qty</th>
                                                    <th className="text-right">Price</th>

                                                    <th scope="col" className="text-right">Total</th>
                                                </tr>  
                                            ):(
                                                <></>
                                            )}
                                            
                                        </thead>
                                        <tbody>
                                        {transactionProducts?.length>0 && StdFunctions.isMerchantPay(transactionServiceCategory)===true && transactionProducts.map((productItem,index)=>(
                                            <tr className="text-capitalize">
                                                <th scope="row">{index+1}.</th>
                                                <td>{productItem.productName}</td>
                                                <td className="text-center">{productItem.units}</td>
                                                <td className="text-right">{StdFunctions.kenyaCurrency(productItem.unitPrice)}</td>

                                                <td className="text-right">{StdFunctions.kenyaCurrency(productItem.unitPrice*productItem.units)}</td>
                                            </tr>
                                        ))}
                                            
                                           
                                            
                                        </tbody>
                                        {StdFunctions.isMerchantPay(transactionServiceCategory)?(
                                            <tfoot><tr><th colspan="2" className="pt-3 text-uppercase">Total</th><th className="text-center pt-3">{boughtItemsQty}</th><th colspan="2" className="text-right pt-3">{StdFunctions.kenyaCurrency(transactionDetails?.amount)}</th></tr></tfoot>
                                            
                                        ):(
                                            <></>
                                        )}
                                    </table>
                                </div>                                        
                            </div>
                            <div className="px-4 pt-3 mt-3 px-sm-0">
                                <div className="border-1px-solid bg-light px-4 py-3 mb-3 d-flex align-items-center justify-content-between border-15px">
                                    <div className="d-flex align-items-center">


                                    <div class="d-flex align-items-center">
                                            {StdFunctions.isGoodsPurchase(transactionServiceCategory)?(
                                                <div class="avatar-xs me-3">
                                                    <span class="avatar-title rounded-circle bg-danger text-white font-size-18">
                                                        <i class="mdi mdi-arrow-down-bold"></i>
                                                    </span>
                                                </div>                                                
                                            ):(
                                                <div class="avatar-xs me-3">
                                                    <span class="avatar-title rounded-circle bg-success text-white font-size-18">
                                                        <i class="mdi mdi-arrow-up-bold"></i>
                                                    </span>
                                                </div>
                                            )}
                                            
                                            </div>
                                            <div className="text-left">
                                                <h6 className="mb-0 text-capitalize">Receipted At <span className="fw-semibold">{transactionTackShop}</span>  
                                                <small> ({" "+transactionInstitution})</small></h6>
                                                <p className="mb-0 p-0 text-capitalize">
                                                {
                                                    Moment(transactionDetails?.dateCreated).add(3, 'hours').calendar(null, {
                                                    sameElse: 'DD MMM YYYY  hh:mm A'
                                                })}
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
export default Transactions;