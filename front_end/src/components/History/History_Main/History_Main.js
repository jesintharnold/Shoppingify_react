import './History_Main.scss';
import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';

function HistoryMain({HistoryData}){


    

return (

<div className="History_main">

    <div className="history_main_name">Shopping history</div>
    {
        HistoryData.map(({DOM,data},i)=>
        <React.Fragment key={`Month-${i}`}>

             <span className="history_month_year">{DOM}</span>
             {data.map(({DateOfCreation,Name,Status,cat_item},index)=>
             
        <Link className="history_container" key={`H-${index}`} to={`/history/${i}${index}`} >
             <span>{Name}</span>
             <div className="date_data">
             <span class="material-icons">calendar_today</span>
             <span>{DateOfCreation}</span>
             <div className={Status==="completed"?`status-comp`:`status-danger`}>{Status}</div>
             <span class="material-icons navigate">navigate_next</span>
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
       
    }
    } 

    export default connect(mapStatetoProps,mapDispatchtoProps)(HistoryMain)
