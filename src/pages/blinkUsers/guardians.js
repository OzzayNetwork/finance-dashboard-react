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
// import TABLE_BODY from "./data.test.json";
import TABLE_BODY from "./data.test.json";


type ArrayElementType = typeof TABLE_BODY[number] & {
    button: any;
  };


// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";


const Guardians=()=>{

    const [loading, setLoading] = useState(false);

    const[historyStartDate,setHistoryStartDate]=useState(Moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00'))
    const[historyEndDate,setHistoryEndDate]=useState(Moment().format('YYYY-MM-DD 23:59:59'))
    const[historyPageSize,setHistoryPageSize]=useState(10)
    const[pageNo,setPageNo]=useState(1)
    const[blinkUserType,setBlinkUserType]=useState("Parent")
    const[searchTbleBy,setSearchTbleBy]=useState("")
    const[guardiansRegister,setGuardiansRegister]=useState("")
    const[totalPages,setTotalPages]=useState("")
    const[tableLoadingStatus,setTableLoadingStatus]=useState(true)
    const[resultsFound,setResultsFound]=useState(false)

    const[totalTransactions,setTotalTransactions]=useState("")
    const[transactionsHistory,setTheTransactionsHistory]=useState({})

    const[canGoNext,setCanGoNext]=useState(true)
    const[canGoPrev,setCanGoPrev]=useState(false)
    const[canGoLast,setCanGoLast]=useState(true)
    const[canGoFirst,setCanGoFirst]=useState(false)

    //searching
    const[searchString,setSearch]=useState("")
    //search by
    const[searchBy,setSeachBy]=useState("msisdn")
    const[searchByText,setSearchByText]=useState("Phone Number")

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
    
    useEffect(()=>{
        setTableLoadingStatus(true)
        // setGuardiansRegister("")
        AuthService.getBlinkUsers(blinkUserType,pageNo,searchBy,historyPageSize,searchString).then((res)=>{            
           
           if(res.data.statusCode===200){
                setTotalPages(res.data.totalPages)
                setGuardiansRegister(res.data.data)
                console.log(res.data.data)  
                setTableLoadingStatus(false)
                setTotalTransactions(res.data.totalElements)
           } 
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
        }).catch((err)=>{
            alert("something went wrong")
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
    },[pageNo,historyPageSize,searchString,searchBy])
    // formating the date
    const dateFormatter=(cell, row)=>{
        return Moment(cell).add(3, 'hours').calendar(null, {sameElse: 'DD MMM YYYY  hh:mm A'})
     }
    const profileNameFormatter=(cell,row)=>{
        return(
            <>
               <div class="d-flex align-items-center">
                    <div class="pr-3">
                        <div class="avatar-xs mx-auto ">
                            <span class="avatar-title rounded-circle font-size-12 profile-abriv text-uppercase bg-opacity-50">
                                {row.userProfile.firstName.charAt(0)+" "+row.userProfile.lastName.charAt(0)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p class="mb-0 text-capitalize "><span class="text-black fw-medium">{row.userProfile.firstName+" "+row.userProfile.lastName}</span></p>
                        <p class="mb-0 "><small>{row.blinkId}</small></p>
                    </div>
               </div>
            </>
        )
     }
     const addBlinkerText=(cell,row)=>{
        if(cell===1){
            return (
                <>
                    <span>{row.associates[0].firstName+ " "+row.associates[0].lastName}</span>
                </>
            )
        }
        else{
            return (<>{cell+" Blinkers"}</>)  
        }
     }

     const validationStatus=(cell,row)=>{
        if(cell===false){
            return(
                <>
                  <span class="badge badge-soft-danger text-uppercase fw-medium">Not Validated</span>                 
                </>
            )
        }

        if(cell===true){
            return(
                <>
                  <span class="badge badge-soft-success text-uppercase">Validated</span>                 
                </>
            )
        }
       
     }
     const currencyFormatter=(cell,row)=>{
        return StdFunctions.kenyaCurrency(cell)
     }

     const actionButtons=(cell,row)=>{
        return(
            <>
                <div class="dropdown">
                    <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                        <i class="bx bx-dots-vertical-rounded"></i>
                    </a>

                    <div class="dropdown-menu dropdown-menu-end text-capitalize">
                        <a class="dropdown-item" href="tenant-details.html"><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>Open</a>
                        <a class="dropdown-item" href="tenant-new.html"><i class="font-size-15 mdi mdi-account-edit me-3"></i>Edit Details</a>
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target=".notice-modal" href="#"><i class="font-size-15 mdi mdi-chat me-3"></i>Message Guardian</a>
                        <a class="dropdown-item" href="#"><i class="font-size-15 mdi mdi-account-arrow-right me-3"></i>View Blinker(s)</a>
                    </div>
                </div>  
            </>
        )
     }

     const contactInfoFormatter=(cell,row)=>{
        console.log(row)
        console.log(row.msisdn)
        const phoneNum=0
        const EmailAdrress=0

        return (
            <>
                <p class="text-muted mb-0"><a href={'mailto:'+cell}>{cell}</a></p>
                <p class="mb-0"><a href={'tell:'+row.msisdn}>{StdFunctions.phoneOutput(row.msisdn)}</a></p>
            </>
        )
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

    const headerSortingStyle = { 
        color: 'rgb(85,110,230)',
        
    };
    const products=TABLE_BODY

    const defaultSorted = [{
        dataField: 'userProfile.dateCreated',
        order: 'desc',
        
      }];

    // data table columns
    const columns = [{
        dataField: 'userProfile.firstName',
        text: 'Guardian',
        sort:true,
        formatter: profileNameFormatter,
        headerSortingStyle,
       
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          }
        
      }, {
        dataField: 'email',
        text: 'Email/Phone',
        formatter: contactInfoFormatter 
      }, {
        dataField: 'associates.length',
        text: 'Dependants',
        sort:true,
        headerSortingStyle,
        formatter:addBlinkerText,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          } ,
        
      }, {
        dataField: 'userProfile.dateCreated',
        text: 'Registered On',
        sort:true,
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
        dataField: 'isMsisdnValidated',
        text: 'Phone Validation',
        sort: true, 
        formatter:validationStatus, 
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          }   
      },{
        dataField: 'userProfile.blinkaccounts[0].currentBalance',
        text: 'Account Balance.',
        formatter:currencyFormatter,
        sort: true, 
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          }  
        
      },
      {
        dataField: '',
        text: '',
        formatter:actionButtons
        
      }];


   
    return(
        <>
            <Helmet>
                <title>Blink! Admin | Blink Users</title>
            </Helmet> 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">Blink Guardians</h4>

                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                                    <li className="breadcrumb-item"><a href="#">Blink Users</a></li>
                                    <li className="breadcrumb-item active"><Link to="/">Guardians</Link></li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                            <div class="col-12">
                                <div class="card no-shadow-sm">
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
                                            
                                            <div className="dataTables_filter   pl-3 pr-0 flex-grow-1">
                                                <label>
                                                    <input 
                                                        type="search" 
                                                        className="form-control  emailSearch w-100 border-radius-0 border-1" 
                                                        placeholder={"Search By "+searchByText}
                                                        aria-controls="datatable-buttons"
                                                        onChange={(e)=>{
                                                            setSearch(e.target.value)
                                                        }} 

                                                    />
                                                </label>                                        
                                            </div>
                                            <div class="pr-2">
                                                <select value={searchBy}  class="form-select bg-light h-38px w-auto border-radius-0 border-1 cursor-pointer" title="Select an Option to search by" onChange={(event)=>{
                                                        setSeachBy(event.target.value)
                                                        if(event.target.value=="blinkId"){
                                                            setSearchByText("Blink ID")
                                                        }

                                                        if(event.target.value=="email"){
                                                            setSearchByText("Email Address")
                                                        }

                                                        if(event.target.value=="msisdn"){
                                                            setSearchByText("Phone Number")
                                                        }
                                                    }}
                                                    >
                                                        <option value="blinkId">Search By Blink ID</option>
                                                        <option value="email">Search By Email</option>
                                                        <option value="msisdn">Search By Phone Number</option>                                                
                                                </select>
                                            </div>

                                            <div class="pr-0 d-flex">

                                                <a href="property-new.html" type="button" class="btn btn-info dropdown-toggle option-selector me-2 h-38px d-flex align-items-center">
                                                    <i class="mdi mdi-chat font-size-16"></i> <span class="pl-1 d-md-inline">Message All</span>
                                                </a>

                                                <a href="property-new.html" type="button" class="btn btn-primary dropdown-toggle option-selector h-38px d-flex align-items-center">
                                                    <i class="mdi mdi-plus font-size-16"></i> <span class="pl-1 d-md-inline">Add A Guardian</span>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-header d-none bg-white p-3 d-flex justify-content-between align-items-center w-100 border-bottom ">
                            </div>
                            <div className="card-body  min-h-90 px-0 pt-0 pb-0">
                                <BootstrapTable 
                                    responsive
                                    bootstrap4
                                    hover 
                                    classes=""
                                    bodyClasses=""
                                    variant="dark"
                                    bordered={ false }  
                                    keyField='id' 
                                    data={ guardiansRegister } 
                                    columns={ columns }
                                    defaultSorted={ defaultSorted }
                                    headerClasses="table-light " 
                                    headerWrapperClasses="kev-header"
                                    noDataIndication={ indication }
                                    loading={tableLoadingStatus}
                                    overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.1)' }) }
                                /> 


                            </div>
                            <div class="card-footer bg-white pt-0">
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
                </div>
            </div>
        </>
    );
}
export default Guardians;