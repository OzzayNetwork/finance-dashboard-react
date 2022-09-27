import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";


import $ from 'jquery';
// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Home=()=>{

    // loader setting
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});
    const [dailyCardLimit, setDailyCardLimit] = useState("");
    const [newDailyCardLimit, setNewDailyCardLimit] = useState("");
    const[selectedPocketMoneyId,setselectedPocketMoneyId]=useState("")
    const [errorMsg, seterrorMsg]=useState("");
    const [blockTitle,setBlockTitle]=useState("")
    const [blockMsg,setBlockMsg]=useState("")
    const [blockErrMsg,setBlockErrMsg]=useState("")
    const [blockImg,setBlockImg]=useState("")
    const[cardIsBlocked,setCardIsBlocked]=useState(false)
    const[alllimits,setAlllimits]=useState([])
    const[isDailyLimitSet,setIsDailyLimitSet]=useState(false)
    const [fetchedStudentDetails,setFetchedStudentDetails]=useState({})
    const[statusUpdate,setStatusUpdate]=useState("")

    //const[isLimitSet,setIsLimitSet]=useState(false)

    const [selectedStudentActiveStatus,setSelectedStudentActiveStatus]=useState(true)

    const [students, setstudents] = useState([])
    const [studentProfile, setStudentProfile] = useState({})
    const [dateToday,setDateToday]=useState("")
    const [dateYesterday,setDateYesterday]=useState("")
    const [selectedStudentId,setSelectedStudentId]=useState("")
    const parentFName=localStorage.getItem("parentUserFName")
    const[todaysExpenditure,setTodaysExpenditure]=useState(0)
    const[yesterdaysExpenditure,setYesterdaysExpenditure]=useState("")
    const[todaysTransactions,setTodaysTransactions]=useState({})
    let theAmounts=0

    let theAmountsYesterday=0

    // this stores all the student transactions
    const [studentTransactions, setStudentTransactions] = useState([])

    //getting number of transactions per blinker
    const[transactionsCount,getTransactionsCount]=useState(0)

    //getting selected account pocket money id
    const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")

    const [firstStudent,setFirstStudent]=useState({})
    const [schoolName,setSchoolName]=useState("")
    const [myBlinkersCount,setMyBlinkersCount]=useState(0);
    


    //transaction states start here
    const[boughtItemsQty,setBoughtItemsQty]=useState(0)
    const[transactionDetails,setTransactionDetails]=useState({})
    const[transactionProducts,setTransactionProducts]=useState([])
    const [transactionTackShop,settransactiontackShop]=useState("")
    const[transactionInstitution,setTransactionInstitution]=useState("")
    const[transactionFee,setTransactionFee]=useState("")
    const[transactionServiceCategory,setTransactionServiceCategory]=useState("")

    //transaction states end here

   

    //Accounts states start here
    const [allBlinkAccounts,setAllBlinkAccounts]=useState([])
    const [numOfAccounts,setNumOfAccounts]=useState(0)
    //account states end here

    
    useEffect(() => {
        //load before showiing data
        setLoading(true);
        //const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"));
        const allBlinkers=AuthService.getLogedInAssociates()
        setstudents(allBlinkers)
        setFirstStudent(allBlinkers[0])
        setMyBlinkersCount(allBlinkers.length)
        console.log(allBlinkers[0])

        AuthService.getStudentDetails(AuthService.getLogedInAssociates()[0].userId).then((res)=>{
            
              
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


        }).catch((err)=>{

        })


        

        console.log("The transactions should appear down here as an object")

        AuthService.getStudentTransactions(blinkWalletAccountNum,AuthService.getLogedInAssociates()[0].userId).then((res)=>{

            setQuote(res);
            setLoading(false);
              
            //setStudentProfile(res.data.data.userProfile)
            setStudentTransactions(res.data.data)
            // console.log("We are here for transactions")
            // console.log(res.data.data)
            // console.log("The transactions start here <br/>"+res.data.length)
            //alert(studentTransactions.length)
            getTransactionsCount(res.data.length)
            
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
            //alert("Error occured")
        })
    },[])

    //setting todays date
    useEffect(()=>{
        setDateToday(Moment().format('YYYY-MM-DD 00:00:00'))
        let dateTodayEnd=Moment().format('YYYY-MM-DD 23:59:59')
        let dateYesterdayEnd=Moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59')
        //alert(dateYesterday)
        setDateYesterday(Moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'))
        setSelectedStudentId(firstStudent.userId)
        console.log("The date yesterday is: "+dateYesterday)
        console.log("selected Student ID "+selectedStudentId)
        

        AuthService.getTransactionsByDate(firstStudent.userId,dateToday,dateTodayEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmounts+=parseFloat(transaction.amount)
                    setTodaysExpenditure(theAmounts)
                    
                }
                else{
                    console.log("The transaction at "+index+" is not a merchant transaction")
                }
            })

        //getting the transactions for yesterday
        
            console.log("the amounts are")
            console.log("Total spent: "+theAmounts)
            console.log("Total spent: "+todaysExpenditure)
        }).catch((err)=>{
            console.log(err)
            //alert("error")
        })

        AuthService.getTransactionsByDate(firstStudent.userId,dateYesterday,dateYesterdayEnd).then((res)=>{
            res.data.data.map((transaction,index)=>{
                if(transaction.transType==="Merchant_Pay"){
                    console.log("The transaction amount of item "+index+" is "+transaction.amount)
                    theAmountsYesterday+=parseFloat(transaction.amount)
                    setYesterdaysExpenditure(theAmountsYesterday)
                    
                }
                else{
                    console.log("The transaction at "+index+" is not a merchant transaction")
                }
            })

        //getting the transactions for yesterday
        
            console.log("the amounts are")
            console.log("Total spent: "+theAmounts)
            console.log("Total spent: "+todaysExpenditure)
        }).catch((err)=>{
            console.log(err)
           // alert("error")
            console.log('[AXIOS GET]', err)
        })
        
       AuthService.getAccountLimits(selectedPocketMoneyId).then((res)=>{
       
        console.log("The account Limits ARe: "+res.data.data.find(x=>x.limitPeriod==="DAILY").amount)
        setAlllimits(res.data.data)

        console.log("the account limits starts here")
        console.log(res)
        if(res.status===200){
            
            if(res.data.data.find(x=>x.limitPeriod==="DAILY").limitStatus==="Active"){
                //alert("A limit is set")
                setDailyCardLimit(res.data.data.find(x=>x.limitPeriod==="DAILY").amount)
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

       
       console.log("The student account details")
       console.log(fetchedStudentDetails)
       console.log(fetchedStudentDetails.status)

       if(fetchedStudentDetails.status==="Disabled"){
            setSelectedStudentActiveStatus(false)
            setCardIsBlocked(true)

            setBlockMsg(firstStudent?.firstName+" Will be unable to access the funds from the card. Do you want to unblock?")
            setBlockTitle(firstStudent.firstName+"'s Card Has Been Blocked")
            setBlockImg("assets/images/animated/credit-card.gif")
        }
        else{
            setSelectedStudentActiveStatus(true)
            setCardIsBlocked(false)

            setBlockTitle("Block " +firstStudent?.firstName+"'s Card")
            setBlockMsg("Are you sure you want to block the card?")
            setBlockImg("assets/images/Account-options/block.svg")
            
        }


       
    },[dateYesterday,selectedStudentId,todaysExpenditure,firstStudent,selectedPocketMoneyId,dailyCardLimit])
    

    //this function helps get the details pertaining to the details of a student's account
    let targetId=firstStudent.userId
    //alert(targetId)


    const getInstitututionName=(studentId)=>{
        var studentInstitutionName
        AuthService.getStudentDetails(studentId).then((res)=>{
            //console.log(res)
          //  setSchoolName(res.data.data.associates[0].institution.institutionName)
          
          studentInstitutionName=res.data.data.associates[0].cardId
            //alert(schoolName);
           // console.log("the school Name is "+studentInstitutionName)
            
        })
        return studentInstitutionName
    }

    

   // console.log(students);
    const blinkerClicked=(studentId,clickedIndex)=>{
        
        setLoading(true);
        AuthService.getStudentDetails(studentId).then((res)=>{
           
           
            //console.log(res)
            setSchoolName(res.data.data.associates[0].institution.institutionName)
            //alert(schoolName);
            //console.log("the school Name is "+schoolName)
            setStudentProfile(res.data.data.userProfile)
            //console.log(studentProfile)
            //alert(clickedIndex)

            const allBlinkers=AuthService.getLogedInAssociates()

            setFirstStudent(allBlinkers[clickedIndex])
            setMyBlinkersCount(allBlinkers.length)
            //console.log(allBlinkers[0])
            //alert(studentId)

            console.log(allBlinkers[clickedIndex].status)
            console.log(allBlinkers[clickedIndex])

            
        
        AuthService.getStudentDetails(AuthService.getLogedInAssociates()[clickedIndex].userId).then((res)=>{
            
            setStudentProfile(res.data.data.userProfile)
            setFetchedStudentDetails(res.data.data)
            //clicke blinker wallet Id
            setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)

            //console.log(studentProfile)
            //all other accounts
            setAllBlinkAccounts(res.data.data.userProfile.blinkaccounts)
            setNumOfAccounts(allBlinkAccounts.length)
            console.log("I was Clicked")
            setselectedPocketMoneyId(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').blinkAccountId)
            //console.log("All accounts for first blinker are "+allBlinkAccounts)
            //console.log(allBlinkAccounts)

            //clicked blinker transactions
            AuthService.getStudentTransactions(blinkWalletAccountNum,AuthService.getLogedInAssociates()[clickedIndex].userId).then((res)=>{

                setQuote(res);
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

            setSelectedStudentId(firstStudent.userId)
            //alert(firstStudent.userId)

          

        }).catch((err)=>{
            console.log(err)
        })
        }).catch((err)=>{

        })
        })
        // const returnedData= AuthService.getStudentDetails(studentId)
        // const GetSchoolName=returnedData.data.cardStatus
        

       

    }

    //getting clcicked transaction details
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
    //getting clicked transaction ends here

    //setting account limit
    

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


    const newLimit=async(event)=>{

        let data={
            "amount":newDailyCardLimit,
            "blinkAccountId":selectedPocketMoneyId,
            "limitPeriod":"DAILY",
            "limitStatus":"Active",
            "addedBy":StdFunctions.parentId,
            "kidUserId":firstStudent.userId,
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
                seterrorMsg("Daily transaction limit for "+firstStudent?.firstName +" "+firstStudent?.middleName+" has been updated to "+StdFunctions.kenyaCurrency(newDailyCardLimit))
                $('.btn-set-limit-sm').prop('disabled', true);
                setDailyCardLimit(newDailyCardLimit)
                setIsDailyLimitSet(true)
                $('.account-limit-modal .modal-footer ').addClass('d-none')
                setIsDailyLimitSet(true)

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

        let data={
            "amount":newDailyCardLimit,
            "blinkAccountId":selectedPocketMoneyId,
            "limitPeriod":"DAILY",
            "limitStatus":"Inactive",
            "addedBy":StdFunctions.parentId,
            "kidUserId":firstStudent.userId
          }

          AuthService.inactivateLimit(data).then((res)=>{           
            console.log(res)
           
            $('.limit-msg').show().removeClass('d-none').addClass('show')
 
            if(res.status===200){
                 seterrorMsg(res.data.statusDescription)
                 $('.disable-limits').prop('disabled', false);  
                 $('.disable-limits').children('div').addClass('d-none').removeClass('animate__animated').siblings('span').removeClass('d-none') 
                 $('.limit-container').addClass('waves-effect').find('input').addClass('d-none');
                 $('.limit-container').find('.limit-text').removeClass('d-none')
                 $('.limit-container').find('.change-icon').removeClass('d-none').addClass('d-flex')
                 $('.limit-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
                 $('.close-limit-box').addClass('d-none')   
                 $('.limit-msg').removeClass('d-none').removeClass('fade')
                 seterrorMsg("Daily transaction limit for "+firstStudent?.firstName +" "+firstStudent?.middleName+" has disabled")
                 $('.btn-set-limit-sm').prop('disabled', true);
                 $('.account-limit-modal .modal-footer ').addClass('d-none')
                 setIsDailyLimitSet(false)
                 setDailyCardLimit("Not Set")
                 console.log(res.data)
                
             }
            
          
         }).catch((err)=>{
           console.log(err)
           $('.disable-limits').prop('disabled', false);  
            $('.disable-limits').children('div').addClass('d-none').removeClass('animate__animated').siblings('span').removeClass('d-none')   
                 
         })
    }
    const unBlockCard=async(event)=>{
        event.preventDefault()
        $('.btn-set-unblock').prop('disabled', true).siblings().prop('disabled', true);
        $('.btn-set-unblock').children("div").removeClass('d-none').siblings('span').addClass('d-none')
        let data={
            "userId":StdFunctions.parentId,
            "studentUserId":firstStudent.userId
        }
        AuthService.reactivateCard(data).then((res)=>{
            console.log(res)
            setBlockErrMsg(res.data.statusDescription)
            if(res.status===200){
                setBlockMsg(firstStudent?.firstName+" Will be unable to access the funds from the card. Do you want to unblock?")
                setBlockImg("assets/images/Account-options/block.svg")
                setCardIsBlocked(false)

                setBlockTitle("Block " +firstStudent?.firstName+"'s Card")
                setBlockMsg("Are You Sure You Want To Block " +firstStudent?.firstName+" From Using His Card, If You Do So The Card Will Not Be In Use Up Until You Unblock It.")

                $('.btn-set-unblock').prop('disabled', false).siblings().prop('disabled', false);
                $('.btn-set-unblock').children("div").addClass('d-none').siblings('span').removeClass('d-none')
                $('.block-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');

            }
        }).catch((err)=>{

        })
    }
    const blockCard=async(event)=>{
        event.preventDefault()
       // $('.account-block-modal .modal-header .btn-close').addClass('d-none')
        $('.btn-block-card').prop('disabled', true).siblings().prop('disabled', true);
        $('.btn-block-card').children("div").removeClass('d-none').siblings('span').addClass('d-none')
        let data={
            "userId":StdFunctions.parentId,
            "studentUserId":firstStudent.userId
        }
        console.log("The inactivated account is "+firstStudent.userId)

        AuthService.deactivateCard(data).then((res)=>{           
            console.log(res)
            //$('.limit-msg').show().removeClass('d-none').addClass('show')
            setBlockErrMsg(res.data.statusDescription) 
            if(res.status===200){
                 
                setBlockMsg(res.data.statusDescription)
                 setBlockTitle(firstStudent.firstName+"'s Card Has Been Blocked")
                 setBlockImg("assets/images/animated/credit-card.gif")
                 setCardIsBlocked(true)
                 //alert("blocked")


                //$('.account-block-modal .modal-header .btn-close').removeClass('d-none')
                $('.btn-block-card').prop('disabled', false).siblings().prop('disabled', false)
                $('.btn-block-card').children("div").addClass('d-none').siblings('span').removeClass('d-none')
                 //$('.unblock-card').removeClass('d-none')
                 //$('.btn-block-card-close').removeClass('d-none')
             }
             else{
                alert("Could not block Card")
             }
            
          
         }).catch((err)=>{
           console.log(err)
           alert("an error occured")
            $('.account-block-modal .modal-header .btn-close').removeClass('d-none')
            $('.btn-block-card').prop('disabled', false).siblings().prop('disabled', false);
            $('.btn-block-card').children("div").addClass('d-none').siblings('span').removeClass('d-none')
         })
    }

    const blockCard2=async(event)=>{
        setStatusUpdate("Disabled");
        event.preventDefault()
        $('.btn-block-card').prop('disabled', true).siblings().prop('disabled', true);
        $('.btn-block-card').children("div").removeClass('d-none').siblings('span').addClass('d-none')
        //alert(firstStudent.userId)
        //alert()
        AuthService.changeAccountStatus(firstStudent.userId,"Disabled").then((res)=>{
           setBlockErrMsg(res.data.statusDescription) 
            if(res.status===200){
               
                setSelectedStudentActiveStatus(false)

                setBlockMsg(firstStudent?.firstName+" Will be unable to access the funds from the card. Do you want to unblock?")

                setBlockTitle(firstStudent.firstName+"'s Card Has Been Blocked")
                setBlockImg("assets/images/animated/credit-card.gif")
                setCardIsBlocked(true)
                $('.btn-block-card').prop('disabled', false).siblings().prop('disabled', false)
                $('.btn-block-card').children("div").addClass('d-none').siblings('span').removeClass('d-none')
            }
            else{
                alert("Action cant be performed at the moment. Try again later")
            }
        }).catch((err)=>{
            alert("Something went wrong, try again later")
        })
    }

    const unBlockCard2=async(event)=>{
        setStatusUpdate("Active");
        event.preventDefault()
        $('.btn-set-unblock').prop('disabled', true).siblings().prop('disabled', true);
        $('.btn-set-unblock').children("div").removeClass('d-none').siblings('span').addClass('d-none')
        //alert(firstStudent.userId)
        //alert()
        AuthService.changeAccountStatus(firstStudent.userId,"Active").then((res)=>{
           setBlockErrMsg(res.data.statusDescription) 
            if(res.status===200){
               
                setSelectedStudentActiveStatus(true)
                setBlockErrMsg(firstStudent?.firstName+"'s Account was succesfully reactivated.") 
                
                setBlockImg("assets/images/Account-options/block.svg")
                setCardIsBlocked(false)

                setBlockTitle("Block " +firstStudent?.firstName+"'s Card")
                setBlockMsg("Are you sure you want to block the card?")

                $('.btn-set-unblock').prop('disabled', false).siblings().prop('disabled', false);
                $('.btn-set-unblock').children("div").addClass('d-none').siblings('span').removeClass('d-none')
                $('.block-msg').show().addClass('show').addClass('alert-success').removeClass('d-none').removeClass('alert-danger').children('i').addClass('mdi-check-all').removeClass('mdi-block-helper');
            }
            else{
                alert("Action cant be performed at the moment. Try again later")
            }
        }).catch((err)=>{
            alert("Something went wrong, try again later")
        })
    }
    // $('.btn-block-card-close').unbind().on('click', function(){
    //     $('.unblock-card').addClass('d-none')
    //     $('.btn-block-card-close').addClass('d-none')
    //     $('.btn-dont-block').removeClass('d-none')
    //     $('.btn-block-card').removeClass('d-none')
    //     $('.limit-msg').addClass('d-none')
    // })

    

   

   
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
        <title>Blink! | Digital Wallet for Students</title>
        </Helmet>    {/* the modals container */}
        <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row d-none">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">Dashboard</h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>

        <div className="row d-sm-none d-md-flex">
            <div className="col-12">
                <h4 className="text-black pt-0 pl-0 pb-3 p-3  fw-medium m-0 text-capitalize">Hello, {parentFName}</h4>
            </div>
        </div>

        {/* <!-- end page title --> */}
        <div className="row">
        <div className="col-lg-12">
            <div className="card d-md-flex d-lg-none no-shadow  mb-0 ">
                <div className="card-body mt-3  p-3 bg-light mx-3 mt-2 rad-sm-8px rad-0px py-2">
                    <div className="row">
                    <div className="dropdown d-inline-block w-100 d-flex align-items-center">
                        <button type="button" className="btn header-item waves-effect align-items-center w-100  text-left d-flex p-0" id="blinkers-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="flex-shrink-0 me-3">
                                <img className="rounded-circle d-none" src="assets/images/logo-files/blink-icon2.svg" alt="Generic placeholder image" height="65"/>
                                <div className="avatar-sm mx-auto ">
                                    
                                    <span className={`avatar-title text-uppercase rounded-circle bg-random font-size-20 position-relative ${selectedStudentActiveStatus ? "" : "border-danger"}`}>

                                        {selectedStudentActiveStatus ? (
                                            <></>
                                            ):(                                                
                                                <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger blocked-account p-1"><span class="visually-hidden">Blocked Account</span></span>
                                            )
                                        }
                                        {studentProfile?.institution != undefined && firstStudent?.firstName.charAt(0)+""+firstStudent?.middleName.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex-grow-1 chat-user-box me-3">
                                <h6 className="user-title m-0  text-black text-capitalize">{firstStudent?.firstName+" "+firstStudent?.middleName}</h6>
                                <p className="text-muted m-0 p-0 font-size-12 ">{firstStudent?.blinkId} 
                                {selectedStudentActiveStatus ? (
                                       <></>
                                    ):(
                                        
                                        <span class="badge badge-soft-danger ms-2 mr-2 text-uppercase fw-semibold">
                                            <i className="mdi mdi-lock-remove"></i> Blocked
                                        </span>
                                    )
                                }
                                    
                                </p>
                            </div>
                            {StdFunctions.isBlinkersMore(students?.length)?(
                                <div className="d-flex justify-content-center align-items-center">
                                    <span class="badge rounded-pill bg-primary-blink float-end">+{students?.length-1} More</span><span><i className="mdi mdi-chevron-down  d-xl-inline-block me-3 font-21"></i></span>
                                </div>
                                ):(
                                <span></span>
                                )}
                            
                        </button>
                        

                        
                        <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-start p-0 w-100 ${StdFunctions?.isgreaterThanOne(myBlinkersCount) ? "" : "d-none"}`}>
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
                            {students?.length> 1 && students.map((item, index)=>(
                                <div  style={{ maxheight: "230px" }}>
                                    <a onClick={()=> blinkerClicked(item?.userId,index)}   className="d-flex px-3 pb-2 waves-effect dropdown-item">
                                        <div className="flex-shrink-0 me-3">
                                            <img className="rounded-circle d-none" src="assets/images/users/avatar-4.jpg" alt="Generic placeholder image" height="36"/>
                                            <div className="avatar-sm mx-auto ">
                                                <span className="avatar-title rounded-circle bg-random font-size-16 profile-abriv text-uppercase">
                                                    {item?.firstName.charAt(0)+item.middleName.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 chat-user-box">
                                            <p className="user-title m-0">{item?.firstName+" "+item.middleName}</p>
                                            <p className="text-muted">{item?.blinkId}</p>
                                        </div>                                                            
                                    </a>
                                    </div>
                                ))
                                
                            }  
                            
                        </div>

                        <ul className="list-inline user-chat-nav text-end mb-0 d-none">                                                   

                            <li className="list-inline-item pr-sm-0 pr-4">
                                <div className="dropdown">
                                    <button className="btn nav-btn mr-4" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="bx bx-dots-horizontal-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-start">
                                        <a className="dropdown-item" href="#"><i className="font-size-15 mdi mdi-shield-account me-3"></i>View Account</a>
                                        <a className="dropdown-item" href="#"><i className="font-size-15 mdi mdi-clipboard-text me-3"></i>Tasks</a>
                                        <a className="dropdown-item text-danger" href="#"><i className="font-size-15 mdi mdi-lock-remove me-3"></i>Block Account</a>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="col-lg-12 ">
                <div className="card no-shadow-sm mb-sm-0 mb-md-4 mb-xs-0 mb-4 mb-xm-0">
                    <div className="card-body pt-2 pb-0 mb-3 border-sm-bottom-1px">
                        <div className="row">
                            <div className="col-lg-4 d-md-none d-sm-none d-lg-flex align-content-center">
                                <div className="dropdown d-inline-block w-100 d-flex align-items-center">
                                    <button type="button" className="btn header-item waves-effect align-items-center w-100  text-left d-flex p-0" id="blinkers-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="flex-shrink-0 me-3">
                                            <img className="rounded-circle d-none" src="assets/images/logo-files/blink-icon2.svg" alt="Generic placeholder image" height="65"/>
                                            <div className="avatar-sm mx-auto ">
                                                <span className={`avatar-title text-uppercase rounded-circle bg-random font-size-20 position-relative ${selectedStudentActiveStatus ? "" : "border-danger"}`}>
                                                    {selectedStudentActiveStatus ? (
                                                        <></>
                                                        ):(                                                
                                                            <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger blocked-account p-1"><span class="visually-hidden">Blocked Account</span></span>
                                                        )
                                                    }
                                                    {studentProfile.institution != undefined && firstStudent.firstName.charAt(0)+""+firstStudent.middleName.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-grow-1 chat-user-box me-3">
                                            <h6 className="user-title m-0  text-black fw-medium text-capitalize">{firstStudent?.firstName+" "+firstStudent?.middleName}</h6>
                                            <p className="text-muted m-0 p-0 font-size-12">{firstStudent?.blinkId}
                                                {selectedStudentActiveStatus ? (
                                                    <></>
                                                    ):(
                                                        
                                                        <span class="badge badge-soft-danger ms-2 mr-2 text-uppercase fw-semibold">
                                                            <i className="mdi mdi-lock-remove"></i> Blocked
                                                        </span>
                                                    )
                                                }
                                            </p>
                                        </div>
                                        {StdFunctions.isBlinkersMore(students.length)?(
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span class="badge rounded-pill bg-primary-blink float-end">+{students?.length-1} More</span><span><i className="mdi mdi-chevron-down  d-xl-inline-block me-3 font-21"></i></span>
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
                                                        <p className="user-title m-0 text-black">{item.firstName+" "+item.middleName}</p>
                                                        <p className="text-muted">{item.blinkId}</p>
                                                    </div>                                                            
                                                </a>
                                                </div>
                                            ))
                                            
                                        }  
                                        
                                    </div>

                                    <ul className="list-inline user-chat-nav text-end mb-0 d-none">                                                   

                                        <li className="list-inline-item pr-sm-0 pr-4">
                                            <div className="dropdown">
                                                <button className="btn nav-btn mr-4" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-start">
                                                    <a className="dropdown-item" href="#"><i className="font-size-15 mdi mdi-shield-account me-3"></i>View Account</a>
                                                    <a className="dropdown-item" href="#"><i className="font-size-15 mdi mdi-clipboard-text me-3"></i>Tasks</a>
                                                    <a className="dropdown-item text-danger" href="#"><i className="font-size-15 mdi mdi-lock-remove me-3"></i>Block Account</a>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-8 col-sm-12 align-self-center p-sm-0">
                                <div className="text-lg-left mt-4 mt-lg-0 mt-sm-0">
                                    <div className="row">
                                        <div className="col-sm-6  col-md-3 d-none">
                                            <div className="px-2">
                                                <div className="avatar-sm mb-3">
                                                    <span className="avatar-title rounded-circle bg-info font-size-24">
                                                        <i className="mdi mdi-account-child text-white"></i>
                                                    </span>
                                                </div>
                                                <p className="text-muted text-truncate mb-2">All Blinkers</p>
                                                <h5 className="mb-0">{myBlinkersCount}</h5>
                                            </div>
                                        </div>
                                        <div className=" col-sm-3 d-none d-sm-none col-md-3">
                                            <div className="px-2">
                                                <div className="avatar-sm mb-3">
                                                    <span className="avatar-title rounded-circle bg-success font-size-24">
                                                            <i className="mdi mdi-cash-multiple text-white"></i>
                                                        </span>
                                                </div>
                                                <p className="text-muted text-truncate mb-2">Avg. Daily Consumption</p>
                                                <h5 className="mb-0">KES 450</h5>
                                            </div>
                                        </div>
                                        <div className="d-sm-none  d-none  col-sm-3 col-md-3">
                                            <div>
                                                <div className="avatar-sm mb-3">
                                                    <span className="avatar-title rounded-circle font-size-24">
                                                            <i className="mdi mdi-swap-horizontal text-white"></i>
                                                        </span>
                                                </div>
                                                <p className="text-muted text-truncate mb-2">Avg Daily Transactions</p>
                                                <h5 className="mb-0">22</h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3 d-none">
                                            <div>
                                                <div className="avatar-sm mb-3">
                                                    <span className="avatar-title rounded-circle bg-pink font-size-24">
                                                            <i className="mdi mdi-clipboard-edit-outline text-white"></i>
                                                        </span>
                                                </div>
                                                <p className="text-muted text-truncate mb-2">Pending Tasks</p>
                                                <h5 className="mb-0">180</h5>

                                            </div>
                                        </div>

                                        {/* account options start here */}

                                        <div className="col-12 d-none">
                                            <hr/>
                                        </div>
                                        <div className="col-3 d-none">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="avatar-sm mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/tasks.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                <p className="fw-medium text-black text-center text-center mb-0 mt-2">{firstStudent?.firstName}'s Tasks</p>
                                            </div>
                                        </div>

                                       

                                        {/* my profile two */}
                                        <a href="#" className="col-4 waves-effect py-3">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-purple mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/account-1.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                <p className="fw-medium text-black text-center text-center font-11px mb-0 mt-2">{firstStudent?.firstName}'s Profile</p>
                                            </div>
                                        </a>

                                        <a href="#" className="col-4 waves-effect py-3 d-sm-none d-md-block" data-bs-toggle="modal" data-bs-target=".account-limit-modal">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-warning mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/limit-2.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                {isDailyLimitSet ? (
                                                    <p className="text-black fw-medium font-11px text-center mb-0 mt-2">Change Limit</p>
                                                    ):(
                                                        <p className="text-black fw-medium font-11px text-center mb-0 mt-2">Set Limit</p>
                                                    )
                                                }
                                            </div>
                                        </a>

                                        <a href="#" className="col-4 waves-effect d-sm-block d-md-none py-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-limits" aria-controls="offcanvasBottom">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-warning mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/limit-2.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                {isDailyLimitSet ? (
                                                    <p className="text-black fw-medium font-11px text-center mb-0 mt-2">Change Limit</p>
                                                    ):(
                                                        <p className="text-black fw-medium font-11px text-center mb-0 mt-2">Set Limit</p>
                                                    )
                                                }
                                            </div>
                                        </a>

                                        {selectedStudentActiveStatus ? (
                                                <a href="#" className="col-4 waves-effect py-3" data-bs-toggle="modal" data-bs-target=".account-block-modal">
                                                    <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                        <div className="options-cont options-cont-danger mb-0">
                                                            <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                                <img className="m-0 p-0" src="assets/images/Account-options/block-2.svg" alt="" height="45px"/>
                                                            </div>
                                                        </div>
                                                        <p className="text-black fw-medium font-11px text-center font-11px mb-0 mt-2">Block {firstStudent?.firstName}</p>
                                                    </div>
                                                </a>
                                            ):(
                                                <a href="#" className="col-4 waves-effect py-3" data-bs-toggle="modal" data-bs-target=".account-block-modal">
                                                    <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                        <div className="options-cont options-cont-success mb-0">
                                                            <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                                <img className="m-0 p-0" src="assets/images/Account-options/unblock-2.svg" alt="" height="45px"/>
                                                            </div>
                                                        </div>
                                                        <p className="text-black fw-medium text-center font-11px mb-0 mt-2">Unblock {firstStudent?.firstName}</p>
                                                    </div>
                                                </a>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* <!-- end row --> */}
                    </div>
                </div>
            </div>
        </div>



            <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-5 col-sm-12">
                    <div className="row">
                        <div className="col-12 d-non ">
                            <div className="card bg-primary bg-primary-blink blink-card-bg mx-0 mx-sm-3 rad-sm-8px overflow-hidden">
                                <div className="card-body blink-car rad-sm-8px">

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="flex-shrink-0 align-self-center mb-2">
                                            <img src="assets/images/users/avatar-1.jpg" className="avatar-md rounded-circle img-thumbnail d-none" alt=""/>
                                            <div class="avatar-md avatar-card mx-auto ">
                                                <span class="avatar-title rounded-circle bgrandom7 font-size-20 border-white text-uppercase">
                                                {studentProfile?.institution != undefined && studentProfile.firstName.charAt(0)+""+studentProfile.middleName.charAt(0)}
                                                </span>
                                            </div>
                                        
                                        </div>
                                        <div>
                                            <img src="assets/images/logo-files/blink-white.svg" className="img" alt="" height="40px"/>
                                        </div>
                                </div>

                                    <div className="d-flex align-content-center align-items-center mb-3">
                                    
                                        <div className="flex-grow-1">
                                            <p className="m-0 p-0 text-white-50">Blink Wallet Holder</p>
                                            <h4 className="font-size-15 mb-0 text-white text-capitalize">{studentProfile?.institution != undefined && studentProfile.firstName+" "+studentProfile.middleName}</h4>
                                            
                                        </div>

                                        <div className="flex-grow-1 text-right">
                                            <p className="m-0 p-0 text-white-50">School</p>
                                            <h5 className="font-size-15 mb-0 text-white">{studentProfile?.institution != undefined && studentProfile.institution.institutionName}</h5>
                                            
                                        </div>
                                    </div>

                                    <div className="row d-non">
                                        <div className="col-sm-12 col-md-6 ">
                                            <div className="d-flex align-items-center">
                                                <span className="badge  badge-soft-light font-size-12"> {StdFunctions.kenyaCurrency(todaysExpenditure)} </span> <span className="ms-2 mb-0 pb-0 text-truncate text-white">Used Today</span>

                                            </div>
                                        </div>
                                        <div className="col-6 d-sm-none d-md-flex align-items-end justify-content-end text-right">
                                            <span className="mt-0 mb-0 text-nowrap"><span className="badge badge-soft-light font-size-11 me-2"> {StdFunctions.kenyaCurrency(todaysExpenditure-yesterdaysExpenditure)} <i className="mdi mdi-arrow-up"></i> </span> <span className="text-white opacity-50">From Yesterday</span></span>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <div className="text-white">
                                        <p className="text-white-50 text-truncate mb-0">Wallet Balance.</p>
                                        <h3 className="text-white kenyan-carency mb-0 pb-0">{studentProfile?.blinkaccounts != undefined && StdFunctions.kenyaCurrency(studentProfile?.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').currentBalance)}</h3>
                                       
                                    
                                    </div>
                                    <div>
                                        <button class="btn btn btn-dark waves-effect waves-light btn-sm d-sm-none d-md-block" data-bs-toggle="modal" data-bs-target="#walletTopUp"><i className="mdi mdi-flip-h mdi-18px mdi-reply font-size-16 align-middle me-2"></i>Top up Account</button>
                                        <button class="btn btn btn-dark waves-effect waves-light btn-sm d-md-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-send-money"><i className="mdi mdi-flip-h mdi-18px mdi-reply font-size-16 align-middle me-2"></i>Top up Account</button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 d-none">
                            <div className="card bg-primary bg-primary-blink">
                                <div className="card-body">
                                    <div className="d-flex align-content-center align-items-center mb-3">
                                        <div className="flex-shrink-0 align-self-center me-3">
                                            <img src="assets/images/users/avatar-1.jpg" className="avatar-sm rounded-circle img-thumbnail" alt=""/>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="font-size-15 mb-0 text-white">Alex Wanjala</h5>
                                            <p className="m-0 p-0 text-white-50">Blink Academy</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="text-white">
                                                <p className="text-white-50 text-truncate mb-0">Wallet Balance.</p>
                                                <h4 className="text-white">KES 9,134.39</h4>
                                            
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex align-items-end justify-content-end">
                                            <p className="text-right mb-0 pb-0 text-white-50">Blink ID: 1235 2659 2358</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            {/* <div className="card history-card"> */}
                            <div className="card history-card no-shadow-sm border-sm-bottom-1px">
                                <div className="card-header bg-white px-sm-2 py-sm-3">
                                    <h4 className="card-title mb-0 text-capitalize text-black">Recent Transactions for {firstStudent?.firstName}</h4>
                                </div>
                                <div className="card-body px-2 show-trans-cont d-none px-sm-0 pt-sm-0">                                           

                                    <div className="table-responsive">
                                        <table className="table table-nowrap  align-middle mb-0 table-hover ">
                                        <thead className="table-light text-black">
                                            <tr>
                                                
                                                <th className="" colspan="2">
                                                    Transaction details
                                                </th>
                                                <th className="text-right">
                                                    <span>Amount & time</span>
                                                </th>
                                            </tr>
                                        </thead>
                                            
                                            <tbody>

                                            {studentTransactions?.length>0 && studentTransactions.slice(0,4).map((transaction,index)=>(
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
                                                                <span className="product-items">                                    
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
                                                        <div className="text-muted">
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
                                    </div>
                                    <div className="text-center mt-4"><Link to="/Transactions" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ms-1"></i></Link></div>
                                </div>
                                <div className="card-body px-5 d-flex flex-column justify-items-center align-items-center text-center no-trans-cont">
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
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-7 col-sm-12 ">
                    <div className="card expenditure-card no-shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-0 d-none">Expenditure</h4>
                            <small className="mb-4 text-muted d-none">The last 12 Months for {studentProfile.institution != undefined && studentProfile.firstName+" "+studentProfile.middleName}</small>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div id="member-salary-chart" className="apex-charts" dir="ltr"></div>
                                </div>

                                <hr className="d-none" />


                                <div className="col-lg-12  col-sm-12 mb-3 d-none">
                                    <div className="text-muted pt-5">
                                        <div className="row">
                                            <div className="col-auto mb-4">
                                                <div className="text-capitalize pe-4">
                                                    <p className="mb-0">Last month's Expenditure</p>
                                                    <h5>KES 639</h5>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <div className="text-capitalize">
                                                    <p className="mb-0">This month's Expenditure</p>
                                                    <h4 className="d-flex flex-column">
                                                        <span className="pr-2">KES 562</span>
                                                        <div className="font-size-12 mt-1 text-muted"><span className="badge badge-soft-success font-size-12 me-1"> + 0.2% </span> From previous period</div>
                                                    </h4>
                                                    
                                                </div>
                                                <div className="mt-3 d-none">
                                                    <a href="javascript: void(0);" className="btn btn-primary waves-effect waves-light btn-sm">View Details <i className="mdi mdi-chevron-right ms-1"></i></a>
                                                </div>
                                            </div>
                                            

                                            
                                            
                                        
                                        </div>                                                
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-12">
                                    <div>
                                        <div className="row">
                                            <h4 className="card-title font-12px pt-5 mb-0 ">All Accounts summary for {firstStudent.firstName}</h4>
                                            <p className="text-muted">Expenditure and transactions </p>
                                        </div>
                                    </div>
                                    <div>

                                        {allBlinkAccounts.length> 0 && allBlinkAccounts.slice(0,40).map((account, index)=>(
                                            
                                                <div className="row">
                                                    <div className="d-none">Testing to see if my if else statememnt might work</div>
                                                        {StdFunctions.isActiveAccount(account.accountStatus) ? (
                                                        <div className={`bg-soft px-3 py-2 mb-3 d-flex align-items-center justify-content-between text-capitalize ${StdFunctions.isPocketMoney(account.blinkersAccountType) ? "bg-warning" : "bg-danger "}`}>
                                                        {/* <div className={'bg-danger bg-soft px-3 py-2 mb-3 d-flex align-items-center justify-content-between text-capitalize ${StdFunctions.isWelfareAccount(account.blinkersAccountType)?"d-none":""}'}> */}
                                                            <div className="d-flex align-items-center">

                                                                <div className="me-3 d-sm-none d-md-flex">
                                                                    {StdFunctions.isWelfareAccount(account.blinkersAccountType) ? (
                                                                        <img className="me-2" src="assets/images/blink-accounts/welfare.svg" alt="" height="40px"/>
                                                                        
                                                                        ) : (
                                                                        <></>
                                                                    )}
                                                                    {StdFunctions.isPocketMoney(account.blinkersAccountType) ? (
                                                                        <img className="me-2" src="assets/images/blink-accounts/card.svg" alt="" height="40px"/>
                                                                        
                                                                        ) : (
                                                                        <></>
                                                                    )}
                                                                    
                                                                </div>

                                                            <div>
                                                                <h6 className="mb-0 text-capittalize">{account.accountName}</h6>
                                                                <small className="mb-0 p-0">Acc Type: <strong>{StdFunctions.removeUnderscore(account.blinkersAccountType)}</strong></small>
                                                                {" "}
                                                                <small className="mb-0 p-0">Acc No.: <strong>{StdFunctions.chunkSubstr(account.accountNumber,4)}</strong></small>
                                                            </div>
                                                        </div>

                                                        <div className="text-right ms-3 d-flex flex-column">
                                                            {StdFunctions.isWelfareAccount(account.blinkersAccountType) ? (
                                                                <small className="mb-0 pb-0">Target Amount</small>
                                                                
                                                                    ) : (
                                                                       <div className="text-right">
                                                                       <small className="mb-0 pb-0 d-sm-none d-md-block w-100">Current Balance</small><small className="mb-0 pb-0 d-sm-block d-md-none w-100">Bal.</small>
                                                                       </div>
                                                                        
                                                            )}

                                                            {StdFunctions.isWelfareAccount(account.blinkersAccountType) ? (
                                                                <strong className="">{StdFunctions.kenyaCurrency(account.targetAmount)}</strong>
                                                                
                                                                    ) : (
                                                                        <strong className="">{StdFunctions.kenyaCurrency(account.currentBalance)}</strong>
                                                            )}
                                                           
                                                            <></>
                                                            
                                                            
                                                                
                                                                
                                                        </div>
                                                    
                                                    </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    
                                                    
                                                </div>
                                            ))
                                            
                                        }  
                                                                               
                                    </div>
                                </div>

                
                            </div>
                            
                        </div>
                    </div>

                </div>
                

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
                                    {StdFunctions.removeUnderscore(transactionServiceCategory)}
                                </span>
                                <h2 className=" text-uppercase mt-4 mb-1">
                                        {StdFunctions.isGoodsPurchase(transactionServiceCategory)?(
                                            <span className="">-{StdFunctions.kenyaCurrency(transactionDetails?.amount)}</span>
                                            
                                        ):(
                                            <span className="">{StdFunctions.kenyaCurrency(transactionDetails?.amount)}</span>
                                        )}
                                   
                                </h2>
                                <p className="text-uppercase mb-4">Transaction Fee <span className="fw-semibold">{StdFunctions.kenyaCurrency(transactionFee)}</span> </p>

                            </div>
                            <div className="px-4 px-sm-0 mb-4 transactions-details-table text-left d-flex justify-items-center align-items-center w-100">
                            
                                <div className="d-flex flex-column boarder-grey border-1 justify-content-center align-items-center w-100  p-3">
                                   
                                    <table className="table table-borderless mb-0 mt-0 table-sm single-receipt">
                                            {StdFunctions.isMerchantPay(transactionServiceCategory)?(
                                                <></>
                                            ):(
                                               <p className="mb-0 pb-0 mt-3"><blockquote className="text-center"><span className="text-muted">Receipt No.</span> {transactionDetails?.receiptNumber}</blockquote></p>
                                                                                          
                                            )}

                                            {StdFunctions.isDepositTransaction(transactionDetails?.transType)?(
                                                <h4><blockquote className="text-center"><span className="text-muted text-uppercase">Received From:</span><br className="d-sm-flex d-md-none"/> <span className="text-info">{ StdFunctions.phoneOutput(transactionDetails?.accountFrom)}</span></blockquote></h4>
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
                                                        <blockquote className=""><span className="text-muted">Receipt No.</span> {transactionDetails?.receiptNumber}</blockquote>
                                                    </th>
                                                </tr>
                                            ):(
                                                <></>
                                            )}

                                            {StdFunctions.isMerchantPay(transactionServiceCategory)?(
                                                <tr>
                                                    <th scope="col" colspan="2">Items</th>
                                                    <th scope="col" className="text-center">Qty</th>
                                                    <th scope="col" className="text-right">Price</th>
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
          {/* Setting Expenditure Limits */}
          <div className="modal fade account-limit-modal" data-toggle="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change Expenditure Limits</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="changeLimit" onSubmit={newLimit} className="modal-body ro text-capitalize p-0">
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

                                    <input type="number" required className="form-control d-none" onChange={(event)=>setNewDailyCardLimit(event.target.value)}  id="dailyLimits" Name="DailyLimits" placeholder="Enter Daily Limit"/>
                                </div>
                                <span  className="d-flex align-items-center change-icon">
                                    <small className="text-primary">Change</small>
                                    <i className="bx bx-chevron-right font-size-30 text-primary"></i>
                                </span>

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
                                    
        <div className={`offcanvas offcanvas-bottom ${StdFunctions.isDeviceAnAndroiid() ? "pt-3" : ""}`}   tabindex="-1" id="offcanvas-limits" aria-labelledby="offcanvasBottomLabel">
            <div className={`offcanvas-header ${StdFunctions.isDeviceAnAndroiid() ? "pt-5" : ""}`}>
                <h5 className="offcanvas-title">Expenditure Limits</h5>
                <button type="button mt-4" className="btn-close text-reset waves-effect" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <form id="changeLimit2" onSubmit={newLimit} className="offcanvas-body p-0 d-flex flex-column justify-content-between">
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
                            <span  className="d-flex align-items-center change-icon">
                                <small className="text-dark d-none">Change</small>
                                <i className="bx bx-chevron-right font-size-30 text-dark"></i>
                            </span>

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
                                <span className="">Disable Limits</span>
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
        {/* expenditure limit toast */}
       
        
        </>
    );

}
export default Home;