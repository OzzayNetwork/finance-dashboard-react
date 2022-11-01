import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const TransactionEdit =()=> {

    // loader setting
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});
    const [btnClicked,setBtnClicked]=useState(false)

    const [loggedAdmin,setLogedadmin]=useState("")
    const [senderPhone,setSenderPhone]=useState("")
    const [editAmount,setEditAmount]=useState("")
    const [editDescription,setEditDescription]=useState("")
    const [sentAmount,setSentAmount]=useState("")
    const[transactionTo,setTransactionTo]=useState("")
    const[mpesaTransactionCode,setMpesaTransactionCode]=useState("")
    const[editResponse,setEditResponse]=useState("")

    useEffect(()=>{
        setLogedadmin(StdFunctions.adminId)
    },[])


    const editTransation=async(event)=>{
        event.preventDefault(); 
        setBtnClicked(true);
        setLogedadmin(StdFunctions.adminId)
      

        let data={
            "account_from": senderPhone,
            "account_to": transactionTo,
            "payment_type": "MPESA",
            "transaction_code": mpesaTransactionCode,
            "account_ref": transactionTo,
            "amount": sentAmount,
            "transaction_desc": editDescription,
            "api_key": "298ed745ed66e49bf78bc576f3c8c3b1",
            "userId":loggedAdmin
        }

        AuthService.editMpesaTransaction(data).then((res)=>{
            console.log(res)
            if(res.data.statusCode===200){


                $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
                $('#the-toast .toast-body').text("Succesfully Updated")
                setTimeout(() => {                  
                    $('#the-toast').addClass('animate__fadeOutDown')
                  }, 4000);  
                  setTimeout(() => {                  
                    $('#the-toast').removeClass('show')
                  }, 5000);
                  setBtnClicked(false); 
                  //$('#edit-transaction-form').reset();

                  document.getElementById('edit-transaction-form').reset();
                  $('.transaction-edit-modal .btn-close').click()
            }

            else{
                setBtnClicked(false);  
                $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
                $('#the-toast .toast-body').text(res.data.statusDescription)
                setTimeout(() => {                  
                    $('#the-toast').addClass('animate__fadeOutDown')
                  }, 4000);  
                  setTimeout(() => {                  
                    $('#the-toast').removeClass('show')
                  }, 5000);
            }
        }).catch((err)=>{
            console.log(err)
        //    alert("Unknown error")
           setEditResponse("Cant complete the request at This time")
           setBtnClicked(false);  

           $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
           $('#the-toast .toast-body').text("Cant complete the request at This time")
           setTimeout(() => {                  
               $('#the-toast').addClass('animate__fadeOutDown')
             }, 4000);  
             setTimeout(() => {                  
               $('#the-toast').removeClass('show')
             }, 5000);


        })
    }
    

    
    return ( 
        <>

        <Helmet>
        <title>Blink! | Edit Transaction</title>
        </Helmet>    
        {/* the modals container */}

        <div class="modal fade" id="transaction-edit-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered transaction-edit-modal">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Transaction</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-capitalize">
                    <form class="row" onSubmit={editTransation} id="edit-transaction-form">
                        <div class="col-12">
                            <div class="form-group mb-4">
                                <label>Sender's Phone Number</label>
                                <input type="text" placeholder="Phone" class="form-control" onChange={(event)=>setSenderPhone(event.target.value)} required/>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-group mb-4">
                                <label>MPESA Transaction code</label>
                                <input type="text" placeholder="Enter Mpesa Transaction Code" class="form-control" onChange={(event)=>setMpesaTransactionCode(event.target.value)} required/>
                            </div>
                        </div>

                        

                        <div class="col-12">
                            <div class="form-group mb-4">
                                <label>Transaction Amount</label>
                                <input type="text" placeholder="KES" class="form-control" onChange={(event)=>setSentAmount(event.target.value)} required/>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-group mb-4">
                                <label>Blinker To</label>
                                <input type="text" placeholder="Enter the correct intended account" class="form-control" onChange={(event)=>setTransactionTo(event.target.value)} required/>
                                <p class="text-info fw-semibold"><small>Who was this money initialy intended for?</small></p>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-group mb-4">
                                <label>Incident description</label>
                                <textarea class="form-control" onChange={(event)=>setEditDescription(event.target.value)} required placeholder="Enter a narration describing the incident"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">

                    {btnClicked ? (
                        <button disabled form="edit-transaction-form"  className="btn d-flex justify-content-center align-items-center btn-primary waves-effect waves-light w-100 btn-flex btn-outline-danger waves-effect  btn text-center justify-items-center align-items-center btn-block-card">
                            <div class="spinner-border d-flex text-white m-0 " role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <span className="d-none">Submit</span>
                        </button>
                        ):(
                            <button form="edit-transaction-form"  className="btn btn-primary waves-effect waves-light w-100 btn-flex btn-outline-danger waves-effect  btn text-center justify-items-center align-items-center btn-block-card">
                            <div class="spinner-border d-none text-white m-0 " role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <span className="">Submit</span>
                            </button>
                        )
                    }
                </div>
                </div>
            </div>
        </div>

        
        

        </>
    );
}
export default TransactionEdit;