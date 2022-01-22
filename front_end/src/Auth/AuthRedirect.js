
import React, { useReducer } from "react";
import {useParams,Redirect, Route, useHistory} from "react-router-dom";

export function AuthRedirect(){

    let {id_token}=useParams();
    localStorage.setItem("access_token",id_token.split("#")[0]);
    if(id_token.trim()!==""){
     return <Redirect to="/" />
    }else{
        document.getElementById("root").remove();
        return <Redirect to="/login"/>
    }
}

export function LoginProtect({Comp,...rest}){
    let val=localStorage.getItem("access_token");
    return <Route {...rest} render={
        props=>{
        if(val){
            return <Redirect to="/"/>
        }else{
            return <Comp/>
        }}
    }/>
}


export function Logout(){
   localStorage.removeItem("access_token");
   window.location.href="/login";
    
}