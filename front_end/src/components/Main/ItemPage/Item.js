import './Item.scss';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import * as Creator from '../../../Redux/ActionCreators';

function Item({ItemData,AddToCart,filter,NoFilter,SetFilter,SelectItem}){

  const [search,searchVal]=useState('');


  
useEffect(()=>{

  if(search.trim().split(/\s+/).length>=1){
    SetFilter(search);
   }else{
     NoFilter();
   }

},[search])
  

return (
    <React.Fragment>
    <div className="header">
         <div className="title">
         <span>Shoppingify</span> allows you take your <br/> shopping list wherever you go
         </div>
         <div className="search">
             <span className="material-icons">search</span>
             <input type="text" placeholder="Search item" value={search} onChange={e=>{searchVal(e.target.value);console.log(e.target.value);}}/> 
        </div>
    </div>

    <div className="Item">

    {(filter.status?filter.data:ItemData).map(
    ({category,items},index)=>(
        <React.Fragment key={`Itm-cat-${index}`}>
        <div className="Item_name">{category.name}</div> 
        <div className="Item_list">
        {items.map((Itm,index_)=>(
            <div className='itm_btn' key={`Itm-${index_}`}>
            <span className="Itm_nam" onClick={()=>SelectItem({
                imageURL:null,
                name:Itm.name,
                category:category.name,
                note:null
            })}>{Itm.name}</span>
            <button className="Item_btn" onClick={()=>AddToCart({
              name:Itm.name,
              category_ID:"0000000035678",
              category_name:category.name,
              quantity:1,
              Item_Id:"0000000002589"
            })}>
            <span className="material-icons">add</span>
            </button>
            </div>
          
        ))}  
      </div>
      </React.Fragment>
        
    ))}

    </div>
    </React.Fragment>
)
}

const mapStatetoProps=(state)=>{
    return{
        ItemData:state.MainItems.data,
        filter:state.MainItems.filter
    }
    }
    
    const mapDispatchtoProps=dispatch=>{
    return {
       AddToCart:(data)=>dispatch(Creator.AddItemToCart(data)),
       SetFilter:(data)=>dispatch(Creator.setFiltering(data)),
       NoFilter:()=>dispatch(Creator.noFilter),
       SelectItem:(data)=>dispatch(Creator.selectedItem(data))
    }
    } 
    export default connect(mapStatetoProps,mapDispatchtoProps)(Item)
