import './HistoryExpand.scss';
import {Link,useParams} from 'react-router-dom';
import {connect} from 'react-redux';

function HistoryExpand({HistoryData}){

    let {history_id}=useParams();
    let his_con=history_id.split("")[0];
    let cat_con=history_id.split("")[1];

return (
<div className="History_expand">

<Link to={"/history"}>
<span class="material-icons">keyboard_backspace</span>
<span>back</span>
</Link>   

<div className="List_name">{HistoryData[his_con].data[cat_con].Name}</div>

<div className="date_list">
<span class="material-icons">calendar_today</span>
<span>{HistoryData[his_con].data[cat_con].DateOfCreation}</span>
</div>


<div className="History_items">

{
HistoryData[his_con].data[cat_con].cat_item.map(
    ({category,items},index)=>

    <>

    <div className="container_name" key={`con-cat-his-${index}`}>{category.name}</div>
    
    <div className="his_itm">
        {items.map(({name,quantity})=>
        <div className="his_itm_container">
        <span>{name}</span>
        <span>{`${quantity} pcs`}</span>
        </div>
        )}
    </div>
    
    </>

    )
     
}

</div>


</div>
)
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

    export default connect(mapStatetoProps,mapDispatchtoProps)(HistoryExpand)

