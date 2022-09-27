import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes} from "react-router-dom"
import StdFunctions from "../services/standard.functions";
import $ from 'jquery';


// import $ from 'jquery';
const ChatWidget=()=>{
   // alert("we are here")

  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/631603c054f06e12d892d405/1gc6vtacp';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();

   

    

    const location = useLocation();
    let currentWindow=location.pathname;
    //alert(currentWindow)
  
    //let currentWindow = location.pathname;
    let ourBaseURL = "/Login";
    console.log(currentWindow)
  
  if (currentWindow.includes(ourBaseURL)) {
    console.log("We are at the authentication pages");
  } else {
    //console.log(location.pathname)
  return (
    <>
   
    </>
  );
  }

  
  
}

export default ChatWidget;
