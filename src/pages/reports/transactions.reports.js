import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";


// react bootstrap starts here
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
   
} from 'react-bs-datatable';
import { Button, Col, Row, Table } from "react-bootstrap";
import TABLE_BODY from "./data.test.json";




import $ from 'jquery';

type ArrayElementType = typeof TABLE_BODY[number] & {
    button: any;
  };

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const Transactions =()=> {

    const [loading, setLoading] = useState(false);
    // Create table headers consisting of 4 columns.
    const STORY_HEADERS: TableColumnType<ArrayElementType>[] = [
        {
        prop: "name",
        title: "Name",
        isFilterable: true
        },
        {
        prop: "username",
        title: "Username"
        },
        {
        prop: "location",
        title: "Location"
        },
        {
        prop: "date",
        title: "Last Update",
        isSortable: true
        },
        {
        prop: "score",
        title: "Score",
        isSortable: true
        },
        {
        prop: "button",
        cell: (row) => (
            <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
                alert(`${row.username}'s score is ${row.score}`);
            }}
            >
            Click me
            </Button>
        )
        }
    ];

   
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
                    <h4 className="mb-sm-0 font-size-18">Blink transactions </h4>

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
                <h4 className="text-black pt-4 pb-3 p-3 border-bottom-1px fw-medium ">Transactions</h4>
            </div>
        </div>
        {/* <!-- end page title --> */}
        <div className="row">
            <div className="col-12">
                    <div className="card no-shadow-sm">
                        <div className="card-header pt-2 bg-white w-100 d-flex justify-content-between align-items-center w-100 border-bottom">
                            <div className="col-sm-12 w-100 col-md-6 col-lg-8 col-xl-5">
                            <div className="dropdown d-inline-block w-100 d-flex align-items-center">
                               

                            </div>
                            </div>
                        </div>
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom d-sm-none d-md-flex">

                        <div className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100" role="toolbar">
                            <div className="d-md-flex d-none align-items-center">
                                
                                <div class="btn-group select-tbl-filter" role="group" aria-label="Basic example">
                                    <button  type="button" class="btn active btn-outline-primary waves-light waves-effect d-flex align-items-center justify-content-center">View All</button>
                                    <button  type="button" class="btn btn-outline-primary waves-light waves-effect d-flex align-items-center justify-content-center"><i className="mdi mdi-arrow-down-bold font-size-16"></i><span className="pl-1 d-none d-lg-inline d-md-inline">Money In</span></button>
                                    <button  type="button" class="btn btn-outline-primary  waves-light waves-effect d-flex align-items-center justify-content-center"><i className="mdi mdi-arrow-up-bold font-size-16"></i> <span className="pl-1 d-none d-lg-inline d-md-inline">Expenses</span></button>
                                </div>

                            </div>
                            <div className="dataTables_filter   px-3 flex-grow-1">
                                <label>
                                    <input type="search" className="form-control form-control-sm emailSearch w-100" placeholder="Search through Records ..." aria-controls="datatable-buttons"/>
                                </label>
                            </div>
                            <div className="">
                                <a href="property-new.html" type="button" className="btn btn-dark dropdown-toggle option-selector d-flex align-items-center justify-content-center">
                                    <i className="bx bx-slider-alt  font-size-16"></i> <span className="pl-1 d-md-inline">Filter Table</span>
                                </a>
                            </div>


                        </div>
                    
                    </div>
                    <div className="card-body  min-h-90 px-0">
                    
                    <DatatableWrapper
                                body={TABLE_BODY}
                                headers={STORY_HEADERS}
                                headerClasses="header-class"
                                paginationOptionsProps={{
                                    initialState: {
                                    rowsPerPage: 10,
                                    options: [5, 10, 15, 20]
                                    }
                                }}

                                
                                >
                                <div className="mb-4 d-flex px-3">
                                    <Col
                                    xs={12}
                                    lg={4}
                                    className="d-flex flex-col justify-content-end align-items-end"
                                    >
                                    <Filter className="d-none" />
                                    </Col>
                                    <Col
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                                    >
                                    <PaginationOptions />
                                    </Col>
                                    <Col
                                    xs={12}
                                    sm={6}
                                    lg={4}
                                    className="d-flex flex-col justify-content-end align-items-end"
                                    >
                                    <Pagination />
                                    </Col>
                                </div>
                                <Table   hover responsive className="tb-verticle-middle">
                                    <TableHeader variant="dark" className="text-primary thead-dark table-light">
                                      
                                    </TableHeader>
                                    <TableBody />
                                </Table>
                            </DatatableWrapper>
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
export default Transactions;