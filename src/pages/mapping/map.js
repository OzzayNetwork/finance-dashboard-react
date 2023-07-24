import React, {useState, useEffect,useMemo} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import './mappingAssets/css/map.css';
import mapStyles from './mapStyles'
// import {Marker,GoogleMap,useLoadScript } from '@react-google-maps/api';

import { GoogleMap, useJsApiLoader,useLoadScript,Marker } from '@react-google-maps/api';
import {MarkerF} from '@react-google-maps/api'
import {LoadScript,InfoWindow } from '@react-google-maps/api';

// bootstrap datatable
import BootstrapTable from 'react-bootstrap-table-next';

// importing map icons
import ActiveIcon from "./mappingAssets/images/active-agent.svg";
import InActiveIcon from "./mappingAssets/images/inactive-agent.svg";



import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const MapView =()=> {
    const [loading, setLoading] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
   
    const [ selected, setSelected ] = useState({});
   
   
   

    const onSelect = item => {
        setSelected(item);
        //alert(item.name)
    }

  

   
    //array returning multiple locations
    const locations = [
        {
          name: "Location 1",
          location: { 
            lat: -0.5391841900615606, 
            lng: 34.45690188295447 
          },
        },
        {
          name: "Location 2",
          location: { 
            lat: -0.40607414040125894, 
            lng: 34.17256775075519
          },
        },
        {
          name: "Location 3",
          location: { 
            lat: -0.4336737430376215, 
            lng:34.89661544690229
          },
        },
        {
          name: "Location 4",
          location: { 
            lat: -0.5274469423889167, 
            lng: 34.73737120604792
          },
        },
        {
          name: "Location 5",
          location: { 
            lat: -0.5623293280215187, 
            lng: 34.25008520275887
          },
        }
      ];

      const options={
        styles:mapStyles,
        disableDefaultUI:true,
        zoomControl:true,
        scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: true,
      }
    
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:"AIzaSyAGPbYfcYqdbSBeXdIpH5iWrznfU886Qk8",
    });

    function InitMap(){
        const center = useMemo(() => ({ lat: -0.5306294206232787, lng: 34.46123164921829 }), []);
        return( 
        <GoogleMap 
            zoom={10} 
            center={center}
            mapContainerClassName='h-100'
            options={options}
            >  

            

            {/* multiple inactive users   */}
            {
            locations.map(item => {
                return (
                <MarkerF 
                    key={item.name} 
                    position={item.location}
                    onClick={() => onSelect(item)}
                    icon={{
                        url: InActiveIcon,
                        scaledSize: new window.google.maps.Size(60, 60)
                    }}
                />
                )
                })
            }
            {/* end of inactive users */}

            {/* clicking inactive user maker */}

            {
                selected.location && 
                (
                <InfoWindow
                    position={selected.location}
                    clickable={true}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -65)
                        }}
                    
                    onCloseClick={() => setSelected({})}
                    >
                    <>
                        <p class="d-none">agent|agent num</p>
                        <h6 class="text-capitalize d-flex align-items-center">
                            <span class="offline-agent mr-2 me-2"></span> 
                            <span>Alex Wanjala<small><strong>(INACTIVE)</strong></small></span>
                        </h6>
                        <p class="pb-0 mb-0">Last seen at <strong>Tom Mboya Street</strong> at <strong>2:06 PM</strong></p>
                        <p>Most recent activity: <strong>Queried Car plate Number KBW 2589T at 11:41PM</strong></p>

                        <div>
                            <div class="listview__header text-align-left text-capitalize text-left mb-2">
                                Collected <strong>KES 25,000</strong> towards the <strong>KES 450,000</strong> Target.
                            </div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"  style={{width:'25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                    </>

                </InfoWindow>
                )
            }

            {/* end of clicking inactive user maker */}
            <MarkerF 
            position={center}
           
            icon={{
                url: require('./mappingAssets/images/active-agent.svg').default,
                scaledSize: new window.google.maps.Size(60, 60)
                }}
            />

            <MarkerF
            position={{ lat: -0.530669420687, lng: 34.4912316499 }}
            icon={{
            scaledSize: new window.google.maps.Size(32, 32),
            }}
            onClick={() => setSelectedMarker(MarkerF)}
            />;

            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker.position}
                    onCloseClick={() => setSelectedMarker(null)}
                    >
                    <div>
                    <h4>Some information about markerF</h4>
                    <p>Some more details</p>
                    </div>
                </InfoWindow>
            )}

            
        </GoogleMap>
            )
    }

   if(!isLoaded) return(<>
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
                    <p className="m-0 p-0 text-u">Loading Map</p>
                </div>
            </div>
   </>);
   return ( 
    <>

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
                            <div id="map" class="w-100 mt-1 h-100 live-map-cont main-map-container">
                                <InitMap></InitMap>
                            </div>
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