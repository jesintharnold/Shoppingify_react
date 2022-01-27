import './RightMain.scss';
import bottle from '../../Assests/bottle.svg';
import Exbtn from './ExpandaleBtn/ExBtn';
import Savecontainer from './Bottombar/Savecontainer';
import Optioncontainer from './Bottombar/Optioncontainer';
import Additem from './AddItem/Additem';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as Creator from '../../Redux/ActionCreators';
import Overview from './Overview/overview';
import Modal from '../Model/Modal';

function Rightmainbar({Increment,Decrement,cartData,Postcart,cartLoading,cartName,Delete,UpdateName,selectState,CheckedState,Getcart}){
    const [tab,setTab]=useState('');
    const [edit,setEdit]=useState(false);    
    const [cancel,setCancel]=useState(false);


    useEffect(()=>{
        if(localStorage.getItem("access_Id")){
            Getcart();
        }
    },[])


    function save_cont(data){
      UpdateName(data);
      Postcart("Active");
    };

return(
<div className='_main_bar'> 
<div className="RightMain">
<div className="width_90">
<div className="bottle_left">
<div>
<img src={bottle} width="100%"  alt="Not found"/>
</div> 
<div>
<p>Didn’t find what you need?</p>
<button onClick={()=>{
    setTab('AddItem');
    setEdit(false);
}}>Add item</button>
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
        <Exbtn Inc={Increment} Dec={Decrement} cat_name={category.name} Del={Delete} items={items} key={`cat-${index}`} edit={edit} dipatch={CheckedState} />
    ))}
</div>

</div>
{(!selectState&&!edit&&tab==='')?<Optioncontainer save_bt={`Complete`} className={`_complete`} onfunc2={()=>{
    setCancel(!cancel);
}} onfunc1={()=>{
    Postcart("completed");
}} />:''}
{(edit&&!selectState)?<Savecontainer val={cartName} savebtEdit={setEdit} save_dispatch={save_cont}/>:''}
</div>
<Additem style={tab==='AddItem'?{right:'0%'}:{right:'-105%'}} set={setTab}/>
<Overview/>
{cancel?<Modal cancel={()=>{
    setCancel(false);
}} yes={()=>{
    Postcart("cancelled");
}}/>:''}
</div>
);
}

const mapStatetoProps=(state)=>{
return{
    cartData:state.cartItems.data,
    cartName:state.cartItems.name??"Shopping List",
    cartLoading:state.cartItems.Loading,
    selectState:state.MainItems.SelectedItem.status
}
}

const mapDispatchtoProps=dispatch=>{
return {
    Increment:(data)=>dispatch(Creator.IncCartQty(data)),
    Decrement:(data)=>dispatch(Creator.DecCartQty(data)),
    Delete:(data)=>dispatch(Creator.DeleteCartItem(data)),
    UpdateName:(data)=>dispatch(Creator.UpdateCartName(data)),
    CheckedState:(data)=>dispatch(Creator.ChangeCheckedState(data)),
    Getcart:()=>dispatch(Creator.GetCartDataAsync()),
    Postcart:(data)=>dispatch(Creator.PostCartDataAsync(data))
}
} 
export default connect(mapStatetoProps,mapDispatchtoProps)(Rightmainbar)

