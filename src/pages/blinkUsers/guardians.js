import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";

import AccountDetails from "../../components/AccountDetails";

import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import ListItems from "../../services/listItems";


import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import overlayFactory from 'react-bootstrap-table2-overlay';
import Moment from 'moment'
import moment from 'moment';
import {Link,useLocation,matchRoutes} from "react-router-dom";


// bootstrap datatable
import BootstrapTable from 'react-bootstrap-table-next';


import $ from 'jquery';

type ArrayElementType = typeof TABLE_BODY[number] & {
    button: any;
  };


// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Guardians =()=> {

    const [loading, setLoading] = useState(false);

    const[historyStartDate,setHistoryStartDate]=useState(Moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00'))
    const[historyEndDate,setHistoryEndDate]=useState(Moment().format('YYYY-MM-DD 23:59:59'))
    const[historyPageSize,setHistoryPageSize]=useState(10)
    const[pageNo,setPageNo]=useState(1)
    const[totalPages,setTotalPages]=useState("")
    const[totalTransactions,setTotalTransactions]=useState("")
    const[transactionsHistory,setTheTransactionsHistory]=useState({})

    const[canGoNext,setCanGoNext]=useState(true)
    const[canGoPrev,setCanGoPrev]=useState(false)
    const[canGoLast,setCanGoLast]=useState(true)
    const[canGoFirst,setCanGoFirst]=useState(false)

    const[tableLoadingStatus,setTableLoadingStatus]=useState(true)
    const[resultsFound,setResultsFound]=useState(false)
    const[transType,setTransType]=useState("")

    //filter items
    const[listOfSchools,setListOfSchools]=useState([])
    const[activeSchoolText,setActiveSchoolText]=useState("All Schools")
    const[userTypeText,setUserTypeText]=useState("All Users")
    const[userType,setUserType]=useState("")
    const[transactionsText,setTransactionsSet]=useState("All Transactions")

    //getting the clickked transaction
    const[clickedTransactionId,setClickedTransactionId]=useState("")
    const[clickedTransactionRow,setClickedTransactionRow]=useState({})

    const[clickedBlinkAcc,setClickedBlinkAcc]=useState("")

    const[]=useState()

    const[listOfTransTypes,setListOfTransaType]=useState([])

    //searching
    const[searchString,setSearch]=useState("")
    //search by
    const[searchBy,setSeachBy]=useState("receiptNumber")
    const[searchByText,setSearchByText]=useState("Receipt Number")

    //setting list of schools
    useEffect(()=>{
        AuthService.getInstitutions().then((res)=>{            
            
            setListOfSchools(res.data.data.sort((a, b) => b.totalStudents - a.totalStudents))  
            //console.log(res.data.data.sort((a, b) => b.totalStudents - a.totalStudents))     
        })
    },[])

    //changing the institution
    const changeInstitution=(schoolId,schoolName)=>{
       
        setActiveSchoolText(schoolName.toLowerCase())
    }
    $('.can-click').unbind().on('click', function(){
        //alert("clicked")
    })

    
    


    //getting the transactions
    useEffect(()=>{
        //alert(searchBy)
        setTableLoadingStatus(true)     
       AuthService.getTransactionsByDate(historyStartDate,historyEndDate,historyPageSize,pageNo,transType,userType,searchString,searchBy).then((res)=>{

        // console.log(res.data.data)
        //console.log(ListItems.theSchools)


        if(res.data.statusCode===200){
            // alert("results found")
            setTotalPages(res.data.totalPages)
            setTotalTransactions(res.data.totalElements)
            setTheTransactionsHistory(res.data.data) 
            setTableLoadingStatus(false)
            console.log(res.data.data)
            

            if(res.data.data.length===0){
                // the toast
                $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
                $('#the-toast .toast-body').text("No Results Found")
                setTimeout(() => {                  
                    $('#the-toast').addClass('animate__fadeOutDown')
                }, 4000);  
                setTimeout(() => {                  
                    $('#the-toast').removeClass('show')
                }, 5000);
                setResultsFound(false)
            }
            else{
                setResultsFound(true)
            }
            
           
        }
        else{
            // the toast
            setTableLoadingStatus(false)
            $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
                $('#the-toast .toast-body').text("Try again Later")
                setTimeout(() => {                  
                    $('#the-toast').addClass('animate__fadeOutDown')
                  }, 4000);  
                setTimeout(() => {                  
                    $('#the-toast').removeClass('show')
                }, 5000);
        }
       
              

       }).catch((err)=>{
            console.log(err) 
            // the toast
            setTableLoadingStatus(false)
            $('#the-toast').addClass('show').addClass('bg-success').removeClass('bg-danger').removeClass('animate__fadeOutDown')
                $('#the-toast .toast-body').text("Unexpected Error")
                setTimeout(() => {                  
                    $('#the-toast').addClass('animate__fadeOutDown')
                  }, 4000);  
                  setTimeout(() => {                  
                    $('#the-toast').removeClass('show')
                  }, 5000);           
        })

    },[historyEndDate,historyStartDate,pageNo,historyPageSize,transType,userType,searchString,searchBy])

   
    //===================================///
    //**** Pagination functions start */
    //=======================================//

    //last page
    const lastPage=(event)=>{
      
        
        setPageNo(totalPages)
        

        setCanGoLast(false)
        setCanGoFirst(true)
        setCanGoNext(false)
        setCanGoPrev(true)
    }

    const firstPage=(event)=>{
        setPageNo(1)

        setCanGoLast(true)
        setCanGoFirst(false)
        setCanGoNext(true)
        setCanGoPrev(false)
    }

    const prevPage=(event)=>{
       
        const prevPage=pageNo-1
        

        if(prevPage>1){
            setPageNo(prevPage)
            setCanGoNext(true)
            setCanGoLast(true)            
        }

        if(prevPage=>2){
            setPageNo(prevPage)
            setCanGoNext(true)
            setCanGoLast(true)
            setCanGoPrev(true) 
            setCanGoFirst(true)           
        }

        if(prevPage===1){
            setCanGoLast(true)
            setCanGoFirst(false)
            setCanGoNext(true)
            setCanGoPrev(false)
            setPageNo(1)
        }
        
    }

    const nextPage=(event)=>{
        const nextPage=pageNo+1

        if(nextPage===totalPages){
            setCanGoLast(false)
            setCanGoFirst(true)
            setCanGoNext(false)
            setCanGoPrev(true)
        }

        if(nextPage<totalPages){
            setCanGoLast(true)
            setCanGoFirst(true)
            setCanGoNext(true)
            setCanGoPrev(true)
        }

        if(nextPage<=totalPages){
          setPageNo(pageNo+1)          
        }
        
        
    }

    //===================================///
    //**** Pagination functions End */
    //=======================================//

    // formating the date
    const dateFormatter=(cell, row)=>{
       return Moment(cell).add(3, 'hours').calendar(null, {sameElse: 'DD MMM YYYY  hh:mm A'})
    }
    const isIncome=(cell,row,rowIndex)=>{
        const transactionType=row.transType
        if(transactionType==="Merchant_Pay"){
            return ""
        }

        if(transactionType==="Blink_Deposit_Charge"){
            return ""
        }

        if(transactionType==="Withdrawal_To_Mpesa"){
            return ""
        }

        if(transactionType==="Deposit"){
            return StdFunctions.kenyaCurrency(cell)
        }
        
    }

    const isMoneyOut=(cell,row,rowIndex)=>{
        const transactionType=row.transType
        if(transactionType==="Merchant_Pay"){
            return "-"+StdFunctions.kenyaCurrency(cell)
        }

        if(transactionType==="Blink_Deposit_Charge"){
            return "-"+StdFunctions.kenyaCurrency(cell)
        }

        if(transactionType==="Blink_Deposit_Charge"){
            return "-"+StdFunctions.kenyaCurrency(cell)
        }

        if(transactionType==="Blink_Withdrawal_Charge"){
            return "-"+StdFunctions.kenyaCurrency(cell)
        }

        if(transactionType==="Withdrawal_To_Mpesa"){
            return "-"+StdFunctions.kenyaCurrency(cell)
        }

        if(transactionType==="Deposit"){
            return ""
        }
        
    }

    const accFormatter=(cell, row)=>{
        return StdFunctions.creditCard2(cell)
     }

    const currencyForamtter=(cell, row)=>{
        return StdFunctions.kenyaCurrency(cell)
    }
    const removeUnderscore=(cell, row)=>{
        return StdFunctions.removeUnderscore(cell)
    }
    const statusForamtter=(cell, row)=>{
        if(cell==="Successful"){
            return(
                <>
                  <span class="badge badge-soft-success">{cell}</span>  
                </>
            )
        }

        if(cell==="Failed"){
            return(
                <>
                  <span class="badge badge-soft-danger">{cell}</span>  
                </>
            )
        }

        if(cell==="Pending"){
            return(
                <>
                  <span class="badge badge-soft-warning">{cell}</span>  
                </>
            )
        }
        else{
            return(
                <>
                  <span class="badge badge-soft-info">{cell}</span>  
                </>
            )  
        }
     }

    const headerSortingStyle = { 
        color: 'rgb(85,110,230)',
        
    };
    const textRight={
        textTransfotm:'right'
    }

    //clicking the filters 
    $('.the-filters .dropdown a').unbind().on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
    })

    
    const columns = [{
        dataField: 'receiptNumber',
        text: 'Receipt No.',
        sort: true,  
        classes: 'fw-bold text-black cursor-pointer can-click',
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                $('.transaction-details-button').click()
                console.log(row.transactionId);
                setClickedTransactionId(row.transactionId)
                console.log(localStorage)
                setClickedTransactionRow(row)
            }
        },
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          }  
      }, {
        dataField: 'userAccount.blinkId',
        text: 'Blink ID',
        classes:'text-uppercase cursor-pointer can-click',
        formatter:accFormatter,
        sort: true,  
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                $('.account-details-button').click()
                // alert("clicked")
                setClickedBlinkAcc(row.userAccount.userId)
            }
        },
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          },
      }, {
        dataField: 'transType',
        text: 'Transaction',
        formatter:removeUnderscore,
        sort: true,  
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          },
      },{
        dataField: 'dateCreated',
        text: 'Date',
        classes: 'text-capitalize',
        sort:true,
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          } ,
        sortFunc: (a, b, order) => {
            if (order === "asc") {
              return Date.parse(a) - Date.parse(b);
            } else if (order === "desc") {
              return Date.parse(b) - Date.parse(a);
            }
          },
          formatter: dateFormatter  
      },
      {
        dataField: 'transactionStatus',
        text: 'Transaction Status',
        classes: 'text-uppercase', 
        sort: true,  
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          },
          formatter:statusForamtter    
        
      }, {
        dataField: 'amount',
        text: 'Paid In',
        classes: 'text-right text-black',
        headerClasses: 'text-right', 
        sort: true,  
        headerSortingStyle,
        textRight,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          } ,
          formatter: isIncome   
      }, {
        dataField: 'amount',
        text: 'Withdrawn',
        classes: 'text-right text-black', 
        headerClasses: 'text-right',       
        sort: true, 
        
        headerSortingStyle,
        textRight,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          },
          formatter: isMoneyOut   
      },{
        dataField: '',
        text: ''
      }];

      
      const defaultSorted = [{
        dataField: 'dateCreated',
        order: 'desc'
      }];

      const rowStyle = { backgroundColor: '#c8e6c9' };
      const products=TABLE_BODY

        //   date filtering start
        const [state, setState] = useState({
            start: moment().subtract(29, 'days'),
            end: moment(),
        });

        const { start, end } = state;
            const handleCallback = (start, end) => {
            setState({ start, end });
            setHistoryStartDate(start.format('YYYY-MM-DD 00:00:00'))
            setHistoryEndDate(end.format('YYYY-MM-DD 23:59:59'))
        };

        const label =start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');

        //reseting filters
        const resetFilters=()=>{

            setUserType("")
            setUserTypeText("All users")

            setTransType("")
            setTransactionsSet("All Transactions")

            setHistoryStartDate(Moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00'))
            setHistoryEndDate(Moment().format('YYYY-MM-DD 23:59:59'))

            var startDate=Moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00')
            var endDate=Moment().format('YYYY-MM-DD 23:59:59')
            setState({
                start: moment().subtract(29, 'days'),
                end: moment(),
            })

            
        }
                    
        

        // date filtering end

        function priceFormatter(column, colIndex, { sortElement, filterElement }) {
            return (
              <div style={ { display: 'flex', flexDirection: 'column' } }>
                { filterElement }
                { column.text }
                { sortElement }
              </div>
            );
          }

        //empty data table
        function indication() {
            return(
                <>
                    <div className="card-body d-sm-none d-md-block px-5 d-flex flex-column justify-items-center align-items-center text-center">
                        <div className="p-5 py-0 pt-3">
                            <img src="assets/images/filter-imgs/no-results.svg" className="img mb-4" alt="No search results" height="207px" />
                        </div>
                        <h4>No Results To Show</h4>
                        <p>We couldnt find what you are looking for, try changing the filters.</p>
                    </div>
                </>
            )
          }
        //end of empty data table
    

   
    return ( 
        <>

       
        <AccountDetails activeBlinker={clickedBlinkAcc}/>

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
        <title>Blink! | All Transatcions</title>
       
       
        </Helmet>    {/* the modals container */}
        <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row d-sm-none d-md-flex">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">All Transactions </h4>

                    <div className="page-title-right d-sm-none d-md-flex">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                            <li className="breadcrumb-item active">All Transactions</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>

        <div className="row d-sm-none d-md-none ">
            <div className="col-12">
                <h4 className="text-black pt-4 pb-3 p-3 border-bottom-1px fw-medium ">All Transactions</h4>
            </div>
        </div>
        {/* <!-- end page title --> */}
        <div className="row">
            <div className="col-12">
                <div className="card no-shadow-sm">
                       
                    <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center w-100 border-bottom d-sm-none d-md-flex">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-sm-4 col-md-3 col-lg-2">
                                    <div class="">
                                        <select value={historyPageSize} class="form-select h-38px" onChange={(event)=>{
                                        setHistoryPageSize(event.target.value)
                                        setPageNo(1)}} >
                                            <option value="10">10 Rows</option>
                                            <option value="25">25 Rows</option>
                                            <option value="50">50 Rows</option>
                                            <option value="100">100 Rows</option>
                                            <option value="150">150 Rows</option>
                                            <option value="200">200 Rows</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-8 col-md-9 col-lg-10 d-flex align-items-center pr-0 pl-0 d-flex">
                                <div class="pr-0 d-none">
                                        <select value={searchBy}  class="form-select bg-light h-38px w-auto border-radius-0 border-1" onChange={(event)=>{
                                            setSeachBy(event.target.value)
                                            if(event.target.value=="receiptNumber"){
                                                setSearchByText("Receipt Number")
                                            }

                                            if(event.target.value=="accountFrom"){
                                                setSearchByText("Account From")
                                            }

                                            if(event.target.value=="receiptNumber"){
                                                setSearchByText("Receipt Number")
                                            }

                                            if(event.target.value=="accountTo"){
                                                setSearchByText("Recepient Blink Acc No.")
                                            }

                                           }} >
                                                <option value="receiptNumber">Search By Receipt Number</option>
                                                <option value="accountFrom">Search By Account From</option>
                                                <option value="accountTo">Search By Recepient Blink ID</option>                                                
                                        </select>
                                    </div>
                                    <div className="dataTables_filter   pl-3 pr-0 flex-grow-1">
                                        <label>
                                            <input 
                                            type="search" 
                                            className="form-control  emailSearch w-100 border-radius-0 border-1" 
                                            onChange={(e)=>{
                                                setSearch(e.target.value)
                                                setHistoryEndDate("")
                                                setHistoryEndDate("")

                                                setUserType("")
                                                setUserTypeText("All users")

                                                setTransType("")
                                                setTransactionsSet("All Transactions")
                                                
                                            }} 
                                            placeholder={"Search By "+searchByText}
                                            aria-controls="datatable-buttons"/>
                                        </label>                                        
                                    </div>
                                    <div class="pr-2">
                                        <select value={searchBy}  class="form-select bg-light h-38px w-auto border-radius-0 border-1 cursor-pointer" title="Select an Option to search by" onChange={(event)=>{
                                            setSeachBy(event.target.value)
                                            if(event.target.value=="receiptNumber"){
                                                setSearchByText("Receipt Number")
                                            }

                                            if(event.target.value=="accountFrom"){
                                                setSearchByText("Account From")
                                            }

                                            if(event.target.value=="receiptNumber"){
                                                setSearchByText("Receipt Number")
                                            }

                                            if(event.target.value=="accountTo"){
                                                setSearchByText("Recepient Blink Acc No.")
                                            }

                                           }} >
                                                <option value="receiptNumber">Search By Receipt Number</option>
                                                <option value="accountFrom">Search By Account From</option>
                                                <option value="accountTo">Search By Recepient Blink ID</option>                                                
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body  min-h-90 px-0 pt-0">
                        <div class="row">
                            <div class="col-12 pb-2 d-none">
                                <div class="row">
                                    <div class="col-sm-4 col-md-3 col-lg-2">
                                        <div class="pl-3">
                                            <select value={historyPageSize} class="form-select" onChange={(event)=>setHistoryPageSize(event.target.value)} >
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="150">150</option>
                                                <option value="200">200</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-7 col-lg-8 d-flex align-items-center pr-0 pl-0">
                                        <div className="dataTables_filter   px-3 flex-grow-1">
                                            <label>
                                                <input type="search" className="form-control form-control-sm emailSearch w-100" placeholder="Search through Records ..." aria-controls="datatable-buttons"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button className="btn btn-primary w-100 text-uppercase text-center mt-3 transaction-details-button d-none" data-bs-toggle="modal" data-bs-target="#transaction-details-modal">Payment Transfer</button>
                                <button className="btn btn-primary w-100 text-uppercase text-center mt-3 account-details-button d-none" data-bs-toggle="modal" data-bs-target="#account-details-modal">Account details</button>

                                <div class="d-flex tbl-filter-container justify-content-between align-items-center py-0 my-4">
                                    <div class="d-flex the-filters">
                                        <div>
                                            <div className="dropdown d-inline-block">
                                                <button
                                                    type="button"
                                                    className="btn header-item h-auto px-4 waves-effect d-flex justify-content-center align-items-center pb-4 pt-4 pr-0"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >                                           
                                                
                                                    <span className="d-none d-xl-inline-block ms-1 prof-name text-left mr-3 pe-4" key="t-henry">
                                                        <span class="text-primary">Filter By Institution</span>
                                                        <h5 class="mb-0 pb-0 text-black text-capitalize">{activeSchoolText}</h5>
                                                    </span>
                                                    <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                                </button>

                                                <div className="dropdown-menu dropdown-menu-end w-100 text-capitalize">
                                                    {/* <!-- item--> */}
                                                    <a className="d-flex px-3 pb-2 waves-effect dropdown-item active" href="javascript: void(0);">                                            
                                                        <span key="t-profile">All Schools</span>
                                                    </a>                                                  
                                                    

                                                    {listOfSchools.map((school, index)=>(
                                                        <a onClick={()=> changeInstitution(school.institutionName,school.institutionName)}  className="d-flex px-3 pb-2 waves-effect dropdown-item" href="javascript: void(0);"  >                                            
                                                            <span key="t-lock-screen">{
                                                                school.institutionName.toLowerCase()
                                                                
                                                                }</span>
                                                        </a>
                                                        ))
                                                            
                                                    }  
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="dropdown d-inline-block">
                                                <button
                                                    type="button"
                                                    className="btn header-item h-auto px-4 waves-effect d-flex justify-content-center align-items-center pb-4 pt-4 pr-0"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >                                           
                                                
                                                    <span className="d-none d-xl-inline-block ms-1 prof-name text-left mr-3 pe-4" key="t-henry">
                                                        <span class="text-primary">Filter By User type</span>
                                                        <h5 class="mb-0 pb-0 text-black text-capitalize">{userTypeText}</h5>
                                                    </span>
                                                    <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                                </button>

                                                <div className="dropdown-menu dropdown-menu-end w-100 text-capitalize">
                                                    {/* <!-- item--> */}
                                                    <a className="dropdown-item active" href="javascript: void(0);" onClick={()=> {
                                                        setUserType("")
                                                        setUserTypeText("All users")
                                                    }}>                                                                                        
                                                        <span key="t-profile">All Users</span>
                                                    </a>
                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                         setUserType("Parent")
                                                        setUserTypeText("Guardians")
                                                    }}>                                                                                        
                                                        <span key="t-profile">Guardians</span>
                                                    </a>

                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setUserType("Student")
                                                        setUserTypeText("Blinkers")
                                                    }}>                                                                                        
                                                        <span key="t-profile">Blinkers</span>
                                                    </a>

                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                         setUserType("TuckShopAttendant")
                                                        setUserTypeText("Blinkers")
                                                    }}>                                                                                        
                                                        <span key="t-profile">Merchants</span>
                                                    </a>

                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                         setUserType("Burser")
                                                        setUserTypeText("Bursers")
                                                    }}>                                                                                        
                                                        <span key="t-profile">Bursers</span>
                                                    </a>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="dropdown d-inline-block">
                                                <button
                                                    type="button"
                                                    className="btn header-item h-auto px-4 waves-effect d-flex justify-content-center align-items-center pb-4 pt-4 pr-0"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >                                           
                                                
                                                    <span className="d-none d-xl-inline-block ms-1 prof-name text-left mr-3 pe-4" key="t-henry">
                                                        <span class="text-primary">Filter By Transaction Type</span>
                                                        <h5 class="mb-0 pb-0 text-black">{transactionsText}</h5>
                                                    </span>
                                                    <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                                </button>

                                                <div className="dropdown-menu dropdown-menu-end w-100 text-capitalize">
                                                    {/* <!-- item--> */}

                                                    <a className="dropdown-item active" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("")
                                                        setTransactionsSet("All Transactions")
                                                    }}>                                            
                                                        <span key="t-profile">All Transactions</span>
                                                    </a>
                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Deposit")
                                                        setTransactionsSet("Deposit")
                                                    }}>                                            
                                                        <span key="t-profile">Deposit</span>
                                                    </a>
                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Withdrawal_To_Mpesa")
                                                        setTransactionsSet("Withdrawal To Mpesa")
                                                    }}>                                            
                                                        <span key="t-profile">Withdrawal To Mpesa</span>
                                                    </a>
                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Merchant_Pay")
                                                        setTransactionsSet("Merchant Pay")
                                                    }}>                                           
                                                        <span key="t-lock-screen">Merchant Pay</span>
                                                    </a>
                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Blink_Withdrawal_Charge")
                                                        setTransactionsSet("Blink Withdrawal Charge")
                                                    }}>                                            
                                                        <span key="t-lock-screen">Blink Withdrawal Charge</span>
                                                    </a>

                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Blink_Deposit_Charge")
                                                        setTransactionsSet("Blink Deposit Charge")
                                                        }}>                                            
                                                        <span key="t-lock-screen">Blink Deposit Charge</span>
                                                    </a>

                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Manual_Credit")
                                                        setTransactionsSet("Manual Credit")
                                                        }}>                                            
                                                        <span key="t-lock-screen">Manual Credit</span>
                                                    </a>

                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("Manual_Debit")
                                                        setTransactionsSet("Manual Debit")
                                                        }}>                                            
                                                        <span key="t-lock-screen">Manual Debit</span>
                                                    </a>
                                                    
                                                    <a className="dropdown-item" href="javascript: void(0);" onClick={()=> {
                                                        setTransType("CardIssuanceCharge")
                                                        setTransactionsSet("Card Issuance Charge")
                                                        }}>                                            
                                                        <span key="t-lock-screen">Card Issuance Charge</span>
                                                    </a>
                                                    
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <DateRangePicker
                                                initialSettings={{
                                                startDate: start.toDate(),
                                                endDate: end.toDate(),
                                                ranges: {
                                                    Today: [moment().toDate(), moment().toDate()],
                                                    Yesterday: [
                                                    moment().subtract(1, 'days').toDate(),
                                                    moment().subtract(1, 'days').toDate(),
                                                    ],
                                                    'Last 7 Days': [
                                                    moment().subtract(6, 'days').toDate(),
                                                    moment().toDate(),
                                                    ],
                                                    'Last 30 Days': [
                                                    moment().subtract(29, 'days').toDate(),
                                                    moment().toDate(),
                                                    ],
                                                    'This Month': [
                                                    moment().startOf('month').toDate(),
                                                    moment().endOf('month').toDate(),
                                                    ],
                                                    'Last Month': [
                                                    moment().subtract(1, 'month').startOf('month').toDate(),
                                                    moment().subtract(1, 'month').endOf('month').toDate(),
                                                    ],
                                                },
                                                }}
                                                onCallback={handleCallback}
                                            >
                                                <div className="dropdown d-inline-block">
                                                <button
                                                    type="button"
                                                    className="btn header-item h-auto px-4 waves-effect d-flex justify-content-center align-items-center pb-4 pt-4 pr-0"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    id="reportrange"
                                                >                                           
                                                
                                                    <span className="d-none d-xl-inline-block ms-1 prof-name text-left mr-3 pe-4" key="t-henry">
                                                        <span class="text-primary">Filter By Date</span>
                                                        <h5 class="mb-0 pb-0 text-black selected-date">{label}</h5>
                                                    </span>
                                                    <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                                </button>
                                            </div>
                                            </DateRangePicker>
                                        </div>

                                        

                                        
                                    </div>

                                    <div class="text-right text-uppercase pr-4">
                                        <button type="button" class="btn btn-outline-white waves-effect waves-light text-uppercase" onClick={resetFilters}>
                                            <i class="mdi mdi-refresh font-size-24 align-middle me-2"></i> Reset Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <BootstrapTable 
                                responsive
                                bootstrap4
                                hover 
                                classes=""
                                bodyClasses=""
                                variant="dark"
                                bordered={ false }  
                                keyField='id' 
                                data={ transactionsHistory } 
                                columns={ columns }
                                defaultSorted={ defaultSorted }
                                headerClasses="table-light " 
                                headerWrapperClasses="kev-header"
                                noDataIndication={ indication }
                                loading={tableLoadingStatus}
                                overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.1)' }) }
                            /> 

                            
                        </div>

                        <div class="card-footer bg-white">
                            {/* table footer starts here         */}
                            <div className={`col-12 ${resultsFound ? "" : "d-none"}`}>
                                <div class="w-100 d-flex p-3 align-items-center text-grey font-13px justify-content-end">
                                        <div class="d-flex align-items-center">
                                            <span class="pr-3 pb-0 mb-0 font-13px"><span>Rows Per Page</span></span>
                                            <select value={historyPageSize} class="form-select w-auto font-13px " onChange={(event)=>{
                                                setHistoryPageSize(event.target.value)
                                                setPageNo(1)
                                            }}>
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="150">150</option>
                                                <option value="200">200</option>
                                            </select>
                                        </div> 
                                        <div class="px-4">
                                            <span>{(historyPageSize*pageNo)-historyPageSize+1}-{historyPageSize*pageNo} of {totalTransactions}</span>
                                        </div> 
                                        <div>
                                        <div class="kev-pagination">
                                        <ul class="pagination pagination-rounded justify-content-center mb-0 font-24px">
                                                <li  className={`page-item ${canGoFirst ? "" : "disabled"}`} onClick={firstPage}>
                                                    <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-page-first"></i></a>
                                                </li>
                                                <li className={`page-item ${canGoPrev ? "" : "disabled"}`} onClick={prevPage}>
                                                    <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                                                </li>
                                            
                                                <li className={`page-item ${canGoNext ? "" : "disabled"}`}  onClick={nextPage}>
                                                    <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                                                </li>
                                                <li className={`page-item ${canGoLast ? "" : "disabled"}`} onClick={lastPage}>
                                                    <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-page-last"></i></a>
                                                </li>
                                            </ul> 
                                        </div> 
                                        </div>      
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
            </div>
            {/* <!-- end col --> */}
        </div>

        {/* <!-- end row --> */}
        </div>

        
        
        </>
    );
}
export default Guardians;