import React  from "react";
import { Redirect, Route, useHistory} from "react-router-dom";


const PrivateRoute=({Comp,...rest})=>{
    let val=localStorage.getItem("access_token");
    console.log(val);
    let history=useHistory();
    return <Route {...rest} render={
        props=>{
        if(val){
            console.log(`Calling this Method`);
            return <Comp/>
        }else{
            history.replace({
                pathname:"/login",
                state:{isActive: true}
            });
            document.getElementById("root").remove();
            return <Redirect to="/login"/>
        }}
    }/>
};


export default PrivateRoute;