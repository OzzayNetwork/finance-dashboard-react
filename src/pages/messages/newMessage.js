import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const NewMessage =(props)=> {
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

        <div class="email-overlay d-none">
            <div class="card the-message-maker">
                <div class="card-header bg-primary text-white py-0">
                    <div class="d-flex justify-content-between align-items-center text-white">
                        <h4 class="mb-0 p-0 m-0">New message</h4>
                        <div class="control-btns">
                            <div class="dropdownd-lg-inline-block ms-1">
                                <button type="button" class="btn header-item noti-icon waves-effect minimize">
                                    <i class="mdi mdi-window-minimize"></i>
                                </button>
                                <button type="button" class="btn header-item noti-icon waves-effect fullscreen" >
                                    <i class="bx bx-fullscreen"></i>
                                </button>

                                <button type="button" class="btn header-item noti-icon waves-effect close-message-maker">
                                    <i class="mdi mdi-close"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 d-none selected-contacts-message">
                            <div class="row flex-nowrap">
                                <div class="col-1 mr-0  w-auto d-flex ">
                                    <span class=" ">
                                        <strong>To:</strong>
                                    </span>
                                </div>
                                <div class=" col-11 ml-0 pl-0 flex-wrap d-flex align-items-start">
                                    <span class="the-selected-contacts text-capitalize">Alex wanjala, juliet kemboi, tesfa ozem, moureen akinyi, salome aringo,kelvin kamau, william njuguna</span>
                                    <span data-bs-toggle="modal" data-bs-target="#selected-contacts" class="btn-link waves-effect float-left ">+23 Others</span>
                                </div>
                            </div>

                        </div>

                        <div class="col-12">
                            <div class="pb-3">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#composemodal" class="btn btn-success waves-effect btn-label waves-light d-none"><i class="bx bxs-user-detail label-icon"></i> Select contacts</button>
                            </div>

                            <div class="pb-3">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#upload-contacts" class="btn btn-success waves-effect btn-label waves-light"><i class="mdi-account-details-outline mdi label-icon"></i> Upload Contacts</button>
                            </div>

                        </div>
                        <div class="col-12">
                            <input type="text" placeholder="Subject" class="form-control mb-3"/>
                        </div>
                        <div class="col-12">
                            <textarea name="" placeholder="Write your message" id="" cols="30" rows="10" class="form-control"></textarea>
                        </div>

                    </div>
                </div>
                <div class="card-footer">

                    <div class="d-flex justify-content-between">
                        <div>
                            <label for="">Send as?</label>
                            <div class="d-flex">

                                <div class="form-check form-check-primary  mr-15px">
                                    <input class="form-check-input" type="checkbox" id="check-email" checked/>
                                    <label class="form-check-label" for="check-email">
                                        Email
                                    </label>
                                </div>

                                <div class="form-check form-check-primary  pl-4  mr-15px">
                                    <input class="form-check-input" type="checkbox" id="check-sms" checked/>
                                    <label class="form-check-label" for="check-sms">
                                        SMS
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div class="d-flex align-items-end">
                            <button type="button" class="btn btn-light waves-effect waves-light mr-15px btn-rounded" title="Delete the message">
                                <i class="bx bx-trash font-size-16 align-middle"></i>
                            </button>
                            <button type="submit" class="btn btn-outline-primary btn-rounded chat-send w-md waves-effect waves-light mr-15px" title="Set a time and date for when to send this message"><span class="d-none d-sm-inline-block me-2">Schedule Time</span> <i class="mdi mdi-clock-time-four-outline"></i></button>
                            <button type="submit" class="btn btn-primary btn-rounded chat-send w-md waves-effect waves-light"><span class="d-none d-sm-inline-block me-2">Send</span> <i class="mdi mdi-send"></i></button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        </>
    );
}
export default NewMessage;