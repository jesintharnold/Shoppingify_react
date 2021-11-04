import './Item.scss';
import React from 'react';
import {connect} from 'react-redux';
import * as Creator from '../../../Redux/ActionConstant';

function Item({ItemData}){
return (
    <React.Fragment>
    <div className="header">
         <div className="title">
         <span>Shoppingify</span> allows you take your <br/> shopping list wherever you go
         </div>
         <div className="search">
             <span className="material-icons">search</span>
             <input type="text" placeholder="Search item"/> 
        </div>
    </div>

    <div className="Item">

    {ItemData.map(
    ({category,items},index)=>(
        <>
        <div className="Item_name">{category.name}</div> 
        <div className="Item_list">
        {items.map((Itm,index_)=>(
          <>
            <button className="Item_btn">
            <span>{Itm.name}</span>
            <span class="material-icons">add</span>
            </button>
          </>
        ))}  
      </div>
      </>
        
    ))}

    </div>
    </React.Fragment>
)
}

const mapStatetoProps=(state)=>{
    return{
        ItemData:state.MainItems.data
    }
    }
    
    const mapDispatchtoProps=dispatch=>{
    return {
       
    }
    } 
    export default connect(mapStatetoProps,mapDispatchtoProps)(Item)
