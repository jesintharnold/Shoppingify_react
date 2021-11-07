import './Additem.scss';
import {useEffect, useState} from 'react';
import Optioncontainer from '../Bottombar/Optioncontainer';
import * as Creator from '../../../Redux/ActionConstant';
import {connect} from 'react-redux';

function Additem({style,set,cartData}){

    let initial={name:"",note:"",url:"",category:""};
    const [frm,setfrm]=useState(initial);
    const [err,setErr]=useState({});
    const [submit,setSubmit]=useState(false);
    const [visible,setVisible]=useState(false);
   
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

        if(frm.category.trim().split("").length<1){
            setVisible(false);
       }

       if(Object.keys(err).length===0 && submit){
           console.log("No Errors -- are given");     //dispatch of add item goes here
       }

       

    },[err,submit,visible,frm.category])

    function setFrmchange(data){
        setfrm({...frm,category:data});
        setVisible(true);
    }

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
        <div className="search_recommends" style={visible?{visibility:"hidden"}:{visibility:"visible"}}>
         {cartData.filter(p=>p.category.name.toLowerCase().includes(frm.category)).map((c)=><div key={c.category.name} onClick={()=>setFrmchange(c.category.name)}>{c.category.name}</div>)} 
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
        cartData:state.cartItems.data,
        cartName:state.cartItems.name??"Shopping List",
        cartLoading:state.cartItems.Loading
    }
    }
    
    const mapDispatchtoProps=dispatch=>{
    return {
        
    }
    } 
    export default connect(mapStatetoProps,mapDispatchtoProps)(Additem)