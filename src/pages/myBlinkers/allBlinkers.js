import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AuthService from "../../services/auth.service";
import StdFunctions from "../../services/standard.functions";
import Moment from 'moment'
import {Link,useLocation,matchRoutes} from "react-router-dom";
import $ from 'jquery';

// import   JquerryAccordion   from "./customPlugins/jquerryAccordion";
const AllBlinkers =()=> {
    const transactionsCountTwo=0

     // loader setting
     const [loading, setLoading] = useState(false);
     const [quote, setQuote] = useState({});

    const [students, setstudents] = useState([])
    const [studentProfile, setStudentProfile] = useState({})


    //getting selected account pocket money id
    const[blinkWalletAccountNum,setBlinkWalletAccountNum]=useState("")

    const [firstStudent,setFirstStudent]=useState({})
    const [schoolName,setSchoolName]=useState("")
    const [myBlinkersCount,setMyBlinkersCount]=useState(0);
    const [hasBlinkers,setHasBlinkers]=useState(false)

     useEffect(() => {

        setLoading(true);
        //const allBlinkers=JSON.parse(localStorage.getItem("guardianBlinkers"));
        const allBlinkers=AuthService.getLogedInAssociates()
        setstudents(allBlinkers)
        console.log("All My blinkers are")
        console.log(allBlinkers)
        setFirstStudent(allBlinkers[0])
        setMyBlinkersCount(allBlinkers.length)
        if(allBlinkers.length===0){
            setHasBlinkers(false)
        }
        else{
            setHasBlinkers(true)
        }
        //console.log(allBlinkers[0])
        AuthService.getStudentDetails(AuthService.getLogedInAssociates()[0].userId).then((res)=>{
            setQuote(res);
            setTimeout(() => {
                setLoading(false);
              }, 1000);

            setStudentProfile(res.data.data.userProfile)
            setBlinkWalletAccountNum(res.data.data.userProfile.blinkaccounts.find(x=>x.blinkersAccountType==='POCKECT_MONEY').accountNumber)
            console.log("the blink wallet account Id is:"+blinkWalletAccountNum)
           
        }).catch((err)=>{

        })
    },[])
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
        <title>Blink! | My Blinkers</title>
        </Helmet>    {/* the modals container */}
        <div className="container-fluid">

        {/* <!-- start page title --> */}
        <div className="row d-sm-none d-md-flex">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">My Assigned Blinkers</h4>

                    <div className="page-title-right d-sm-none d-md-flex">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Dashboards</Link></li>
                            <li className="breadcrumb-item active">My blinkers</li>
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
                    {hasBlinkers ? (
                        <div className="card-body show-trans-cont min-h-90">
                            <div className="table-responsive ">

                                <table className="table border-light table-striped table-bordere table-borderles align-middle table-nowrap table-hover  contacts-table table-stripe " id="datatable-buttons">
                                    <thead className="table-light text-capitalize">
                                        <tr className="table-light">
                                            <th>Blinker</th>
                                            <th>Blink ID</th>
                                            <th>Gender</th>
                                            <th>Card Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>                                 

                                    {students.map((item, index)=>(
                                            <tr>                                           
                                                <td>
                                                    <a class="d-flex p-0 m-0 waves-effect dropdown-item d-flex align-items-center">
                                                        <div class="flex-shrink-0 me-3">
                                                            <img class="rounded-circle d-none" src="assets/images/users/avatar-4.jpg" alt="Generic placeholder image" height="36"/>
                                                            <div class="avatar-xs mx-auto ">
                                                                <span class="avatar-title rounded-circle bg-random font-size-14 profile-abriv">{item.firstName.charAt(0)+item.middleName.charAt(0)}</span>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 chat-user-box">
                                                            <p class="user-title m-0">{item.firstName+" "+item.middleName+" "+item.lastName}</p>
                                                            </div>
                                                    </a>
                                                </td>
                                                <td>{item.blinkId}</td>
                                                <td>{item.gender}</td>
                                                
                                                <td className="text-uppercase fw-semibold">
                                                    {StdFunctions.areTheyThesame(item.cardStatus,"Active") ? (
                                                        <span class="badge badge-pill badge-soft-success font-size-11">{item.cardStatus}</span>
                                                        ):(
                                                        <span class="badge badge-pill badge-soft-warning font-size-11">{item.cardStatus}</span>
                                                        )
                                                    }
                                                </td>
                                                
                                                <td>
                                                    <Link params={item.userProfileId}  to={"/BlinkerDetails/" + item.userProfileId} className="btn btn-primary btn-sm">View Details</Link>
                                                </td>

                                            </tr>
                                            ))
                                            
                                        }  

                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                        ):(
                            <div className="card-body no-trans-cont px-5 mb-5 d-flex flex-column justify-items-center align-items-center text-center">
                                <div className="p-5 mt-5 mx-5 py-0">
                                    <img src="assets/images/illustration-images/box-color.png" height="160px" className="img mb-4"/>
                                </div>
                                <h4 className="fw-bold">You Have No Associations</h4>
                                <p>No Blinkers have been assigned to you as of yet, you can start by sending requests.</p>                                
                            </div>
                        )
                    }
                   
                </div>
            </div>
            {/* <!-- end col --> */}
        </div>

        {/* <!-- end row --> */}
        </div>

        </>
    );
}
export default AllBlinkers;