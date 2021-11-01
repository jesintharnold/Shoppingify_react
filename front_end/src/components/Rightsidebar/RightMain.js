import './RightMain.scss';
import bottle from '../../Assests/bottle.svg';
import Exbtn from './ExpandaleBtn/ExBtn';
import Savecontainer from './Bottombar/Savecontainer';
import Optioncontainer from './Bottombar/Optioncontainer';
import Additem from './AddItem/Additem';
import React, {useState,useRef} from 'react';
import {connect} from 'react-redux';
import * as Creator from '../../Redux/ActionCreators';
// import React from 'react';
function Rightmainbar({Increment,Decrement,cartData,cartLoading,cartName,Delete}){

    const [tab,setTab]=useState('');
    const [edit,setEdit]=useState(false);
    
return(

<div className='_main_bar'>       
<div className="RightMain" >

<div className="width_90">
<div className="bottle_left">
<div>
<img src={bottle} width="100%"  alt="Not found"/>
</div> 
<div>
<p>Didn’t find what you need?</p>
<button onClick={()=>setTab('AddItem')}>Add item</button>
</div>
</div>
<div className="shopping_list_name">
    <p>{cartName}</p>
    <button onClick={()=>setEdit(true)} style={edit?{display:'none'}:{display:'block'}}>
    <span className="material-icons">edit</span>
    </button>
</div>
<div className="category">
{cartData.map(
    ({category,items},index)=>(
        <Exbtn Inc={Increment} Dec={Decrement} cat_name={category.name} Del={Delete} items={items} key={`cat-${index}`} edit={edit} />
    ))}
</div>
</div>
{/* <Optioncontainer save_bt={`Complete`} className={`_complete`}/> */}
{edit?<Savecontainer val={cartName} savebtEdit={setEdit}/>:''}
</div>
<Additem style={tab==='AddItem'?{right:'0%'}:{right:'-105%'}} set={setTab}/>

</div>
);
}


const mapStatetoProps=(state)=>{
return{
    cartData:state.items.data,
    cartName:state.items.name??"Shopping List",
    cartLoading:state.items.Loading
}
}

const mapDispatchtoProps=dispatch=>{
return {
    Increment:(data)=>dispatch(Creator.IncCartQty(data)),
    Decrement:(data)=>dispatch(Creator.DecCartQty(data)),
    Delete:(data)=>dispatch(Creator.DeleteCartItem(data))
}
} 
export default connect(mapStatetoProps,mapDispatchtoProps)(Rightmainbar)

