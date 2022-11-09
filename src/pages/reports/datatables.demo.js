import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'moment'
import moment from 'moment';
import {Link,useLocation,matchRoutes} from "react-router-dom";

// bootstrap datatable
import BootstrapTable from 'react-bootstrap-table-next';


import $ from 'jquery';
import TABLE_BODY from "./data.test.json";

type ArrayElementType = typeof TABLE_BODY[number] & {
    button: any;
  };

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const TransactionsEdits =()=> {

    const [loading, setLoading] = useState(false);

    const[historyStartDate,setHistoryStartDate]=useState(Moment().subtract(31, 'days').format('YYYY-MM-DD 00:00:00'))
    const[historyEndDate,setHistoryEndDate]=useState(Moment().format('YYYY-MM-DD 23:59:59'))
    const[historyPageSize,setHistoryPageSize]=useState(10)
    const[pageNo,setPageNo]=useState(1)
    const[totalPages,setTotalPages]=useState("")
    const[totalTransactions,setTotalTransactions]=useState("")


    //getting the transactions
    useEffect(()=>{
       AuthService.getTransactionsByDate(historyStartDate,historyEndDate,historyPageSize,pageNo).then((res)=>{
        console.log(res)
        setTotalPages(res.data.totalPages)
        setTotalTransactions(res.data.totalElements)

       }).catch((err)=>{
            console.log(err)            
        })

    },[historyEndDate,historyStartDate,pageNo,historyPageSize])


    const headerSortingStyle = { 
        color: 'rgb(85,110,230)',
        
    };

    const columns = [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'username',
        text: 'User Name'
      }, {
        dataField: 'location',
        text: 'Planet',
        sort: true,  
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          }   
      },{
        dataField: 'date',
        text: 'Date',
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
          }  
      },
      {
        dataField: 'score',
        text: 'Score',
        sort: true,  
        headerSortingStyle,
        sortCaret: (order, column) => {
            if (!order) return (<span class="font-23px"><i class="mdi mdi-menu-up "></i><i class="mdi mdi-menu-down"></i></span>);
            else if (order === 'asc') return (<span class="font-23px"><i class="mdi mdi-menu-up text-primary"></i><i class="mdi mdi-menu-down d-none"></i></span>);
            else if (order === 'desc') return (<span class="font-23px"><i class="mdi mdi-menu-up d-none"></i><i class="mdi mdi-menu-down text-primary"></i></span>);
            return null;
          }    
        
      }];

      
      const defaultSorted = [{
        dataField: 'date',
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
        };

        const label =start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');
                    
        

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
                    <div class="row">
                        <div class="col-12">
                            <div class="d-flex align-items-center justify-content-center text-center">
                                <p>No Results Found</p>
                            </div>
                        </div>
                    </div>
                </>
            )
          }
        //end of empty data table
    

   
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
        <title>Blink! | All Transatcions</title>
       
        </Helmet>    {/* the modals container */}
        <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row d-sm-none d-md-flex">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">Transaction Edits </h4>

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
                <h4 className="text-black pt-4 pb-3 p-3 border-bottom-1px fw-medium ">Transactions Edits</h4>
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
                                        <select class="form-select">
                                            <option>10 Rows</option>
                                            <option>15 Rows</option>
                                            <option>20 Rows</option>
                                            <option>25 Rows</option>
                                            <option>30 Rows</option>
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
                    </div>
                    <div className="card-body  min-h-90 px-0 pt-0">
                    <div class="row">
                        <div class="col-12 pb-2 d-none">
                            <div class="row">
                                <div class="col-sm-4 col-md-3 col-lg-2">
                                    <div class="pl-3">
                                        <select class="form-select">
                                            <option>10 Rows</option>
                                            <option>15 Rows</option>
                                            <option>20 Rows</option>
                                            <option>25 Rows</option>
                                            <option>30 Rows</option>
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
                                                    <span class="text-primary">Filter By School</span>
                                                    <h5 class="mb-0 pb-0 text-black">All Schools</h5>
                                                </span>
                                                <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                            </button>

                                            <div className="dropdown-menu dropdown-menu-end w-100 text-capitalize">
                                                {/* <!-- item--> */}
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-profile">All Schools</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-profile">School one</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-lock-screen">School Two</span>
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
                                                    <span class="text-primary">Filter By User type</span>
                                                    <h5 class="mb-0 pb-0 text-black">All Users</h5>
                                                </span>
                                                <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                            </button>

                                            <div className="dropdown-menu dropdown-menu-end w-100 text-capitalize">
                                                {/* <!-- item--> */}
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-profile">Guardians</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-profile">Blinkers</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-lock-screen">Merchants</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-lock-screen">Bursers</span>
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
                                                    <h5 class="mb-0 pb-0 text-black">All Transactions</h5>
                                                </span>
                                                <i className="mdi mdi-chevron-down d-xl-inline-block font-size-20 pl-4 pr-4"></i>
                                            </button>

                                            <div className="dropdown-menu dropdown-menu-end w-100 text-capitalize">
                                                {/* <!-- item--> */}
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-profile">Deposit</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-profile">Transafer</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-lock-screen">Merchants</span>
                                                </a>
                                                <a className="dropdown-item" href="#">                                            
                                                    <span key="t-lock-screen">Bursers</span>
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
                                    <button type="button" class="btn btn-outline-white waves-effect waves-light text-uppercase">
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
                            data={ products } 
                            columns={ columns }
                            defaultSorted={ defaultSorted }
                            headerClasses="table-light " 
                            headerWrapperClasses="kev-header"
                            noDataIndication={ indication }
                        /> 

                        {/* table footer starts here         */}
                        <div class="col-12">
                            <div class="w-100 d-flex p-3 align-items-center text-grey font-13px justify-content-end">
                                    <div class="d-flex align-items-center">
                                        <span class="pr-3 pb-0 mb-0 font-13px"><span>Rows Per Page</span></span>
                                        <select class="form-select w-auto font-13px ">
                                            <option>10</option>
                                            <option>15</option>
                                            <option>20</option>
                                            <option>25</option>
                                            <option>30</option>
                                        </select>
                                    </div> 
                                    <div class="px-4">
                                        <span>{(historyPageSize*pageNo)-historyPageSize+1}-{historyPageSize*pageNo} of {totalTransactions}</span>
                                    </div> 
                                    <div>
                                       <div class="kev-pagination">
                                       <ul class="pagination pagination-rounded justify-content-center mb-0 font-24px">
                                            <li class="page-item disabled">
                                                <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-page-first"></i></a>
                                            </li>
                                            <li class="page-item disabled">
                                                <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                                            </li>
                                           
                                            <li class="page-item">
                                                <a href="javascript: void(0);" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                                            </li>
                                            <li class="page-item">
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
export default TransactionsEdits;