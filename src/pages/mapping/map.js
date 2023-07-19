import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import './map.css';

// bootstrap datatable
import BootstrapTable from 'react-bootstrap-table-next';


import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const MapView =()=> {
    const [loading, setLoading] = useState(false);

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
                <title>Map View</title>       
            </Helmet>   
            <div className="container-fluid">
                <div className="row d-sm-none d-md-flex">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">Map View </h4>

                            <div className="page-title-right d-sm-none d-md-flex">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                                    <li className="breadcrumb-item active">Map View</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white boarder-bottom-1 d-none">
                                <div class="row d-flex justify-content-between">
                                    <div class="col-12">
                                        <div class="search-box mb-2 me-2">
                                            <div class="position-relative">
                                                <input type="text" class="form-control bg-light border-light rounded map-searcher"
                                                    id="pac-inpu" placeholder="Search for location"/>
                                                <i class="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="card-body">
                                <div id="map" class="w-100 mt-1 h-100 live-map-cont main-map-container"></div>
                            </div>

                        </div>

                        <div class="">
                            <div class="position-relative ">

                                <div class="form-group map-searcher">

                                    <input type="text" class="form-control form-control-lg text-black"
                                        placeholder="Search for a location" id="pac-input"/>
                                    <button title="Clear search results" class="btn btn-transparent border-0 clear-map"><i
                                            class="mdi mdi-close d-none"></i></button>
                                </div>

                                <div class="map-key-card card">
                                    <div class="card-body">
                                        <i class="mdi mdi-key-variant"></i>
                                    </div>
                                </div>

                                <div class="card map-card animated slideInLeft d-none">
                                    <span class="close-map-key"><i class="zmdi zmdi-close"></i></span>
                                    <div class="card-body">
                                        <h4 class="card-title">Map Key</h4>

                                    </div>
                                    <div class="listview py-4 map-key">
                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/damaged.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Damaged Ad Plates</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/available.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Available Ad Plates</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/rented.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Rented Ad Plates</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/multiple-plates.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Multiple sided Ad Plates</strong></div>
                                            </div>
                                        </span>


                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/rejected.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Rejected Applications</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/pending.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Pending applications</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/approved.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Approved Applications</strong></div>
                                            </div>
                                        </span>


                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/warning.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Incidents</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/active-agent.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>active-agent</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/inactive-agent.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Inactive agents</strong></div>
                                            </div>
                                        </span>

                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/parliament.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>City Hall</strong></div>
                                            </div>
                                        </span>


                                        <span class="listview__item py-0">
                                            <img src="assets/images/map-assets/flag.svg" class="listview__img" alt=""/>

                                            <div class="listview__content d-flex align-items-center">
                                                <div class="listview__heading"><strong>Service/Collection Point</strong></div>
                                            </div>
                                        </span>



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
export default MapView;