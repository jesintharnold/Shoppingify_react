import React from "react";
import {useParams,Redirect, Route,useHistory} from "react-router-dom";

export function AuthRedirect(){

    let {id_token,id}=useParams();
    localStorage.setItem("access_token",id_token.split("#")[0]);
    localStorage.setItem("access_Id",id);
    if(id_token.trim()!==""){
     return <Redirect to="/" />
    }else{
        document.getElementById("root").remove();
        return <Redirect to="/login"/>
    }
}

export function LoginProtect({Comp,...rest}){
    let val=localStorage.getItem("access_token");
    let val_=localStorage.getItem("access_Id");
    return <Route {...rest} render={
        props=>{
        if(val&&val_){
            return <Redirect to="/"/>
        }else{
            return <Comp/>
        }}
    }/>
}


export function Logout(){
   localStorage.removeItem("access_token");
   localStorage.removeItem("access_Id");
   window.location.href="/login";
}