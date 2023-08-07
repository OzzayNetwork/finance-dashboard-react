import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import TransactionEdit from "./paymentEdits/transaction.edit";
import Moment from 'moment'
import { Link, useLocation, matchRoutes } from "react-router-dom";
import ApexCharts from 'apexcharts'


import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import $ from 'jquery';

highchartsMore(Highcharts);
solidGauge(Highcharts);


// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Home = () => {

    // loader setting
    const [loading, setLoading] = useState(false);


    window.addEventListener("scroll", (event) => {
        let scroll = document.$("scrol-elemetn").getBoundingClientRect().top;
        console.log(scroll)
    });
    // highchart trial


    // end of highchart trial


    //=========================================
    //start of charts scripts
    //=======================================

    const TotalHourlyCollectionsChart = {
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
            min: 6, // start from 6AM
            max: 19, // end at 7PM
            scrollbar: { // add a scrollbar to the X axis
                enabled: true
            }
        },

        xAxis: {
            categories: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1Pm', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
            crosshair: true,
            accessibility: {
                description: 'Hours of The Day'
            },
            scrollbar: { // add a scrollbar to the X axis
                enabled: true
            },
            events: {
                afterSetExtremes: function (e) {
                    // check if the user has zoomed in or out of the chart
                    if (!e.trigger || e.trigger === "navigator") {
                        // if not, set the default range from 6AM to 7PM
                        this.setExtremes(6, 19);
                    }
                }
            }
        },

        yAxis: {
            min: 0,
            title: {
                text: null
            },
            gridLineDashStyle: 'dot'
        },
        tooltip: {
            valuePrefix: 'KES ',
            shared: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                // borderRadius: 1, // a pixel value specifying the radius of the rounded corners
                borderRadius: {
                    radius: 0
                },
            },


        },
        series: [
            {
                name: 'Today',
                color: 'black',
                data: [51086, 136000, 5500, 141000,
                    107180,
                    77000,
                    51086,
                    136000,
                    5500,
                    141000,
                    107180,
                    77000,
                    51086,
                    136000,
                    5500,
                    141000,
                    107180,
                    77000,
                    51086,
                    136000,
                    5500,
                    141000,
                    107180,
                    77000]
            },
            {
                name: 'Last Monday',
                color: '#dfd2c1',
                data: [406292, 260000, 107000, 68300,
                    27500,
                    14500,
                    406292,
                    260000,
                    107000,
                    68300,
                    27500,
                    14500,
                    406292,
                    260000,
                    107000,
                    68300,
                    27500,
                    14500,
                    406292,
                    260000,
                    107000,
                    68300,
                    27500,
                    14500]
            },

            {
                name: 'Yesterday',
                color: '#949b93',
                data: [30000, 80000, 10000, 120000,
                    90000,
                    60000,
                    30000,
                    80000,
                    10000,
                    120000,
                    90000,
                    60000,
                    30000,
                    80000,
                    10000,
                    120000,
                    90000,
                    60000,
                    30000,
                    80000,
                    10000,
                    120000,
                    90000,
                    60000]
            },
            // copy and paste the object below
            {
                type: 'spline', // specify the type of the series as spline
                name: 'Direct Payments', // name of the series
                color: '#B96767', // color of the line
                data: [10000, 20000, 15000, 30000,
                    25000,
                    20000,
                    10000,
                    20000,
                    15000,
                    30000,
                    25000,
                    20000,
                    100000,
                    250000,
                    155000,
                    305000,
                    25000,
                    20000,
                    10000,
                    20000,
                    15000,
                    30000,
                    25000,
                    20000], // data values for each hour
                marker: {
                    enabled: false // disable the markers (circles) on the line
                }
            }
        ]
    }

    const outLoggedAgentsHourly = {
        chart: {
            type: 'column',
            height: 100 // add this line to reduce the height to 66px
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: false, // add this line to remove the x axis labels
                autoRotation: [-45, -90],
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            gridLineWidth: 0, // add this line to remove the vertical grid lines
            lineWidth: 0 ,// add this line to remove the x-axis line
            crosshair: true // default cross hair

        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            labels: {
                enabled: false, // add this line to remove the y axis labels
            },
            gridLineWidth: 0, // add this line to remove the horizontal grid lines
            lineWidth: 0, // add this line to remove the y-axis line
        },
        

      
        legend: {
            enabled: false
        },
        tooltip: {
            // other properties
            style: {
            fontSize: '10px', // change this to a smaller value
            padding: '5px', // change this to a smaller value
            borderRadius: '0px' // change this to a smaller value or 0 for no rounding
            }
            },
        plotOptions: {
            column: {
                borderRadius: 0 ,// add this line to make the columns have a rounded tip
                borderRadius: {
                    radius: 0
                },
            }
        },
        series: [{
            name: 'Inactive Agents',
            colors: [
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ef1626', // keep this color for the last column
            ],
           
            colorByPoint: true,
            groupPadding: 0,
            dataLabels: { // modify this object for the label style
                enabled: false,
                color: '#000000', // change this color to make the label black
                align: 'right',
                x: -10,
                y: 20,
                formatter: function () {
                    return this.y;
                },
                style: {
                    font: 'normal 13px Verdana, sans-serif'
                }
            },
            data: [
                ['3AM-4AM', 3],
                ['4AM-5AM', 7],
                ['5AM-6AM', 27],
                ['7AM-8AM', 31],
                ['8AM-9AM', 27],
                ['9AM-10AM', 22],
                ['10AM-11AM', 71],
                ['11AM-12AM', 21],
                ['12AM-7PM', 21],

            ],

        }]
    }

    const idleAgentsHourly = {
        chart: {
            type: 'column',
            height: 100 // add this line to reduce the height to 66px
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: false, // add this line to remove the x axis labels
                autoRotation: [-45, -90],
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            gridLineWidth: 0, // add this line to remove the vertical grid lines
            lineWidth: 0 ,// add this line to remove the x-axis line
            crosshair: true // default cross hair

        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            labels: {
                enabled: false, // add this line to remove the y axis labels
            },
            gridLineWidth: 0, // add this line to remove the horizontal grid lines
            lineWidth: 0, // add this line to remove the y-axis line
        },
        

      
        legend: {
            enabled: false
        },
        tooltip: {
            // other properties
            style: {
            fontSize: '10px', // change this to a smaller value
            padding: '5px', // change this to a smaller value
            borderRadius: '0px' // change this to a smaller value or 0 for no rounding
            }
            },
        plotOptions: {
            column: {
                borderRadius: 0 ,// add this line to make the columns have a rounded tip
                borderRadius: {
                    radius: 0
                },
            }
        },
        series: [{
            name: 'Idle Agents',
            colors: [
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ef1626', // keep this color for the last column
            ],
            colors: [
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#ffe394', // light yellow
                '#fd8200', // bright yellow
                ],
            colorByPoint: true,
            groupPadding: 0,
            dataLabels: { // modify this object for the label style
                enabled: false,
                color: '#000000', // change this color to make the label black
                align: 'right',
                x: -10,
                y: 20,
                formatter: function () {
                    return this.y;
                },
                style: {
                    font: 'normal 13px Verdana, sans-serif'
                }
            },
            data: [
                ['3AM-4AM', 3],
                ['4AM-5AM', 7],
                ['5AM-6AM', 27],
                ['7AM-8AM', 31],
                ['8AM-9AM', 27],
                ['9AM-10AM', 22],
                ['10AM-11AM', 71],
                ['11AM-12AM', 21],
                ['12AM-7PM', 21],

            ],

        }]
    }

    const outOfRangeAgents = {
        chart: {
            type: 'column',
            height: 100 // add this line to reduce the height to 66px
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            type: 'category',
            labels: {
                enabled: false, // add this line to remove the x axis labels
                autoRotation: [-45, -90],
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            gridLineWidth: 0, // add this line to remove the vertical grid lines
            lineWidth: 0 ,// add this line to remove the x-axis line
            crosshair: true // default cross hair

        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            labels: {
                enabled: false, // add this line to remove the y axis labels
            },
            gridLineWidth: 0, // add this line to remove the horizontal grid lines
            lineWidth: 0, // add this line to remove the y-axis line
        },
        

      
        legend: {
            enabled: false
        },
        tooltip: {
            // other properties
            style: {
            fontSize: '10px', // change this to a smaller value
            padding: '5px', // change this to a smaller value
            borderRadius: '0px' // change this to a smaller value or 0 for no rounding
            }
            },
        plotOptions: {
            column: {
                borderRadius: 0 ,// add this line to make the columns have a rounded tip
                borderRadius: {
                    radius: 0
                },
            }
        },
        series: [{
            name: 'Agents Out Of Range',
            colors: [
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ffeaed', // replace this color with #ffeaed
                '#ef1626', // keep this color for the last column
            ],
            colors: [
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#e3dede', // light yellow
                '#777373', // bright yellow
                ],
            colorByPoint: true,
            groupPadding: 0,
            dataLabels: { // modify this object for the label style
                enabled: false,
                color: '#000000', // change this color to make the label black
                align: 'right',
                x: -10,
                y: 20,
                formatter: function () {
                    return this.y;
                },
                style: {
                    font: 'normal 13px Verdana, sans-serif'
                }
            },
            data: [
                ['3AM-4AM', 3],
                ['4AM-5AM', 7],
                ['5AM-6AM', 27],
                ['7AM-8AM', 31],
                ['8AM-9AM', 27],
                ['9AM-10AM', 22],
                ['10AM-11AM', 71],
                ['11AM-12AM', 21],
                ['12AM-7PM', 21],

            ],

        }]
    }





    //========================================
    //**end of chart scripts */
    //=========================================


    //========================================
    //**** user numbers ***
    //========================================



    //========================================
    //**** user numbers ***
    //========================================




    $('body').unbind().on('click', '.nav-item .nav-link', function () {
        $(this).addClass('active').parent().siblings().children().removeClass('active')
    })

    //this helps with disabing double charts with apex for some reason
    window.dispatchEvent(new Event('resize'));






    return (
        <>
            <TransactionEdit></TransactionEdit>



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
            ) : (
                <h1 className="d-none">Found</h1>
            )
            }

            <Helmet>
                <title>Blink! Admin | Admins Portal</title>
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
                        <h4 className="text-black pt-0 pl-0 pb-3 p-3  fw-medium m-0 text-capitalize">Hello, {"Kelvin"}</h4>
                    </div>
                </div>


                <div className='row'>

                    <div class="col-md-5 col-lg-4 col-sm-12">
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
                                                <h5 class="text-white fw-semibold text-uppercase text-black fw-bold">kes 12,890</h5>
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
                        </div>
                        <div className='card'>
                            <div className='card-body'></div>
                        </div>
                    </div>

                    <div class="col-md-7 col-lg-8 col-sm-12">
                        <div className='row'>

                            <div class="col-sm-4">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-black fe-semibold mb-1 d-flex align-items-center">
                                            <a href="javascript: void(0);" class="me-2">
                                                <div class="avatar-sm">
                                                    <span class="avatar-title rounded-circle bg-danger bg-soft text-danger font-size-30">
                                                        <i class="mdi mdi-account-off"></i>
                                                    </span>
                                                </div>
                                            </a>
                                            <span> Logged Out Revenue Agents</span>
                                        </p>

                                        <div class="row">
                                            <div class="col-6 d-flex justify-content-end flex-column">
                                                <div>
                                                    <h4 className='text-black fw-bold'>120</h4>
                                                    <p class="text-muted mb-0 text-danger"><i class="mdi mdi-arrow-up ms-1 text-danger"></i> + 3 in Last 1 Hr</p>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div>
                                                    <div data-colors='["--bs-warning"]' class="apex-charts">
                                                        <HighchartsReact highcharts={Highcharts} options={outLoggedAgentsHourly} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-black fe-semibold mb-1 d-flex align-items-center">
                                            <a href="javascript: void(0);" class="me-2">
                                                <div class="avatar-sm">
                                                    <span class="avatar-title rounded-circle bg-warning bg-soft text-warning font-size-30">
                                                        <i class="mdi mdi-account-alert"></i>
                                                    </span>
                                                </div>
                                            </a>
                                            <span> Idle Revenue Agents</span>
                                        </p>

                                        <div class="row">
                                            <div class="col-6 d-flex justify-content-end flex-column">
                                                <div>
                                                    <h4 className='text-black fw-bold'>56</h4>
                                                    <p class="text-muted mb-0 text-danger"><i class="mdi mdi-arrow-up ms-1 text-danger"></i> + 7 in Last 1 Hr</p>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div>
                                                    <div data-colors='["--bs-warning"]' class="apex-charts">
                                                        <HighchartsReact highcharts={Highcharts} options={idleAgentsHourly} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="card">
                                    <div class="card-body">
                                        <p class="text-black fe-semibold mb-1 d-flex align-items-center">
                                            <a href="javascript: void(0);" class="me-2">
                                                <div class="avatar-sm">
                                                    <span class="avatar-title rounded-circle bg-secondary bg-soft text-secondary font-size-30">
                                                        <i class="mdi mdi-map-marker-off"></i>
                                                    </span>
                                                </div>
                                            </a>
                                            <span> Out Of Range</span>
                                        </p>

                                        <div class="row">
                                            <div class="col-6 d-flex justify-content-end flex-column">
                                                <div className=''>
                                                    <h4 className='text-black fw-bold'>56</h4>
                                                    <p class="text-muted mb-0 text-danger"><i class="mdi mdi-arrow-up ms-1 text-danger"></i> + 7 in Last 1 Hr</p>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div>
                                                    <div data-colors='["--bs-warning"]' class="apex-charts">
                                                        <HighchartsReact highcharts={Highcharts} options={outOfRangeAgents} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='card'>
                            <div className='card-body bg-white border-bottom-1'>
                                <h4 className='card-title '>Hourly Collections comparison By Day</h4>
                            </div>
                            <div className='card-body'>
                                <div className='row'>

                                    <div className='col-12'>

                                        <div className='d-flex mb-3 justify-content-between'>

                                            <div class="">

                                                <h3 class="text-danger fw-semibold mb-0">
                                                    <span className='bx bx-caret-down me-1'></span>
                                                    <span>KES 2,000</span>
                                                </h3>
                                                <div>
                                                    <p class="text-muted">From Prev Day</p>
                                                </div>
                                            </div>
                                            <div className='text-right d-flex'>
                                                <div class="">

                                                    <h3 class="text-black fw-semibold mb-0">

                                                        <span>90</span>
                                                    </h3>
                                                    <div>
                                                        <p class="text-muted">Inspections</p>
                                                    </div>
                                                </div>

                                                <div class="mx-4">

                                                    <h3 class="text-black fw-semibold mb-0">

                                                        <span>56</span>
                                                    </h3>
                                                    <div>
                                                        <p class="text-muted">Transactions</p>
                                                    </div>
                                                </div>

                                                <div class="">

                                                    <h3 class="text-black fw-semibold mb-0">

                                                        <span>90.08%</span>
                                                    </h3>
                                                    <div>
                                                        <p class="text-muted">Revenue Growth</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div>
                                            <HighchartsReact highcharts={Highcharts} options={TotalHourlyCollectionsChart} />
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
export default Home;