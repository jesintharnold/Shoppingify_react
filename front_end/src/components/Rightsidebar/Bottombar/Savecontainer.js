import { useEffect, useState } from 'react';
import './Bottombar.scss';

function Savecontainer({val,savebtEdit,save_dispatch}){

    const [vl,setvl]=useState("");

   useEffect(()=>{
       setvl(val);
   },[val]);

   const save_func=()=>{

    save_dispatch(vl);
    savebtEdit(false);

   }

return (
    <div className="container">
    <div className="save_flex">
    <input type="text" placeholder="Enter a name" value={vl} onChange={(e)=>{setvl(e.target.value)}}/>
    <div className="search_cont_bt">
    <button onClick={()=>save_func()}>Save</button>
    </div>
    </div>
</div>
)
}

export default Savecontainer;