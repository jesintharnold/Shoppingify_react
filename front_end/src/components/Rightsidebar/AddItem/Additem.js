import './Additem.scss';
import {useEffect, useState} from 'react';
import Optioncontainer from '../Bottombar/Optioncontainer';
import * as Creator from '../../Redux/ActionCreators';
import {connect} from 'react-redux';

function Additem({style,set}){

    let initial={name:"",note:"",url:"",category:""};
    const [frm,setfrm]=useState(initial);
    const [err,setErr]=useState({});
    const [submit,setSubmit]=useState(false);
   
    function validate(frm){
       let error={};
       if(!frm.name){
        error.name="Provide Item name";
       }
       if(!frm.category){
        error.category="Provide Item category";
       }
       return error;
    };
    const onSave=(e)=>{
        e.preventDefault();
        setErr(validate(frm)); 
        setSubmit(true);
    };
    const onvalChange=(e)=>{
       const {id,value}=e.target;
       setfrm({...frm,[id]:value});
    }
    useEffect(()=>{
       if(Object.keys(err).length===0 && submit){
           console.log("No Errors -- are given");     //dispatch of add item goes here
       }
    },[err,submit])

    return (
        <div className="Add_item_main"  style={style} >
        <div className="width_form_90">    
        <p>Add a new item</p>
        <form>
        <div className="Name_sec">
        <label htmlFor="name" className="label_control">Name</label>
        <input type="text" id="name" placeholder="Enter a name" value={frm.name} onChange={e=>onvalChange(e)}/>
        {err.name?<p>{err.name}</p>:''}
        </div>
        <div className="Note_sec">
        <label htmlFor="note" className="label_control">Note (optional)</label>
        <textarea type="text" id="note" placeholder="Enter a note" value={frm.note} onChange={e=>onvalChange(e)}/>
        </div>
        <div className="URL_sec">
        <label htmlFor="image">Image (optional)</label>
        <input id="image" type="url" placeholder="Enter a url" value={frm.url} onChange={e=>onvalChange(e)}/>
        </div>
        <div className="category_sec">
        <label htmlFor="category">Category</label>
        <input id="category" type="text" placeholder="Enter a category" value={frm.category} onChange={e=>onvalChange(e)}/>
        {err.category?<p>{err.category}</p>:''}
        <div className="search_recommends">
         <div>HEllo</div> 
         <div>HEllo</div>   
         <div>HEllo</div> 
         <div>HEllo</div> 
        </div>
        </div>
        </form>
        </div>
        <Optioncontainer  save_bt={`Save`} className={`_save`} onfunc1={onSave} onfunc2={()=>{set('')}}/>
        </div>
    )
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
        
    }
    } 
    export default connect(mapStatetoProps,mapDispatchtoProps)(Additem)