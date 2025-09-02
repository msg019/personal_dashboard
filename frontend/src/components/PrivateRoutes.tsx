import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "./Login/Login";
import { Loading } from "./Several/Loading";

export const PrivateRoutes=()=>{

    const [auth,setAuth]= useState(false);
    const [isload,setLoad]= useState(false);
   
    const changeLoad=()=>{
        setLoad(true)
    }

    useEffect(()=>{
        fetch('http://localhost:5000/api/validate',{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5000'
            },
            credentials: 'include',
        })
        .then(res=>res.json()
                .then(data=>{
                    if(!res.ok) throw new Error (data.error)
                    setAuth(data.auth)
                })
        )
        .catch(e=> console.error(e))
       changeLoad()
    },[])

   
    return(
        <>
            {
                auth && isload ? <Outlet /> : !auth && !isload ? <Loading /> : <Login />
            }
        </>
    )
}