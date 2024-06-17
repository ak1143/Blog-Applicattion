// you can also use this in nextjs
// a mechanism that is all about how to protect the routes and the pages
// authLayout:- A protected component

import React,{useEffect,useState} from "react";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
 
export default function Protected({children,authentication = true}){
    // the authentication is comming from the user 
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(()=>{
        // Todo:make it more easy
        // first condition;-
        // is the user passes the authentication as true && the authstatus is flase then
        // it shows the user is not validated it needs to redirect to the login page
        if(authentication && authStatus !==authentication){
            navigate("/login");
        }else if(!authentication && authStatus !==authentication){
            navigate("/");
        }
        setLoader(false);
    },[authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}