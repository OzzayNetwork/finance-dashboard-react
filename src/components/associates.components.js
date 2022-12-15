import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Associates =(props)=> {
    console.log(props.activeTransaction)
    console.log(props.activeTransactionRow)
    console.log(props.clickedAAssociates)
    // loader setting
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});
    const [btnClicked,setBtnClicked]=useState(false)
    const [loadTransations,setLoadTransactions]=useState(true)

    const [loggedAdmin,setLogedadmin]=useState("")
    const [clickedAAssociates,setClickedAssociates]=useState(props.clickedAAssociates)
    const [clickedUserName,setClicksetClickedUsername]=useState(props.guardiansName)

    

    return ( 
        <>

        {/* the modals container */}

        <div class="modal fade" id="associates-details-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered transaction-edit-modal ">
                <div class="modal-content position-relative">

                {loadTransations ? (
                    <div class="modal-loader d-none w-100 bg-white flex-column justify-items-center align-items-center p-5 position-absolute top-0 h-100 left-0 bottom-0 right-0">
                        <div class="lds-ripple"><div></div><div></div></div>
                        <h6 class="text-uppercase pt-3">Loading ...</h6>
                    </div>
                    ):(
                        <></>
                    )
                }
                

                    
                
                <div class="modal-body text-capitalize">
                        <div className="d-flex justify-content-center align-items-center">
                            <span className="badge d-none  badge-soft-success text-uppercase badge font-12px bg-primary-blink text-white">{props.clickedName} Associates</span>
                            <h4 class="text-center">Guardian's Dependants</h4>
                            <button type="button" className="btn d-none btn-light position-relative p-0 avatar-xs rounded-circle pull-right close-modal" data-bs-dismiss="modal" aria-label="Close">
                                <span className="avatar-title bg-transparent text-reset font-18px">
                                    <i className="bx bx-x"></i>
                                </span>
                            </button>
                      </div>
                      <div class="pt-3">
                        <table class="table table-bordered">
                            <thead class="thead-dark bg-primary text-white">
                                <tr>
                                    <th scope="col">{props.clickedName}'s Associates</th>
                                </tr>
                            </thead>
                            <tbody>
                               

                                {props.clickedAAssociates.map((associate, index)=>(
                                    <tr>
                                        <div class="d-flex align-items-center">
                                            <div class="pr-3">
                                                <div class="avatar-sm mx-auto ">
                                                    <span class="avatar-title rounded-circle font-size-16 profile-abriv text-uppercase bg-opacity-50">{associate.firstName.charAt(0)+""+associate.lastName.charAt(0)} </span>
                                                </div>
                                            </div>
                                        <div>
                                            <p class="mb-0 text-capitalize ">
                                                <span class="text-black fw-medium">{associate.firstName+" "+associate.middleName+" "+associate.lastName} </span>
                                            </p>
                                            <p class="mb-0 "><small>{associate.blinkId}</small></p></div></div>
                                    </tr>
                                    ))
                                        
                                }   
                                
                            </tbody>
                        </table>
                      </div>
                    
                </div>
                
                </div>
            </div>
        </div>

        
        

        </>
    );
}
export default Associates;