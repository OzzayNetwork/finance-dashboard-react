import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'
import { Link, useLocation, matchRoutes } from "react-router-dom";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import highchartsMore from "highcharts/highcharts-more";


import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const ClickedAgentTodayHighlights = (props) => {

    const hourlyCollectionsChart = {
        chart: {
            type: 'column',
            zoomType: 'x',// or 'x' or 'y'
            zoomBySingleTouch: true,
        },
        title: {
            text: null,
            align: 'left'
        },
        subtitle: {
            text: null,
            align: 'left'
        },
        xAxis: {
            categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1Pm', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
            crosshair: true,
            accessibility: {
                description: 'Hours of The Day'
            },
            // min: 6, // start from 6AM
            // max: 19, // end at 7PM
            scrollbar: { // add a scrollbar to the X axis
                enabled: true
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            valuePrefix: 'KES ',
            shared: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0,
                borderRadius: {
                    radius: 0
                },
            },


        },
        series: [
            {
                name: 'Last Monday',
                color: "#51b4a6",
                data: [406292, 260000, 107000, 68300, 27500, 14500, 406292, 260000, 107000, 68300, 27500, 14500, 406292, 260000, 107000, 68300, 27500, 14500, 406292, 260000, 107000, 68300, 27500, 14500]
            },
            {
                name: 'Today',
                color: "#0f6757",
                data: [51086, 136000, 5500, 141000, 107180, 77000, 51086, 136000, 5500, 141000, 107180, 77000, 51086, 136000, 5500, 141000, 107180, 77000, 51086, 136000, 5500, 141000, 107180, 77000]
            }
        ]
    }
    const collectionsByRevenueStream = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: null // or rgba(0,0,0,0)
        },
        title: {
            text: null,
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'Collected Revenue <b>KES {point.y}</b><br/>' +
                'No. Of Transactions <b>{point.z}</b><br/>'
        },

        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    },
                    format: '({point.percentage:.1f}%) {point.name}:' // or any other format you prefer
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%',
                showInLegend: true
            }
        },
        colors: [
            '#0acb3c', // pure green
            '#0aab3c', // lime green
            '#0a8b3c', // light green
            '#0a6b3c', // lighter green
            '#0a4b3c', // reference green
            '#0a2b3c', // darker green
            '#0a0b3c', // very dark green
            '#080b3c', // almost black
            '#060b3c', // blackish green
            '#040b3c' // blacker green
        ],
        series: [{
            type: 'pie',
            name: 'Revenue Streams',

            borderRadius: 5,
            innerSize: '60%',
            data: [{
                name: 'Parking',
                y: 505992,
                z: 92
            }, {
                name: 'Cess Fees',
                y: 551695,
                z: 119
            }, {
                name: 'Market Fees',
                y: 312679,
                z: 121
            }, {
                name: 'House Rents',
                y: 78865,
                z: 136
            }, {
                name: 'Land Rate',
                y: 301336,
                z: 200
            }, {
                name: 'SBP',
                y: 41284,
                z: 213
            }],
        }]

    }

    return (
        <>
            <Helmet>
                <title>Blink! | Account Details</title>
            </Helmet>
            {/* the modals container */}
            <button class="btn btn-primary openMapCanvas d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mapCanvas">
                open Marker Conent Canavas
            </button>

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
                                        <h5 class="card-title text-truncate mb-4"><a href="javascript: void(0);" class="text-body">Today's Summary</a></h5>
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
                                                        <p class="mb-0 text-white opacity-75">Revenue Contribution</p>
                                                        <h4 class="text-white fw-semibold text-uppercase">kes 12,890</h4>
                                                        <div>
                                                            <p class="text-muted mb-0 comparison-txt text-white opacity-75"><span class="text-white me-2 fw-semibold"><i
                                                                class="mdi mdi-arrow-down"></i> -2,534</span> Since Yesterday</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer bg-money p-4 bg-opacity-75 border-top">
                                                <p class="text-light opacity-75">Achieved <strong>5.56%</strong> of their <strong>KES 23,456</strong> target</p>
                                                <div class="progress border-radius-0">
                                                    <div class="progress-bar progress-bar-success border-radius-0" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div class="alert alert-success border-success border-2" role="alert">

                                            <div>
                                                <p class="text-muted mb-">Collected <br></br> Revenue</p>
                                                <h5 class="mb-0 "><strong class="fw-semibold"><span class="the-clicked-address "></span>KES 10,000</strong></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div class="alert alert-success border-success border-2" role="alert">

                                            <div>
                                                <p class="text-muted mb- ">Enforced/Verrified Revenue</p>
                                                <h5 class="mb-0 "><strong class="fw-semibold"><span class="the-clicked-address "></span>KES 2,890</strong></h5>
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

                            </div>
                        </div>
                    </div>

                    <div className='card shadow-none border'>
                        <div className='card-body p-3'>
                            <div class="d-flex"><div class="overflow-hidden me-auto"><h5 class="card-title text-truncate mb-4"><a href="javascript: void(0);" class="text-body">Alex's Hourly Collections</a></h5><p class="text-muted text-truncate mb-0 d-none">23 KM</p></div><div class="align-self-end ms-2 d-none"><p class="text-muted mb-0"><i class="mdi mdi-clock text-muted align-middle me-1"></i> ETA 20 Min</p></div></div>
                            <p>To zoom in, either <strong> drag out a rectangle on the chart with your mouse</strong> or <strong>pinch in the chart timeline with two fingers</strong>. The chart will zoom to the selected timeline.</p>
                            <p>To zoom out, click the <strong>Reset zoom</strong> button</p>
                            <HighchartsReact highcharts={Highcharts} options={hourlyCollectionsChart} />
                        </div>
                    </div>

                    <div className='card shadow-none border border-success border-2'>
                        <div className='card-body p-3'>
                            <div class="d-flex"><div class="overflow-hidden me-auto"><h5 class="card-title text-truncate mb-4"><a href="javascript: void(0);" class="text-body">Revenue Source Composition of Kelvin's Collections</a></h5><p class="text-muted text-truncate mb-0 d-none">23 KM</p></div><div class="align-self-end ms-2 d-none"><p class="text-muted mb-0"><i class="mdi mdi-clock text-muted align-middle me-1"></i> ETA 20 Min</p></div></div>
                            <HighchartsReact highcharts={Highcharts} options={collectionsByRevenueStream} />
                        </div>
                    </div>

                    <div className='card shadow-none border border-warning border-2'>
                        <div className='card-body p-3'>
                            <div class="d-flex"><div class="overflow-hidden me-auto"><h5 class="card-title text-truncate mb-4"><a href="javascript: void(0);" class="text-body">Todays Rating</a></h5><p class="text-muted text-truncate mb-0 d-none">23 KM</p></div><div class="align-self-end ms-2 d-none"><p class="text-muted mb-0"><i class="mdi mdi-clock text-muted align-middle me-1"></i> ETA 20 Min</p></div></div>
                            <div>
                                <h1 class="display-5 fw-bold">4.0</h1>
                                <div>
                                    <table class="table borderless text-capitalize">
                                        <tbody>
                                            <tr>
                                                <td>yesterday comparison</td>
                                                <td colspan="2" style={{ width: "70%" }}>
                                                    <div class="progress mb-4 border-radius-0">
                                                        <div class="progress-bar bg-warning border-radius-0" role="progressbar " style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Last Monday</td>
                                                <td colspan="2">
                                                    <div class="progress mb-4 border-radius-0">
                                                        <div class="progress-bar bg-info border-radius-0" role="progressbar " style={{ width: "80%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Revenue Target</td>
                                                <td colspan="2">
                                                    <div class="progress mb-4 border-radius-0">
                                                        <div class="progress-bar bg-danger border-radius-0" role="progressbar " style={{ width: "30%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Served Payers</td>
                                                <td colspan="2">
                                                    <div class="progress mb-4 border-radius-0">
                                                        <div class="progress-bar bg-info border-radius-0" role="progressbar " style={{ width: "60%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                            </table>
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