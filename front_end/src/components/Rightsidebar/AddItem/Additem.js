import './Additem.scss';
import {useRef, useState} from 'react';
import Optioncontainer from '../Bottombar/Optioncontainer';

function Additem({style,set}){
    let initial={name:"",note:"",url:"",category:""};
    const [frm,setfrm]=useState(initial);
    const [err,setErr]=useState({});
    const [senform,setsenform]=useState(false);
    const add_ref=useRef();

    function validate(frm){
       let error={};
       if(!frm.name){
        error.name="Provide Item name"
       }
       if(!frm.category){
        error.category="Provide Item category"
       }
       return error;
    };
    const onSum=(e)=>{
        e.preventDefault();
        setErr(validate(frm)); 
        if(!err.category && !err.name){
            setsenform(false);
      }
    };
    const onCancel=()=>{
     add_ref.current.style.right='-105%';
     set('');

    };
    const onvalChange=(e)=>{
       const {id,value}=e.target;
       setfrm({...frm,[id]:value});
    }


    return (
        <div className="Add_item_main"  style={style} ref={add_ref}>

        <div className="width_form_90">    
        <p>Add a new item</p>
        <form>
        <div className="Name_sec">
        <label htmlFor="name" className="label_control">Name</label>
        <input type="text" id="name" placeholder="Enter a name" onChange={e=>onvalChange(e)}/>
        {err.name?<p>{err.name}</p>:''}
        </div>
        <div className="Note_sec">
        <label htmlFor="note" className="label_control">Note (optional)</label>
        <textarea type="text" id="note" placeholder="Enter a note" onChange={e=>onvalChange(e)}/>
        </div>
        <div className="URL_sec">
        <label htmlFor="image">Image (optional)</label>
        <input id="image" type="url" placeholder="Enter a url" onChange={e=>onvalChange(e)}/>
        </div>
        <div className="category_sec">
        <label htmlFor="category">Category</label>
        <input id="category" type="text" placeholder="Enter a category" onChange={e=>onvalChange(e)}/>
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
        <Optioncontainer  save_bt={`Save`} className={`_save`} onfunc1={onSum} onfunc2={onCancel}/>
        </div>
    )
}


export default Additem;