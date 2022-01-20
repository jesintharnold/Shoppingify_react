import {Redirect, useParams} from 'react-router-dom';



function AuthRedirect(){

    let {id_token}=useParams();
    localStorage.setItem("access_token",id_token.split("#")[0]);
    if(id_token.trim()!==""){
     return <Redirect to="/" />
    }else{
        return <Redirect to="/login"/>
    }
}

export default AuthRedirect;