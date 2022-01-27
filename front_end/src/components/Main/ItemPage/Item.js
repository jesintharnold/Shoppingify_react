import './Item.scss';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import * as Creator from '../../../Redux/ActionCreators';
import toast from 'react-hot-toast';
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
    ({name,_id,Items},index)=>(
        <React.Fragment key={`Itm-cat-${index}`}>
        <div className="Item_name">{name}</div> 
        <div className="Item_list">
        {Items.map((Itm,index_)=>(
            <div className='itm_btn' key={`Itm-${index_}`}>
            <span className="Itm_nam" onClick={()=>{SelectItem({
                imageURL:Itm.imageURL,
                name:Itm.name,
                category:name,
                note:Itm.note,
                itemID:Itm.Itm_id,
                categoryID:_id
            });
            

            
            }}>{Itm.name}</span>
            <button className="Item_btn" onClick={()=>AddToCart({
              name:Itm.name,
              category_ID:`${_id}`,
              category_name:name,
              quantity:1,
              Item_Id:`${Itm.Itm_id}`,
              checked:false
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
