import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const BlinkerDetails =(props)=> {
    console.log(props.activeTransaction)
    console.log(props.activeTransactionRow)
    // loader setting
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});
    const [btnClicked,setBtnClicked]=useState(false)
    const [loadTransations,setLoadTransactions]=useState(true)

    const [loggedAdmin,setLogedadmin]=useState("")

    const[boughtItemsQty,setBoughtItemsQty]=useState(0)

    const[transactionDetails,setTransactionDetails]=useState([])
    const[transactionProducts,setTransactionProducts]=useState([])
    const [transactionTackShop,settransactiontackShop]=useState("")
    const[transactionInstitution,setTransactionInstitution]=useState("")

    const[transactionId,setTransactionId]=useState(props.activeTransaction)

    const[transactionNum,setTransactionNum]=useState("")
    const[userAccountDetails,setUserAccountDetails]=useState({})
    const[transactionFee,setTransactionFee]=useState("")
    const[transactionServiceCategory,setTransactionServiceCategory]=useState("")

     //getting number of transactions per blinker
     const[transactionsCount,getTransactionsCount]=useState("")

     const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")
     const [schoolName,setSchoolName]=useState("")
     const[userType,setUserType]=useState("")


    useEffect(()=>{
        setLoadTransactions(true)
        // setTransactionId(localStorage.getItem("clickedTransaction"))
        
        let QuantityOfItems=0
        setTransactionDetails([])
        setLogedadmin(StdFunctions.adminId);
        console.log(StdFunctions.adminId)
        
        AuthService.fetchTransactionByTransactionId(props.activeTransaction).then((res)=>{
            
            console.log(res)
            if(res.status){
                setTransactionDetails(res.data.data)
                console.log(props.activeTransactionRow)
                console.log(res.data.data)
                setUserAccountDetails(res.data.data.userAccount.userProfile)
                setTransactionFee(res.data.data.userAccount.userProfile.institution.commission)
                setUserType(res.data.data.userAccount.userProfile.userType)
                setBlinkWalletAccountNum(res.data.data.accountFrom)
                settransactiontackShop(res.data.data.blinkMerchant.merchantName)
                setTransactionInstitution(res.data.data.userAccount.userProfile.institution.institutionName)
                setTransactionServiceCategory(props.activeTransactionRow.transType)
                setTransactionProducts(props.activeTransactionRow.productsSold)

                props.activeTransactionRow.productsSold.map((productItem)=>{
                    setBoughtItemsQty(QuantityOfItems+=productItem.units)
                })

                console.log(res.data.data.userAccount.userProfile.userType)
               

                setTimeout(() => {                  
                    setLoadTransactions(false)
                }, 800);
                
            }

        })
        

        //transaction details start here
    },[props.activeTransaction])

    $("#transaction-details-modal").on("shown.bs.modal", function (e) { 
        alert('Hi');
    });

    



    
    return ( 
        <>

        <Helmet>
            <title>Blink! | Transaction Details</title>
            
            
        </Helmet>    
        {/* the modals container */}

        <div class="modal fade" id="blinker-details-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered transaction-edit-modal ">
                <div class="modal-content position-relative">

                {loadTransations ? (
                    <div class="modal-loader d-flex w-100 bg-white flex-column justify-items-center align-items-center p-5 position-absolute top-0 h-100 left-0 bottom-0 right-0">
                        <div class="lds-ripple"><div></div><div></div></div>
                        <h6 class="text-uppercase pt-3 text-danger">Loading ...</h6>
                    </div>
                    ):(
                        <></>
                    )
                }

                    
                
                <div class="modal-body text-capitalize">
                    <div className="d-flex justify-content-between align-items-center">
                          <span className="badge  badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">Transaction details</span>
                  
                          
                        <button type="button" className="btn btn-light position-relative p-0 avatar-xs rounded-circle pull-right close-modal" data-bs-dismiss="modal" aria-label="Close">
                            <span className="avatar-title bg-transparent text-reset font-18px">
                                <i className="bx bx-x"></i>
                            </span>
                        </button>
                      </div>
                      <div className="payment-panel-parent">
                          <div className="d-flex justify-content-between align-items-center flex-column">
                                <div className="flex-shrink-0 me-3 mt-4 mb-3">
                                    <div class="avatar-md mx-auto ">
                                        <span class="avatar-title rounded-circle bg-random font-size-24 ">
                                            {userAccountDetails.institution != undefined && userAccountDetails.firstName.charAt(0)+""+userAccountDetails.middleName.charAt(0)}
                                        </span>
                                    </div>
                                    <img className="rounded-circle avatar-sm d-none" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="65"/>
                                </div>
                                <h4 className="mb-0 text-uppercase">
                                {userAccountDetails.institution != undefined && userAccountDetails.firstName+" "+userAccountDetails.middleName}
                                </h4>
                                <p className="text-muted text-uppercase mb-2">{StdFunctions.creditCard2(blinkWalletAccountNum)}</p>
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
export default BlinkerDetails;