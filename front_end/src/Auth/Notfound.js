import {Redirect} from 'react-router-dom';



function Notfound(){
   if(localStorage.getItem("access_token")){
     return <Redirect to="/" />
    }else{
        return <Redirect to="/login"/>
    }
}

export default Notfound;