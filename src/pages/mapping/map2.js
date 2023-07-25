import React, {useState, useEffect,useMemo,useCallback,setData} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import './mappingAssets/css/map.css'
import mapStyles from './mapStyles'
import ClickedAgent from '../../components/ClickedAgentTodayHighlights'
// import {Marker,GoogleMap,useLoadScript } from '@react-google-maps/api';

import { GoogleMap, useJsApiLoader,useLoadScript,Marker } from '@react-google-maps/api';
import {MarkerF} from '@react-google-maps/api'
import {LoadScript,InfoWindowF } from '@react-google-maps/api';

// bootstrap datatable
import BootstrapTable from 'react-bootstrap-table-next';

// importing map icons
import ActiveIcon from "./mappingAssets/images/active-agent.svg";
import InActiveIcon from "./mappingAssets/images/inactive-agent.svg";



import $ from 'jquery';


const InitMap = React.memo(({ locations }) => {

    const [mapZoom,setMapZoom]=useState(10)
    const [mapCenter,setMapCenter]=useState({ lat: -0.5306294206232787, lng: 34.46123164921829 })
    const [inactiveAgents,setInactiveAgents]=useState([
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
    const [clickeMarker,setClickedMarker]=useState({})
  
    // Memoize the onSelect function using useCallback
    const onSelect = useCallback((item) => {
      setSelected(item)
    }, [])

     // Memoize the onSelect function using useCallback
     const markerClicked = useCallback((item) => {
        setClickedMarker(item)
        //alert("clicked")
        item.animation=(2)
        $('.openMapCanvas').click()
        
        
      }, [])
  

    // const onMarkerLeave = useCallback((item)=>{
    //     setSelected({})
    //   //  $('.gm-style .gm-style-iw-c button').click()
    // },[])

    

    
  
    return(
       

<>

<GoogleMap
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
                    onMouseOut={()=>setSelected({})}
                    onClick={()=>markerClicked(item)}
                    icon={{
                        url: InActiveIcon,
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
                            <div class="listview__header text-align-left text-capitalize text-left mb-2">
                                Collected <strong>KES 25,000</strong> towards the <strong>KES 450,000</strong> Target.
                            </div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-success"  style={{width:'25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>

                    </>

                </InfoWindowF>
                )
            }

        </GoogleMap>
        <ClickedAgent></ClickedAgent>
   
</>

    ) 

    
  })

const MapView =()=> {
    const [loading, setLoading] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    
    
   
    const [ selected, setSelected ] = useState({});
    
   

    const [mapContainer,setMapContainer]=useState(null)

    //map styles
    const options={
        styles:mapStyles,
        disableDefaultUI:true,
        zoomControl:true,
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

     
    
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:"AIzaSyAGPbYfcYqdbSBeXdIpH5iWrznfU886Qk8",
    });

   
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

                            <div>
                            <button class="btn btn-primary openMapCanvas d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mapCanvas">
    open Marker Conent Canavas
  </button>
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