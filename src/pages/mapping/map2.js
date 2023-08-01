import React, { useState, useEffect, useMemo, useCallback, setData } from 'react';
import { Helmet } from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'moment'
import { Link, useLocation, matchRoutes } from "react-router-dom";
import './mappingAssets/css/map.css'
import mapStyles from './mapStyles'
import ClickedAgent from '../../components/ClickedAgentTodayHighlights'
import ClickedZone from '../../components/ClickedZoneTodayHighlights'
// import {Marker,GoogleMap,useLoadScript } from '@react-google-maps/api';

import { GoogleMap, useJsApiLoader, useLoadScript, Marker } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api'
import { LoadScript, InfoWindowF,InfoWindow } from '@react-google-maps/api';

// bootstrap datatable
import BootstrapTable from 'react-bootstrap-table-next';

// importing map icons
import ActiveIcon from "./mappingAssets/images/active-agent.svg";
import InActiveIcon from "./mappingAssets/images/collector/inactive.svg";

import inactiveInspector from "./mappingAssets/images/inspectors/inactive.svg"
import activeInspector from "./mappingAssets/images/inspectors/active.svg"
import idleInspector from "./mappingAssets/images/inspectors/idle.svg"
import loggedOutInspector from "./mappingAssets/images/inspectors/loggedOut.svg"

import inactiveEnforcer from "./mappingAssets/images/enforcer/inactive.svg"
import activeEnforcer from "./mappingAssets/images/enforcer/active.svg"
import idleEnforcer from "./mappingAssets/images/enforcer/idle.svg"
import loggedOutEnforcer from "./mappingAssets/images/enforcer/loggedOut.svg"

import inactiveCollector from "./mappingAssets/images/collector/inactive.svg"
import activeCollector from "./mappingAssets/images/collector/active.svg"
import idleCollector from "./mappingAssets/images/collector/idle.svg"
import loggedOutCollector from "./mappingAssets/images/collector/loggedOut.svg"

//collection zones
import parkingDanger from "./mappingAssets/images/ParkingZone/parkingDanger.svg"
import parkingOnTarget from "./mappingAssets/images/ParkingZone/onTarget.svg"
import parkingOverTarget from "./mappingAssets/images/ParkingZone/aboveTarget.svg"
import parkingUnderPerforming from "./mappingAssets/images/ParkingZone/underPerfoming.svg"

import cessInactive from "./mappingAssets/images/CessBarrier/inactive.svg"
import cessWarning from "./mappingAssets/images/CessBarrier/warning.svg"
import cessDanger from "./mappingAssets/images/CessBarrier/danger.svg"
import cessInfo from "./mappingAssets/images/CessBarrier/info.svg"
import cessSuccess from "./mappingAssets/images/CessBarrier/success.svg"
import cessTop from "./mappingAssets/images/CessBarrier/topPerfomring.svg"


import marketInactive from "./mappingAssets/images/market/inactive.svg"
import marketWarning from "./mappingAssets/images/market/warning.svg"
import marketDanger from "./mappingAssets/images/market/danger.svg"
import marketInfo from "./mappingAssets/images/market/info.svg"
import marketSuccess from "./mappingAssets/images/market/success.svg"
import marketTop from "./mappingAssets/images/market/top.svg"

import fishingInactive from "./mappingAssets/images/fishingBeaches/inactive.svg"
import fishingWarning from "./mappingAssets/images/fishingBeaches/warning.svg"
import fishingDanger from "./mappingAssets/images/fishingBeaches/danger.svg"
import fishingInfo from "./mappingAssets/images/fishingBeaches/info.svg"
import fishingSuccess from "./mappingAssets/images/fishingBeaches/success.svg"
import fishingTop from "./mappingAssets/images/fishingBeaches/topPerforming.svg"

import busParkInactive from "./mappingAssets/images/busPark/inactive.svg"
import busParkWarning from "./mappingAssets/images/busPark/warning.svg"
import busParkDanger from "./mappingAssets/images/busPark/danger.svg"
import busParkInfo from "./mappingAssets/images/busPark/info.svg"
import busParkSuccess from "./mappingAssets/images/busPark/success.svg"
import busParkTop from "./mappingAssets/images/busPark/top.svg"




import $ from 'jquery';


const InitMap = React.memo(({ locations }) => {

    const [mapref, setMapRef] = React.useState (null);

    const [mapZoom, setMapZoom] = useState(12)
    const [mapCenter, setMapCenter] = useState({ lat: -0.5306294206232787, lng: 34.46123164921829 })

    const [collectionZone,setCollectionZone]=useState([
        {
            name: "Kindubay Bus Park",
            type:"Bus Park",
            icon:busParkSuccess,
            location: {
                lat:-0.3687654665436913, 
                lng: 34.65111241577079
            },
        },

        {
            name: "Nyangweso Market",
            type:"Bus Park",
            icon:marketInactive,
            location: {
                lat:-0.4755908682916434, 
                lng: 34.54662052178608
            },
        },

        {
            name: "Komodi Barrier",
            type:"Bus Park",
            icon:cessTop,
            location: {
                lat: -0.381527, 
                lng: 34.656852
            },
        },
        {
            name: "Fishing Beach",
            type:"Fishing Beach",
            icon:fishingInfo,
            location: {
                lat:  -0.3186781165491234, 
                lng: 34.77781329138044
            },
        },

       

        {
            name: "Mbita Market",
            type:"market",
            icon:marketTop,
            location: {
                lat:-0.4212510460601347, 
                lng: 34.20693267734596
            },
        },
    ])
    const [inactiveAgents, setInactiveAgents] = useState([
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
                lng: 34.89661544690229
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
    ])

    const center = useMemo(
        () => (mapCenter),
        [],
    )
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: true,
    }

    const [selected, setSelected] = useState({})
    const [clickeMarker, setClickedMarker] = useState({})

    const[selectedZone,setSelectedZone]=useState({})

    // Memoize the onSelect function using useCallback
    const onSelect = useCallback((item) => {
        setSelected(item)
    }, [])

    const onZoneSelected=useCallback((item)=>{
        setSelectedZone(item)
    },[])

    // Memoize the onSelect function using useCallback
    const markerClicked = useCallback((item) => {
        setClickedMarker(item)
        //alert("clicked")
        item.animation = (2)
        $('.openMapCanvas').click()


    }, [])

    const zoneClicked = useCallback((item) => {
        setClickedMarker(item)
        //alert("clicked")
        item.animation = (2)
        $('.openZoneCanvas').click()
        // alert("opening zone canvas")


    }, [])


    // const onMarkerLeave = useCallback((item)=>{
    //     setSelected({})
    //   //  $('.gm-style .gm-style-iw-c button').click()
    // },[])

    //store new map center here
    const handleMapCenterChange = () => {
        if (mapref) {
        const newCenter = mapref.getCenter ();
        console.log (newCenter);
        }
        console.log("changing")
        console.log(mapref.getZoom ())
        // setMapZoom(mapref.getZoom ())
        // setMapCenter(mapref.getCenter ())
    };

    const handleMapLoad = map => {
        setMapRef (map);
       
        };





    return (


        <>

            <GoogleMap
                // onLoad= {handleMapLoad}
                // onCenterChanged= {handleMapCenterChange}
                center={mapCenter}
                zoom={mapZoom}
                mapContainerClassName='h-100'
                options={options}
            >
                {
                    inactiveAgents?.map(item => {
                        return (
                            <MarkerF
                                animation={4}
                                key={item?.name}
                                position={item?.location}
                                onMouseOver={() => onSelect(item)}
                                onMouseOut={() => setSelected({})}
                                onClick={() => markerClicked(item)}
                                icon={{
                                    url: inactiveCollector,
                                    scaledSize: new window.google.maps.Size(60, 60)
                                }}
                            />
                        )
                    })
                }

                {
                    selected.location &&
                    (
                        <InfoWindowF
                            position={selected?.location}
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
                                    <span>{selected?.name}<small><strong>(INACTIVE)</strong></small></span>
                                </h6>
                                <p class="pb-0 mb-0">Last seen at <strong>Tom Mboya Street</strong> at <strong>2:06 PM</strong></p>
                                <p>Most recent activity: <strong>Queried Car plate Number KBW 2589T at 11:41PM</strong></p>

                                <div>
                                    <h5 className='text-black'>96%</h5>
                                    <div class="progress border-radius-0">
                                        <div class="progress-bar progress-bar-success" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="listview__header text-align-left text-capitalize text-left mb-2">
                                        Collected <strong>KES 25,000</strong> towards the <strong>KES 450,000</strong> Target.
                                    </div>
                                </div>

                            </>

                        </InfoWindowF>
                    )
                }

                {/* collection zones markers */}
                
                {
                    collectionZone.map(item => {
                        return (
                            <MarkerF
                                animation={4}
                                key={item?.name}
                                position={item?.location}
                                onMouseOver={() => onZoneSelected(item)}
                                onMouseOut={() => setSelectedZone({})}
                                onClick={() => zoneClicked(item)}
                                icon={{
                                    url: item?.icon,
                                    scaledSize: new window.google.maps.Size(60, 60)
                                }}
                            />
                        )
                    })
                }

                {
                    selectedZone.location &&
                    (
                        <InfoWindowF
                            position={selectedZone?.location}
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
                                    <div>
                                        <span>{selectedZone?.name} </span>                                   
                                        <p class="pb-0 mb-0">{selectedZone?.type}</p>
                                    </div>
                                </h6>
                                
                                <p>Most recent activity: <strong>Queried Car plate Number KBW 2589T at 11:41PM</strong></p>

                                <div className='mb-3'>
                                    <h5 className='text-black'>45% Collection Perfomance</h5>                                    
                                    <div class="progress border-radius-0">
                                        <div class="progress-bar bg-warning" style={{ width: '45%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="listview__header text-align-left text-capitalize text-left mb-2">
                                        Collected <strong>KES 25,000</strong> towards the <strong>KES 450,000</strong> Target.
                                    </div>
                                </div>

                                <div>
                                    <h5 className='text-black'>25% Inactive</h5>                                    
                                    <div class="progress border-radius-0">
                                        <div class="progress-bar bg-danger" style={{ width: '75%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="listview__header text-align-left text-capitalize text-left mb-2">
                                        <strong>34/54</strong> Revenue Agents are active, please alert the inactive ones.
                                    </div>
                                </div>


                            </>

                        </InfoWindowF>
                    )
                }
                {/* end of collection zones markers */}

            </GoogleMap>
            <ClickedAgent></ClickedAgent>
           <ClickedZone></ClickedZone>

        </>

    )


})

const MapView = () => {
    const [loading, setLoading] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
   
    



    const [selected, setSelected] = useState({});



    const [mapContainer, setMapContainer] = useState(null)

    //map styles
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: true,
    }

    // const [mapRenderOptions,setMapRenderOptions]=useState({
    //     zoom:mapZoom,
    //     center:{mapCenter},
    //     options:{options},
    //     mapContainerClassName:'h-100'       
    // })

    //   clicked marker
    const onSelect = item => {
        setSelected(item);
        //alert(item.name)
        // alert("mark")
    }



    //   const onSelect = useCallback((item) => {
    //     if (selected) {
    //         setSelected(item)
    //     }
    //   }, [selected]);




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
                lng: 34.89661544690229
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



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAGPbYfcYqdbSBeXdIpH5iWrznfU886Qk8",
    });


    if (!isLoaded) return (<>
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
                    <div className="col-12 d-none">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">Map View 2</h4>

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
                                                    id="pac-inpu" placeholder="Search for location" />
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

                                <div>

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