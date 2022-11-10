import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import {Link,useLocation,matchRoutes} from "react-router-dom";
import StdFunctions from "./standard.functions";
import AuthService from "./auth.service";
const ListItems=()=>{
    const[numOfInstitutions,setNumOfInstitutions]=useState(0);
    const [theSchools,setTheschools]=useState([]);

    useEffect(()=>{
        AuthService.getInstitutions().then((res)=>{            
            setNumOfInstitutions(res.data.data.length)  
            setTheschools(res.data.data.sort((a, b) => b.totalStudents - a.totalStudents))  
            //console.log(res.data.data.sort((a, b) => b.totalStudents - a.totalStudents))     
        })
    },[])

}
export default ListItems;