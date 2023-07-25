import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'
import { Link, useLocation, matchRoutes } from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const ClickedAgentTodayHighlights = (props) => {

   
    return (
        <>
            <Helmet>
                <title>Blink! | Account Details</title>
            </Helmet>
            {/* the modals container */}

            <div class="offcanvas offcanvas-start" tabindex="-1" id="mapCanvas" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header border-bottom-1">
                    <div class="d-flex">

                        <div class="flex-shrink-0 align-self-center me-3 d-none">
                            <img src="assets/images/users/avatar-6.jpg" class="rounded-circle avatar-xs" alt="" />
                        </div>

                        <div class="flex-grow-1 overflow-hidden pe-5">
                            <div class=" mb-1 text-capitalize d-flex">
                                <h5 class="text-truncate mb-0 text-black">
                                    Kelvin Njuguna

                                    <small className='mx-2'><i className='mdi mdi mdi-circle font-size-16 text-danger text-uppercase'></i> Inactive</small>
                                </h5>
                            </div>
                            <p class="text-truncate mb-0 text-uppercase">Last Seen Zone <strong className='text-black fw-semibold'>Oyugis Bus Park</strong> </p>
                        </div>


                    </div>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="alert alert-danger" role="alert">
                        <i className='mdi mdi mdi-alert font-size-18 me-3'></i>
                        Inactive for the last 3 Hrs
                    </div>
                    <div class="card shadow-none border">
                        <div class="card-body p-3">
                            <div class="">

                                <div class="d-flex">
                                    <div class="overflow-hidden me-auto">
                                        <h5 class="font-size-14 text-truncate mb-4"><a href="javascript: void(0);" class="text-body">Today's Summary</a></h5>
                                        <p class="text-muted text-truncate mb-0 d-none">23 KM</p>
                                    </div>
                                    <div class="align-self-end ms-2 d-none">
                                        <p class="text-muted mb-0"><i class="mdi mdi-clock text-muted align-middle me-1"></i> ETA 20 Min</p>
                                    </div>
                                </div>

                                <div className='row'>

                                    <div class="col-12">
                                        <div class="card height-calc-twenty-4">
                                            <div class="card-body bg-money">

                                                <div class="text-muted mt-0">
                                                    <div class="d-flex flex-column">
                                                        <div class="avatar-sm mx-0 mb-3 ">
                                                            <span class="avatar-title rounded-circle bg-darker-money font-size-20"><i class="mdi mdi-cash text-white"></i></span>
                                                        </div>
                                                        <p class="mb-0 text-white opacity-75">Collected Revenue</p>
                                                        <h4 class="text-white fw-semibold text-uppercase">kes 8,252,255</h4>
                                                        <div>
                                                            <p class="text-muted mb-0 comparison-txt text-white opacity-75"><span class="text-white me-2 fw-semibold"><i
                                                                class="mdi mdi-arrow-down"></i> -2,534,032</span> Since Yesterday</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer bg-money p-4 bg-opacity-75 border-top">
                                                <p class="text-light opacity-75">Achieved <strong>5.56%</strong> of their <strong>KES 450,000</strong> target</p>
                                                <div class="progress border-radius-0">
                                                    <div class="progress-bar progress-bar-success border-radius-0" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div class="card-body bg-light d-flex justify-content-center align-items-center p-3">
                                            <div class="border-bottom">
                                                <div class="d-flex text-center flex-column">
                                                    <span className='bx bx-search text-info  font-30 mb-3'></span>
                                                    <h4>24 <sup class="text-dark opacity-75 pl-1">+1</sup></h4>
                                                    <p>Enforcement Querries</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div class="card-body bg-light d-flex justify-content-center align-items-center p-3">
                                            <div class="border-bottom">
                                                <div class="d-flex text-center flex-column">
                                                    <span className='bx bx-receipt text-info font-30 mb-3'></span>
                                                    <h4>24 <sup class="text-dark opacity-75 pl-1">+1</sup></h4>
                                                    <p>Receipted Transactions</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div class="card-body bg-light d-flex justify-content-center align-items-center p-3 mt-3">
                                            <div class="border-bottom">
                                                <div class="d-flex text-center flex-column">
                                                    <span className='bx bx-history text-info font-30 mb-3'></span>
                                                    <h4>34 <sup class="text-dark opacity-75 pl-1">+1</sup></h4>
                                                    <p>Attempted Transactions</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div class="card-body bg-light d-flex justify-content-center align-items-center p-3 mt-3">
                                            <div class="border-bottom">
                                                <div class="d-flex text-center flex-column">
                                                    <span className='mdi mdi-alert-outline text-danger font-30 mb-3'></span>
                                                    <h4>76 <sup class="text-dark opacity-75 pl-1">+1</sup></h4>
                                                    <p>Reported Issues</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="alert alert-primary alert-dismissible fade show d-flex mt-3" role="alert">
                                    <p class=" mb-0 ">
                                        <i class="mdi mdi-clock text-success align-middle me-3 font-size-24 ml-5 mr-5 "></i>
                                    </p>
                                    <div>
                                        <p class="text-muted mb-0 ">First activity of the day</p>
                                        <p class="mb-0 ">
                                            <strong class="fw-semibold">
                                                <span class="the-clicked-address ">Signed in at 8:56 AM on Tom Mboya Street</span>
                                            </strong>
                                        </p>
                                    </div>

                                </div>

                                <div class="alert alert-primary alert-dismissible fade show d-flex mt-3" role="alert">
                                    <p class=" mb-0 ">
                                        <i class="mdi mdi-account-convert text-primary align-middle me-3 font-size-24 ml-5 mr-5 "></i>
                                    </p>
                                    <div>
                                        <p class="text-muted mb-0 ">Most Recenet Activity</p>
                                        <p class="mb-0 ">
                                            <strong class="fw-semibold">
                                                <span class="the-clicked-address ">Created a Market Fees Bill for Obonyo Opio</span>
                                            </strong>
                                        </p>
                                    </div>

                                </div>

                                <div class="alert alert-primary alert-dismissible fade show d-flex" role="alert">
                                    <p class=" mb-0 ">
                                        <i class="mdi mdi-map-marker text-warning align-middle me-3 font-size-24 ml-5 mr-5 "></i>
                                    </p>
                                    <div>
                                        <p class="text-muted mb-0 ">Last Seen AT</p>
                                        <p class="mb-0 ">
                                            <strong class="fw-semibold">
                                                <span class="the-clicked-address ">Tom Mboya Street at 8:00 AM</span>
                                            </strong>
                                        </p>
                                    </div>

                                </div>


                                <ul class="verti-timeline list-unstyled ">
                                    <li class="event-list ">
                                        <div class="event-timeline-dot ">
                                            <i class="mdi mdi-bell-ring font-size-18 text-warning "></i>
                                        </div>
                                        <div class="d-flex ">

                                            <div class="flex-grow-1 ">
                                                <span class="text-muted ">
                                                    Received Order Request at (5:26 AM)
                                                </span>
                                                <div>
                                                    Standard media Mombasa road
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="event-list">
                                        <div class="event-timeline-dot ">
                                            <i class="mdi mdi-square font-size-18 text-black "></i>
                                        </div>
                                        <div class="d-flex ">

                                            <div class="flex-grow-1 ">
                                                <span class="text-muted ">
                                                    Base Location (5:26 AM)
                                                </span>
                                                <div>
                                                    90 Degrees by TSAVO, Nairobi, Kenya
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="event-list ">
                                        <div class="event-timeline-dot ">
                                            <i class="mdi mdi-circle font-size-18 text-primary "></i>
                                        </div>
                                        <div class="d-flex ">

                                            <div class="flex-grow-1 ">
                                                <span class="text-muted ">
                                                    Drop Off Point
                                                </span>
                                                <div>
                                                    Tulip House, Mombasa Road, Nairobi, Kenya
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="card-body bg-info bg-light d-flex mb-4 mt-4">
                                    <p class=" mb-0 ">
                                        <i class="mdi mdi-water text-info align-middle me-3 font-size-24 ml-5 mr-5 "></i>
                                    </p>
                                    <div>
                                        <p class="text-muted mb-0 ">Water Quantity</p>
                                        <p class="mb-0 ">
                                            <strong class="fw-semibold">
                                                <span class="">5,000 Li</span>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div class="card-body bg-light d-flex mb-4 mt-4">
                                    <p class=" mb-0 ">
                                        <i class="mdi mdi-cash-multiple text-success align-middle me-3 font-size-24 ml-5 mr-5 "></i>
                                    </p>
                                    <div>
                                        <p class="text-muted mb-0 ">Total Charges</p>
                                        <p class="mb-0 ">
                                            <strong class="fw-semibold">
                                                <span class="">KES 1,200</span>
                                            </strong>
                                        </p>
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
export default ClickedAgentTodayHighlights;