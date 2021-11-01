import React, { useEffect, useRef } from 'react';
import './ExBtn.scss';

function Exbtn({Inc,Dec,cat_name,items,Del,edit}){

    

    useEffect(()=>{
        
    },[edit])
    
    return (
        <React.Fragment>
         <span className="cat_name">{cat_name}</span>
         {items.map((Itm,index_)=>(
         
        <div className="category_item" key={`cat-Item-${index_}`} >
        <p>{Itm.name}</p>
        <div className={edit?`pcs hover_active`:'pcs'} >
        <div className="lft_pcs">    
        <button className="delete" onClick={()=>Del({category_name:cat_name,name:Itm.name})}><span className="material-icons">delete_outline</span></button>
        <button onClick={()=>Dec({category_name:cat_name,name:Itm.name})}> <span className="material-icons">remove</span></button>
        </div>
        <div className="No_pcs">{`${Itm.quantity} pcs`}</div>
        <div className="rght_pcs">
        <button onClick={()=>Inc({category_name:cat_name,name:Itm.name})}> 
        <span className="material-icons">add</span>
        </button>
        </div>

        </div>
    </div>))}
        
    </React.Fragment>
    );
}
export default Exbtn;