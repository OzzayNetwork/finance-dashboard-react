import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../services/auth.service";
import StdFunctions from "../services/standard.functions";
import TransactionEdit from "./paymentEdits/transaction.edit";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import ApexCharts from 'apexcharts'


import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import $ from 'jquery';

highchartsMore(Highcharts);
solidGauge(Highcharts);


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

    //user numbers
    const [guardiansNos,setGuardiansNos]=useState(0)
    const [blinkersNos,setBlinkersNos]=useState("")
    const [merchantsNos,setMerchantsNos]=useState(0)
    const [bursersNos,setBursersNos]=useState(0)
    const [schoolAdminNos,setSchoolAdminNos]=useState(0)
    const [schoolNos,setSchoolNos]=useState(0)

    //quick stats
    const[todaysDeposits,setTodayDeposits]=useState(0)
    const[todaysExpenditure,setTodayExpenditure]=useState(0)
    const[todayEndDate,setTodayEndDate]=useState(Moment().format('YYYY-MM-DD 23:59:59'))
    const[todayStartDate,setTodayStartDate]=useState(Moment().format('YYYY-MM-DD 00:00:00'))

    const[yesterdaysDeposit,setYesterdaydeposits]=useState(0)
    const[yesterdayExpenditure,setYesterdayExpenditure]=useState(0)
    const[yesterdayEndDate,setYesterdayEndDate]=useState(Moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59'))
    const[yesterdayStartDate,setYesterdayStartDate]=useState(Moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'))

    const[weeklyDeposits,setWeeklyDeposits]=useState(0)
    const[weeklyExpenditure,setWeeklyExpenditure]=useState(0)
    Moment().startOf('isoWeek')
    const[startOfWeek,setStartOfWeek]=useState(Moment().startOf('isoWeek').format('YYYY-MM-DD 00:00:00'))
    const[endOfWeek,setEndOfWeek]=useState(Moment().endOf('isoWeek').format('YYYY-MM-DD 23:59:59'))

    //last week numbers
    const[lastWeekDeposits,setLastWeekDeposits]=useState(0)
    const[lastWeekExpenditure,setLastWeekExpenditure]=useState(0)
    Moment().startOf('isoWeek')
    const[startOfLastWeek,setStartOfLastWeek]=useState(Moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD 00:00:00'))
    const[endOfLastWeek,setEndOfLastWeek]=useState(Moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD 23:59:59'))

    const[monthlyDeposits,setMonthlyDeposits]=useState(0)
    const[monthlyExpenditure,setMonthlyExpenditure]=useState(0)
    const[startOfMonth,setStartOfMonth]=useState(Moment().startOf('month').format('YYYY-MM-DD 00:00:00'))
    const[endOfMonth,setEndOfMonth]=useState(Moment().endOf('month').format('YYYY-MM-DD 23:59:59'))

    //last mont numbers
    const[lastMonthDeposits,setLastMonthDeposits]=useState(0)
    const[lastMonthExpenditure,setLastMonthExpenditure]=useState(0)
    const[startOfLastMonth,setStartOfLastMonth]=useState(Moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD 00:00:00'))
    const[endOfLastMonth,setEndOfLastMonth]=useState(Moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD 23:59:59'))

    // setting the stats loader timer
    const [toggle, setToggle] = useState(false)

    //Days of the week

    //monday
    const[startOfMonday,getStartOfMonday]=useState(Moment().startOf('isoWeek').format('YYYY-MM-DD 00:00:00'))
    const[endOfMonday,getEndOfMonday]=useState(Moment().startOf('isoWeek').format('YYYY-MM-DD 23:59:59'))
    const[mondayDeposits,setMondayDeposits]=useState(0)
    const[mondayExpenditure,setMondayExpenditure]=useState(0)
    const[mondayRevenue,setMondayRevenue]=useState(0)

    //tuesday
    const[startOfTuesday,getStartOfTuesday]=useState(Moment().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD 00:00:00'))
    const[endOfTuesday,getEndOfTuesday]=useState(Moment().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD 23:59:59'))
    const[tuesdayDeposits,setTuesdayDeposits]=useState(0)
    const[tuesdayExpenditure,setTuesdayExpenditure]=useState(0)
    const[tuesdayRevenue,setTuesdayRevenue]=useState(0)
    //alert(Moment().startOf('isoWeek').add(1, 'days').format('YYYY-MM-DD 00:00:00'))

    //wednesday
    const[startOfWed,getStartOfWed]=useState(Moment().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD 00:00:00'))
    const[endOfWed,getEndOfWed]=useState(Moment().startOf('isoWeek').add(2, 'days').format('YYYY-MM-DD 23:59:59'))
    const[wedDeposits,setWedDeposits]=useState(0)
    const[wedExpenditure,setWedExpenditure]=useState(0)
    const[wedRevenue,setWedRevenue]=useState(0)

    //thursday
    const[startOfThus,getStartOfThus]=useState(Moment().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD 00:00:00'))
    const[endOfThus,getEndOfThus]=useState(Moment().startOf('isoWeek').add(3, 'days').format('YYYY-MM-DD 23:59:59'))
    const[thusDeposits,setThusDeposits]=useState(0)
    const[thusExpenditure,setThusExpenditure]=useState(0)
    const[thusRevenue,setThusRevenue]=useState(0)

     //Friday
     const[startOfFriday,getStartOfFriday]=useState(Moment().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD 00:00:00'))
     const[endOfFriday,getEndOfFriday]=useState(Moment().startOf('isoWeek').add(4, 'days').format('YYYY-MM-DD 23:59:59'))
     const[fridayDeposits,setFridayDeposits]=useState(0)
     const[fridayExpenditure,setFridayExpenditure]=useState(0)
     const[fridayRevenue,setFridayRevenue]=useState(0)

     //Saturday
     const[startOfSat,getStartOfSat]=useState(Moment().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD 00:00:00'))
     const[endOfSat,getEndOfSat]=useState(Moment().startOf('isoWeek').add(5, 'days').format('YYYY-MM-DD 23:59:59'))
     const[satDeposits,setSatDeposits]=useState(0)
     const[satExpenditure,setSatExpenditure]=useState(0)
     const[satRevenue,setSatRevenue]=useState(0)

     //Sunday
     const[startOfSun,getStartOfSun]=useState(Moment().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD 00:00:00'))
     const[endOfSun,getEndOfSun]=useState(Moment().startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD 23:59:59'))
     const[sunDeposits,setSunDeposits]=useState(0)
     const[sunExpenditure,setSunExpenditure]=useState(0)
     const[sunRevenue,setSunRevenue]=useState(0)

     //end of the days of the week
   


    console.log(StdFunctions.adminFName)
    useEffect(()=>{
        setAdminFName(StdFunctions.adminFName)
        setAdminMidName(StdFunctions.adminMidName)
        setAdminEmail(StdFunctions.adminEmail)
        setAdminLName(StdFunctions.adminLName)
        setAdminPhoneNo(StdFunctions.adminPhoneNo)
        setTotalRev(14500)
    },[])

    //getting quick stats
    useEffect(()=>{
        //getStats(transType,toDateTime,fromDateTime)
        console.log("here")
        //alert("updating")

        AuthService.getStats("Today's Deposit","Deposit",todayEndDate,todayStartDate,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setTodayDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Today's Expenditure By Students","Merchant_Pay",todayEndDate,todayStartDate,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setTodayExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        // getting yesterdays numbers
        AuthService.getStats("Yesterdays Deposit","Deposit",yesterdayEndDate,yesterdayStartDate,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setYesterdaydeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Yesterdays Expenditure By Students","Merchant_Pay",yesterdayEndDate,yesterdayStartDate,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setYesterdayExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Weekly Deposits by Parents","Deposit",endOfWeek,startOfWeek,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setWeeklyDeposits(res.data.data.totals)
                // alert("weekly found")
                //alert(startOfWeek)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })


        AuthService.getStats("Weekly Expenditure By Students","Merchant_Pay",endOfWeek,startOfWeek,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setWeeklyExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        // last weeks numbers
        AuthService.getStats("Lats weeks Deposits by Parents","Deposit",endOfLastWeek,startOfLastWeek,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setLastWeekDeposits(res.data.data.totals)                
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })


        AuthService.getStats("last weeks Expenditure By Students","Merchant_Pay",endOfLastWeek,startOfLastWeek,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setLastWeekExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })


        AuthService.getStats("This Months Deposits by parents","Deposit",endOfMonth,startOfMonth,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setMonthlyDeposits(res.data.data.totals)
                // alert(startOfMonth)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Monthly Expenditure By Students","Merchant_Pay",endOfMonth,startOfMonth,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setMonthlyExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        //last month numbers
        AuthService.getStats("This Months Deposits by parents","Deposit",endOfLastMonth,startOfLastMonth,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setLastMonthDeposits(res.data.data.totals)
                // alert(startOfMonth)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Last Months Expenditure By Students","Merchant_Pay",endOfLastMonth,startOfLastMonth,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setLastMonthExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })
    },[toggle])

    //getting the data for the bar chart
    useEffect(()=>{
        setTimeout(() => setToggle((prevToggle) => !prevToggle), 100000);

        //monday Numbers
        AuthService.getStats("Monday's Deposit","Deposit",endOfMonday,startOfMonday,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setMondayDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Monday's Expenditure By Students","Merchant_Pay",endOfMonday,startOfMonday,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setMondayExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        //tuesdya stats
        AuthService.getStats("Monday's Deposit","Deposit",endOfTuesday,startOfTuesday,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setTuesdayDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Monday's Expenditure By Students","Merchant_Pay",endOfTuesday,startOfTuesday,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setTuesdayExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        //wednesdya stats
        AuthService.getStats("Wednesday's Deposit","Deposit",endOfWed,startOfWed,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setWedDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Wednesday's Expenditure By Students","Merchant_Pay",endOfWed,startOfWed,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setWedExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        //thursday numbers
        AuthService.getStats("Thursday's Deposit","Deposit",endOfThus,startOfThus,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setThusDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Thursday's Expenditure By Students","Merchant_Pay",endOfThus,startOfThus,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setThusExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        //Friday numbers
        AuthService.getStats("Friday's Deposit","Deposit",endOfFriday,startOfFriday,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setFridayDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Friday's Expenditure By Students","Merchant_Pay",endOfFriday,startOfFriday,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setFridayExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })


        //saturday numbers 
        AuthService.getStats("Saturday's Deposit","Deposit",endOfSat,startOfSat,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setSatDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Saturday's Expenditure By Students","Merchant_Pay",endOfSat,startOfSat,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setSatExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        //sunday numbers
        AuthService.getStats("Sundayy's Deposit","Deposit",endOfSun,startOfSun,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setSunDeposits(res.data.data.totals)
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })

        AuthService.getStats("Sunday's Expenditure By Students","Merchant_Pay",endOfSun,startOfSun,"Student").then((res)=>{   
            console.log(res.data.data.totals)         
              if(res.data.statusCode==="OK"){
                setSunExpenditure(res.data.data.totals)
                // alert("weekly found")
              }
              else{
              }
        }).catch((err)=>{
            console.log(err) 
                    
        })
        //alert("we have been refreshed")


    },[toggle])

    window.addEventListener("scroll", (event) => {
        let scroll = document.$("scrol-elemetn").getBoundingClientRect().top;
        console.log(scroll)
    });
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
            y: 0,
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
            y: 15,
        },
        plotOptions: {
            pie: {
                innerSize: 150,
                size:250,
                // size:240,
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    formatter: function(){
                        return Highcharts.numberFormat(this.y,0);
                    },
                    distance: -25,
                    formatter:function() {
                        var pcnt = (this.y / this.series.data.map(p => p.y).reduce((a, b) => a + b, 0)) * 100;
                        return Highcharts.numberFormat(pcnt) + '%';
                    },
                    // color:"white"
                },
                showInLegend: true,
                borderWidth: 0
            }
        },
        legend:{
            enabled:true,
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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



    //Blink transactions chart
    const transactionsChart={
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column',
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
        tooltip: {
            shared: true,
            valuePrefix: 'KES '
        },
        title:{
            enabled:false,
            text:null
        },
        xAxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat','Sun'],
            crosshair: true
           
        },
        yAxis:{
            gridLineDashStyle: 'longdash',
            gridLineDashStyle: 'dash',
            title: {
                text: 'Cash in KES',
                style: {
                    color: Highcharts.getOptions().colors[0],
                    color:'black'
                }
            },
        },
        series: [{
            name: 'Deposits',
            data: [mondayDeposits, tuesdayDeposits, wedDeposits, thusDeposits, fridayDeposits,satDeposits,sunDeposits],
            color:'#F35933'
        }, {
            name: 'Expenditure',
            data: [mondayExpenditure, tuesdayExpenditure, wedExpenditure, thusExpenditure, fridayExpenditure,satExpenditure,sunExpenditure],
            color:'#B7DDFE'
        }, {
            name: 'Blink Income',
            type:'spline',
            data: [mondayRevenue, tuesdayRevenue, wedRevenue, thusRevenue, fridayRevenue,satRevenue,sunRevenue],
            color:'#138FFA'
        }],
        plotOptions: {
            series: {
                pointWidth: 15
            }
        },
    }
    //end of blink transactions chart


    //blink cards 
    const blinkCards={
        chart: {
            type: 'solidgauge'
        },
        title:null,
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
    
        exporting: {
            enabled: false
        },
    
        tooltip: {
            enabled: false
        },
        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            },
            title: {
                text: 'Speed'
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [
            {
              name: "RPM",
              data: [64],
              dataLabels: {
                format:
                  '<div style="text-align:center">' +
                  '<span style="font-size:25px">{y:.1f}</span><br/>' +
                  '<span style="font-size:12px;opacity:0.4">' +
                  "* 1000 / min" +
                  "</span>" +
                  "</div>"
              },
              tooltip: {
                valueSuffix: " revolutions/min"
              }
            }
          ]
    

    }

   
    
    //end of blink cards
     

      //========================================
      //**end of chart scripts */
      //=========================================


      //========================================
      //**** user numbers ***
      //========================================

      useEffect(()=>{
        //setGuardiansNos(StdFunctions.getBlinkUsers("Student",1).res.totalElements)
        //console.log(StdFunctions.getBlinkUsers("Student",1).res.totalElements)
        AuthService.getBlinkUsers2("Student",1).then((res)=>{
            console.log(res)
            setBlinkersNos(res.data.totalElements)
            console.log(res.data.totalElements)
        })

        AuthService.getBlinkUsers2("TuckShopAttendant",1).then((res)=>{
            console.log(res)
            setBursersNos(res.data.totalElements)
            console.log(res.data.totalElements)
        })

        AuthService.getBlinkUsers2("Parent",1).then((res)=>{
            console.log(res)
            setGuardiansNos(res.data.totalElements)
            console.log(res.data.totalElements)
        })

        AuthService.getBlinkUsers2("SchoolAdmin",1).then((res)=>{
            console.log(res)
            setSchoolAdminNos(res.data.totalElements)
            console.log(res.data.totalElements)
        })

    },[])

      //========================================
      //**** user numbers ***
      //========================================
   

   

    $('body').unbind().on('click','.nav-item .nav-link',function(){
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
                                <h4 className="card-title mb-0">Collected Revenue</h4>
                                <small>Today</small>
                            </div>
                            <div className="float-end">
                                <button type="button" class="btn  btn-outline-dark  waves-effect btn-label waves-light">
                                    <i class="mdi mdi-calendar-month label-icon"></i> Live Now
                                </button> 
                            </div>
                        </div>
                        <div className="card-body bg-white">
                            <div class="pb-3 d-flex">
                                <HighchartsReact highcharts={Highcharts} options={ChartOptions} />
                                <div>
                                    
                                </div>
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
                                <button className="btn btn-primary w-100 text-uppercase text-center mt-3" data-bs-toggle="modal" data-bs-target="#transaction-edit-modal">Payment Transfer</button>

                            </div>                       
                        
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-7 col-lg-8 bg-grad  p-3 mb-24px">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <Link  to="/Guardians" className="col-3 waves-effect py-3">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-info mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/guardian.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                <small className="mt-2">Guardians</small>
                                                <p className="fw-medium text-black text-center text-center mb-0 mt-0"> {guardiansNos}</p>
                                            </div>
                                        </Link>

                                        <Link  to="/Blinkers" className="col-3 waves-effect py-3">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-danger mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/blinkers.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                <small className="mt-2">Blinkers</small>
                                                <p className="fw-medium text-black text-center text-center mb-0 mt-0"> {blinkersNos}</p>
                                            </div>
                                        </Link>

                                        <Link  to="/Merchants" className="col-3 waves-effect py-3">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-success mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/merchants.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                <small className="mt-2">Merchants</small>
                                                <p className="fw-medium text-black text-center text-center mb-0 mt-0"> {bursersNos}</p>
                                            </div>
                                        </Link>

                                        <Link to="/SchoolAdmin"  className="col-3 waves-effect py-3">
                                            <div className="text-ceter align-items-center d-flex justify-content-center flex-column px-0">
                                                <div className="options-cont options-cont-purple mb-0">
                                                    <div className="flex-shrink-0 m-0 d-flex justify-content-center align-items-center">
                                                        <img className="m-0 p-0" src="assets/images/Account-options/bursers.svg" alt="" height="45px"/>
                                                    </div>
                                                </div>
                                                <small className="mt-2">School Admins</small>
                                                <p className="fw-medium text-black text-center text-center mb-0 mt-0"> {schoolAdminNos}</p>
                                            </div>
                                        </Link>

                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <div className="card glass-card">
                                        <div className="card-body px-0 pb-0 pt-4">
                                            <div className="rounded ">
                                                <div className="d-flex mb-3 flex-column px-4">

                                                    <div class="avatar-sm mx-0 mb-3 ">
                                                        <span class="avatar-title rounded-circle bg-dark font-size-20">
                                                                <i class="mdi mdi-calendar text-white"></i>
                                                            </span>
                                                    </div>

                                                   
                                                    <h5 className="font-size-14 mb-0 mt-3 text-black fw-semibold">Today's Transactions</h5>
                                                    <p className="text-grey">{Moment().format('MMM Do YYYY')}</p>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="text-muted mt-3">
                                                            <div class="px-4">
                                                                <p className="mb-0">Deposits</p>
                                                                <h4 className="text-black fw-semibold">{StdFunctions.kenyaCurrency(todaysDeposits)}</h4>
                                                               

                                                                {StdFunctions.amountIsGreaterThan(yesterdaysDeposit,todaysDeposits) ? (
                                                                    <div>
                                                                        <p class="text-muted"><span class="text-success me-2 fw-semibold"><i class="mdi mdi-arrow-up"></i> {StdFunctions.currencyFormat2(todaysDeposits-yesterdaysDeposit)} </span> Since Yesterday</p>
                                                                    </div>
                                                                ) : (
                                                                   
                                                                    <div>
                                                                        <p class="text-muted"><span class="text-danger me-2 fw-semibold"><i class="mdi mdi-arrow-down"></i> {StdFunctions.currencyFormat2(todaysDeposits-yesterdaysDeposit)} </span> Since Yesterday</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div class="bg-dark p-4 mt-4">
                                                                <p class="text-light mb-0 opacity-75">Expenditure</p>
                                                                <div>
                                                                    <h5 class="text-white mb-0">
                                                                        {StdFunctions.kenyaCurrency(todaysExpenditure)}
                                                                        {StdFunctions.amountIsGreaterThan(yesterdayExpenditure,todaysExpenditure) ? (
                                                                            <small class="text-light opacity-75 pl-2">{"+"+StdFunctions.currencyFormat2(todaysExpenditure-yesterdayExpenditure)}</small>

                                                                        ) : (
                                                                        
                                                                            <small class="text-light opacity-75 pl-2">{StdFunctions.currencyFormat2(todaysExpenditure-yesterdayExpenditure)}</small>

                                                                        )}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-4">
                                    <div className="card glass-card">
                                        <div className="card-body px-0 pb-0 pt-4">
                                            <div className="rounded ">
                                                <div className="d-flex mb-3 flex-column px-4">

                                                    <div class="avatar-sm mx-0 mb-3 ">
                                                        <span class="avatar-title rounded-circle purple-bg font-size-20">
                                                                <i class="mdi mdi-calendar-text-outline text-white"></i>
                                                            </span>
                                                    </div>

                                                   
                                                    <h5 className="font-size-14 mb-0 mt-3 text-black fw-semibold">Weekly Transactions</h5>
                                                    <p className="text-grey">{"From "+Moment(startOfWeek).format('MMM Do YYYY')}</p>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="text-muted mt-3">
                                                            <div class="px-4">
                                                                <p className="mb-0">Deposits</p>
                                                                <h4 className="text-black fw-semibold">{StdFunctions.kenyaCurrency(weeklyDeposits)}</h4>

                                                                {StdFunctions.amountIsGreaterThan(yesterdaysDeposit,todaysDeposits) ? (
                                                                    <div>
                                                                        <p class="text-muted"><span class="text-success me-2 fw-semibold"><i class="mdi mdi-arrow-up"></i> {StdFunctions.currencyFormat2(weeklyDeposits-lastWeekDeposits)} </span> Since Last Week</p>
                                                                    </div>
                                                                   
                                                                ) : (
                                                                   
                                                                    <div>
                                                                        <p class="text-muted"><span class="text-danger me-2 fw-semibold"><i class="mdi mdi-arrow-down"></i> {StdFunctions.currencyFormat2(weeklyDeposits-lastWeekDeposits)} </span> Since Last Week</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div class="purple-bg bg-primary-blink p-4 mt-4">
                                                                <p class="text-light mb-0 opacity-75">Expenditure</p>
                                                                <div>
                                                                    <h5 class="text-white mb-0">
                                                                        {StdFunctions.kenyaCurrency(weeklyExpenditure)}

                                                                        {StdFunctions.amountIsGreaterThan(lastWeekExpenditure,weeklyExpenditure) ? (
                                                                            <small class="text-light opacity-75 pl-2">{"+"+StdFunctions.currencyFormat2(weeklyExpenditure-lastWeekExpenditure)}</small>

                                                                        ) : (
                                                                        
                                                                            <small class="text-light opacity-75 pl-2">{StdFunctions.currencyFormat2(weeklyExpenditure-lastWeekExpenditure)}</small>

                                                                        )}

                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-4">
                                    <div className="card glass-card">
                                        <div className="card-body px-0 pb-0 pt-4">
                                            <div className="rounded ">
                                                <div className="d-flex mb-3 flex-column px-4">

                                                    <div class="avatar-sm mx-0 mb-3 ">
                                                        <span class="avatar-title rounded-circle bg-dark font-size-20">
                                                                <i class="mdi mdi-calendar text-white"></i>
                                                            </span>
                                                    </div>

                                                   
                                                    <h5 className="font-size-14 mb-0 mt-3 text-black fw-semibold">This Month</h5>
                                                    <p className="text-grey">{Moment(startOfMonth).format('MMM YYYY')}</p>
                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="text-muted mt-3">
                                                            <div class="px-4">
                                                                <p className="mb-0">Deposits</p>
                                                                <h4 className="text-black fw-semibold">{StdFunctions.kenyaCurrency(monthlyDeposits)}</h4>
                                                                

                                                                {StdFunctions.amountIsGreaterThan(yesterdaysDeposit,todaysDeposits) ? (
                                                                    <div>
                                                                        <p class="text-muted"><span class="text-success me-2 fw-semibold"><i class="mdi mdi-arrow-up"></i> {StdFunctions.currencyFormat2(monthlyDeposits-lastMonthDeposits)} </span> Since Last Month</p>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <p class="text-muted"><span class="text-danger me-2 fw-semibold"><i class="mdi mdi-arrow-down"></i> {StdFunctions.currencyFormat2(monthlyDeposits-lastMonthDeposits)} </span> Since Last Month</p>
                                                                    </div>
                                                                   
                                                                   
                                                                )}
                                                            </div>
                                                            <div class="bg-dark p-4 mt-4">
                                                                <p class="text-light mb-0 opacity-75">Expenditure</p>
                                                                <div>
                                                                    <h5 class="text-white mb-0">
                                                                       {StdFunctions.kenyaCurrency(monthlyExpenditure)}

                                                                        {StdFunctions.amountIsGreaterThan(lastMonthExpenditure,monthlyExpenditure) ? (
                                                                            <small class="text-light opacity-75 pl-2">{"+"+StdFunctions.currencyFormat2(monthlyExpenditure-lastMonthExpenditure)}</small>

                                                                        ) : (
                                                                        
                                                                            <small class="text-light opacity-75 pl-2">{StdFunctions.currencyFormat2(monthlyExpenditure-lastMonthExpenditure)}</small>

                                                                        )}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-8 col-sm-12">
                    <div class="card">
                        <div className="card-header bg-white d-flex justify-content-between ">
                            <div>
                                <h4 className="card-title mb-0">Blink Transactions</h4>
                                <small class="d-none">Today</small>
                            </div>
                            <div className="float-end">
                                <button type="button" class="btn  btn-outline-dark  waves-effect btn-label waves-light">
                                    <i class="mdi mdi-calendar-month label-icon"></i> Live Now
                                </button> 
                            </div>
                        </div>
                        <div class="card-body">
                            <HighchartsReact highcharts={Highcharts} options={transactionsChart} />
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="row h-100">
                        <div class="col-12 h-100">
                            <div class="card h-calc-15px">
                                <div className="card-header bg-white d-flex justify-content-between ">
                                    <div>
                                        <h4 className="card-title mb-0">Wallet Balances</h4>
                                    </div>
                                   
                                </div>
                                <div class="card-body mt-0 pt-0">
                                        <div class="text-center">
                                            <div class="mb-4">
                                                <i class="mdi mdi-wallet-outline display-4 pt-2"></i>
                                            </div>
                                            <p class="mb-0 pb-2">Total Balance</p>
                                            <h3>KES 23,260</h3>
                                            
                                        </div>

                                        <div class="table-responsive mt-4">
                                            <table class="table align-middle table-nowrap table-borderless">
                                                <tbody>
                                                    <tr>
                                                        
                                                        <td class="px-0 m-0">
                                                            <div class="d-flex justify-content-between w-100 mb-2">
                                                                <span class="pr-2">Blinkers</span>
                                                                <span class="pl-2 text-right">KES 203,000 (65%)</span>
                                                            </div>
                                                            <div class="progress bg-light progress-sm">
                                                                <div class="progress-bar bg-primary-blink rounded" role="progressbar" style={{width: "41%"}} aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td class="px-0 m-0">
                                                            <div class="d-flex justify-content-between w-100 mb-2">
                                                                <span class="pr-2">Merchants</span>
                                                                <span class="pl-2 text-right">KES 203,000 (65%)</span>
                                                            </div>
                                                            <div class="progress bg-light progress-sm">
                                                                <div class="progress-bar bg-success rounded" role="progressbar" style={{width: "24%"}} aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td class="px-0 m-0">
                                                            <div class="d-flex justify-content-between w-100 mb-2">
                                                                <span class="pr-2">Guardians</span>
                                                                <span class="pl-2 text-right">KES 203,000 (65%)</span>
                                                            </div>
                                                            <div class="progress bg-light progress-sm">
                                                                <div class="progress-bar bg-primary rounded" role="progressbar" style={{width: "74%"}} aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 d-none">
                            <div class="card bg-primary-blink">
                                <div class="card-body">
                                    <HighchartsReact highcharts={Highcharts} options={blinkCards} />
                                </div>
                                <div class="card-footer ">
                                    <div class="text-white d-flex align-items-center">
                                        <i class="mdi mdi-credit-card-plus mr-2 font-18px"></i>
                                        <div class="me-3 pl-3">
                                            <p class="text-white-50 text-truncate mb-0">
                                                <small>With Cards</small>
                                            </p>
                                            <h3 class="text-white kenyan-carency mb-0 pb-0 fw-light font-16px">253</h3>
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
export default Home;