import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import ApexCharts from 'apexcharts'


import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


import $ from 'jquery';


// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Home=()=>{

    // loader setting
    const [loading, setLoading] = useState(false);
    const[adminFName,setAdminFName]=useState("")
    const[adminMidName,setAdminMidName]=useState(StdFunctions.adminMidName)
    const[adminLName,setAdminLName]=useState(StdFunctions.adminLName)
    const[adminEmail,setAdminEmail]=useState(StdFunctions.adminEmail)
    const[adminPhoneNo,setAdminPhoneNo]=useState(StdFunctions.adminPhoneNo)
    const[totalRev,setTotalRev]=useState(0)

    console.log(StdFunctions.adminFName)
    useEffect(()=>{
        setAdminFName(StdFunctions.adminFName)
        setAdminMidName(StdFunctions.adminMidName)
        setAdminEmail(StdFunctions.adminEmail)
        setAdminLName(StdFunctions.adminLName)
        setAdminPhoneNo(StdFunctions.adminPhoneNo)
        setTotalRev(14500)
    },[])


    // highchart trial

   
    // end of highchart trial


    //=========================================
    //start of charts scripts
    //=======================================

    //Transaction edits chart
   

      //transaction donut chart en

      //Revenue sources chart start
      const ChartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
          type: 'pie',
          style: {
            fontFamily: 'Poppins'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        tooltip: {
            pointFormat: '{series.name}: <b>KES {point.y}</b>'
        },
        title: {
            text: '<b>'+StdFunctions.kenyaCurrency(totalRev)+'</b>',
            align: 'center',
            fontSize: 34,
            verticalAlign: 'middle',
            y: 10,
            itemStyle: {
                color: '#000000',
                fontWeight: 'bold',
                fontSize: 20,
              },
        },
       
        subtitle: {
            text: 'TOTAL REVENUE',
            align: 'center',
            fontSize: 14,
            verticalAlign: 'middle',
            y: 25,
        },
        plotOptions: {
            pie: {
                innerSize: 180,
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    formatter: function(){
                        return Highcharts.numberFormat(this.y,0);
                    },
                    distance: -30,
                    formatter:function() {
                        var pcnt = (this.y / this.series.data.map(p => p.y).reduce((a, b) => a + b, 0)) * 100;
                        return Highcharts.numberFormat(pcnt) + '%';
                    },
                    // color:"white"
                },
                showInLegend: false,
                borderWidth: 0
            }
        },
        series: [
          {
            name:"Collected Revenue",
            data: [{
                name: 'Transaction Fees',
                y: 10000,
                color:"#EC451F"

            }, {
                name: 'Card Purchase',
                y: 4500,
                color:'#FDAE99'
            }]
          }
        ]
      };
    //   revenue sources end
     

      //========================================
      //**end of chart scripts */
      //=========================================
   

   

    $('body').unbind().on('click','.nav-item .nav-link',function(){
        $(this).addClass('active').parent().siblings().children().removeClass('active')
     })

     //this helps with disabing double charts with apex for some reason
     window.dispatchEvent(new Event('resize'));
     
 
     
   

   
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
                    <h4 className="text-black pt-0 pl-0 pb-3 p-3  fw-medium m-0 text-capitalize">Hello, {adminFName}</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-4">
                    <div className="card bg-white">
                        <div className="card-header bg-white d-flex justify-content-between ">
                            <div>
                                <h4 className="card-title mb-0">Colelcted Revenue</h4>
                                <small>Today</small>
                            </div>
                            <div className="float-end">
                                <button type="button" class="btn  btn-outline-dark  waves-effect btn-label waves-light">
                                    <i class="mdi mdi-calendar-month label-icon"></i> Live Now
                                </button> 
                            </div>
                        </div>
                        <div className="card-body bg-white">
                            <div class="pb-3">
                                <HighchartsReact highcharts={Highcharts} options={ChartOptions} />
                                <div></div>
                            </div>
                            <div className="bg-light p-3">
                                <div className="pb-4 pt-3 d-flex align-items-start">
                                    <span className="bg-light-danger font-24 badge-soft-danger p-3 rounded me-3"><i className="dripicons-warning "></i></span>
                                    <div >
                                        <h6 className="mb-0">Transaction Edits</h6>
                                        <p><small>Payment edits recorded today and their value</small></p>
                                    </div>

                                    <div>
                                        <div id="char"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center">
                                        <h3 className="mb-0 pb-0 pr-2">KES 2,230</h3>
                                        <span class="badge bg-info h-auto font-size-12"> 3 Edits </span>
                                    </div>
                                </div>
                                <button className="btn btn-primary w-100 text-uppercase text-center mt-3">Payment Transafer</button>

                            </div>                       
                        
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-7 col-lg-8">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                <HighchartsReact highcharts={Highcharts} options={ChartOptions} />
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