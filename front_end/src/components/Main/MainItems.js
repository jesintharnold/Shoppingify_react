import { useEffect } from 'react';
import { GetItemDataAsync } from '../../Redux/ActionCreators';
import Item from './ItemPage/Item';
import "./MainItems.scss";
import {connect} from 'react-redux';

function Mainitem({GetItems}){


    useEffect(()=>{
        if(localStorage.getItem("access_Id")){
            GetItems();
        }
    },[])

    return (
        <div className="Main_items">
        <Item/>
        </div>
    )
}


const mapStatetoProps=(state)=>{
    return{
    }
    }
    
const mapDispatchtoProps=dispatch=>{
    return {
        GetItems:()=>dispatch(GetItemDataAsync())
    }
    } 
    export default connect(mapStatetoProps,mapDispatchtoProps)(Mainitem)