import './History_Main.scss';
import {connect} from 'react-redux';
import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { GetHistoryDataAsync } from '../../../Redux/ActionCreators';


function HistoryMain({HistoryData,GetHistory}){

    useEffect(()=>{
        if(localStorage.getItem("access_Id")){
            console.log(`Calling History Method`);
            GetHistory();
        }
    },[]);


    const date_format=(payload)=>{
        let A=new Date(payload).toDateString().split(" ")[0];
        let B=new Date(payload).toDateString().split(" ")[2];
        console.log(B+" "+A);
        return B+" "+A;
    }
    

return (

<div className="History_main">

    <div className="history_main_name">Shopping history</div>
    {HistoryData.map(({DOM,data},i)=>
        <React.Fragment key={`Month-${i}`}>
             <span className="history_month_year">{DOM}</span>
             {data.map(({DateOfCreation,Name,Status,cat_item},index)=>
        <Link className="history_container" key={`H-${index}`} to={`/history/${i}${index}`} >
             <span>{Name}</span>
             <div className="date_data">
             <span className="material-icons">calendar_today</span>
             <span>{date_format(DateOfCreation)}</span>
             <div className={Status==="completed"?`status-comp`:`status-danger`}>{Status}</div>
             <span className="material-icons navigate">navigate_next</span>
            </div>
        </Link>
           )}

        </React.Fragment>
        )
    }
   
</div>
    );
}


const mapStatetoProps=(state)=>{
    return{
        HistoryData:state.HistoryItems.data
    }
}
    
const mapDispatchtoProps=dispatch=>{
    return {
       GetHistory:()=>dispatch(GetHistoryDataAsync())
    }
} 

    export default connect(mapStatetoProps,mapDispatchtoProps)(HistoryMain)
